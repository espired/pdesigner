
import { ForwardedRef, forwardRef, PropsWithChildren, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import { styled, Card, Button } from '@streamelements/frontend-ui';
import IEditorOptions from "../../types/IEditorOptions";
import { fabric } from "fabric";
import { useEditorState } from "../../store/EditorContext";
import EditorActions from "../../store/EditorActions";
import IEditorRefActions from "../../types/IEditorRefActions";
import useEditorLayers from "../../hooks/useEditorLayers";
import IEditorTextObject from "../../types/IEditorTextObject";
import EditorObjectType from "../../types/EditorObjectType";
import IEditorObject from "../../types/IEditorObject";
import useActiveObject from "../../hooks/useActiveObject";
import IEditorOptionsBoard from "../../types/IEditorOptionsBoard";
import { usePrevious } from "../../hooks/usePrevious";
import isEqual from 'lodash/isEqual';
import { getScaleFromBounds } from "../../utils/NumberUtils";
import BoardTabs from "./BoardTabs";
import useWaitGroup from "../../hooks/useWaitGroup";
import ObjectFloatController from "./Controllers/ObjectFloatController";
import { v4 as uuid } from 'uuid';
import WebFontLoader from 'webfontloader';
import IEditorLineObject from "../../types/IEditorLineObject";
import IEditorGroupObject from "../../types/IEditorGroupObject";
import StyledButton from "./StyledButton";
import SettingsModal from "./Modals/SettingsModal";
import { QuestionMarkIcon } from "../Icons";
import HotKeysProvider from "./HotKeysProvider";

declare global {
    interface Window { boardContents: any }
}

interface props {
    options: IEditorOptions
}

const Container = styled('div', {
    display: 'grid',
    gridTemplateRows: 'max-content 1fr 32px',
    overflow: 'hidden'
});

const TopBarContainer = styled(Card.Root, {
    padding: 'calc($base * 2)',
    my: 'calc($base * 3)',
    mr: 'calc($base * 3)',
    ml: 0,
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    alignItems: 'center'
});

const Toolbar = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '$base',
    placeContent: 'flex-end'
})

const Editor = forwardRef((props: PropsWithChildren<props>, ref: ForwardedRef<IEditorRefActions>) => {
    const { state, dispatch } = useEditorState();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    // const { loader, add, done } = useWaitGroup();
    const waitGroup = useWaitGroup();

    const layers = useEditorLayers();
    const activeObject = useActiveObject();

    const [activeBoard, setActiveBoard] = useState<IEditorOptionsBoard>();

    const prevBoards = usePrevious(props.options.boards);
    const prevBoard = usePrevious(activeBoard);

    const generateGrid = useCallback(() => {
        const canvas = state.canvas;
        if (!canvas) return;

        const canvasObjects = state.canvas?.getObjects() as IEditorObject[];
        const clipLayer = canvasObjects.find(o => o.objectType === EditorObjectType.CLIP);

        if (!clipLayer) return;

        const clipBounds = clipLayer.getBoundingRect();

        const ROWS = 30;
        const COLS = 30;

        const horizontalLine = [clipBounds.left, 0, clipBounds.width + clipBounds.left, 0];
        const verticalLine = [0, clipBounds.top, 0, clipBounds.height + clipBounds.top];

        const snappingLines: { coords: number[], size: number[] }[] = [];

        const RowHeight = clipBounds.height / ROWS;
        const ColWidth = clipBounds.width / COLS;

        for (let i = 0; i < (ROWS + 1); i++) {
            snappingLines.push({
                size: horizontalLine,
                coords: [clipBounds.top + (RowHeight * i), clipBounds.left]
            });
        }

        for (let i = 0; i < (COLS + 1); i++) {
            snappingLines.push({
                size: verticalLine,
                coords: [clipBounds.top, clipBounds.left + (ColWidth * i)]
            });
        }

        const snapGroupItems: IEditorObject[] = [];
        snappingLines.forEach(s => {
            const clipSnapLine = new fabric.Line(s.size, {
                top: s.coords[0],
                left: s.coords[1],
                stroke: 'rgba(0,0,0,0.1)',
                strokeWidth: 1,
            }) as IEditorLineObject;
            snapGroupItems.push(clipSnapLine);
        });

        const snapGroup = new fabric.Group(snapGroupItems) as IEditorGroupObject;
        snapGroup.set({
            objectType: EditorObjectType.SNAP,
            evented: false,
            selectable: false,
            locked: true,
            hasControls: false,
            absolutePositioned: true,
        });
        canvas.add(snapGroup);
        canvas.sendToBack(snapGroup);
    }, [state.canvas])


    useEffect(() => {
        if (state.canvas || !props.options) return;

        dispatch({ type: EditorActions.SET_OPTIONS, payload: props.options });

        if (props.options.fonts?.length) {
            waitGroup.add()
            WebFontLoader.load({
                google: {
                    families: props.options.fonts
                },
                active: function () {
                    fabric.util.clearFabricFontCache();
                    state.canvas?.renderAll();
                    waitGroup.done();
                },
            });
        }

    }, [props.options, state.canvas, waitGroup, dispatch])

    useEffect(() => {
        if (!activeBoard || !state.canvas || isEqual(prevBoard?.name, activeBoard.name) || !containerRef.current) return;

        if (!window["boardContents"]) {
            window["boardContents"] = {};
        }

        if (prevBoard) {
            window["boardContents"][prevBoard.name] = state.canvas.toJSON([
                'objectType',
                'locked',
                'layerName',
                'selectable',
                'hasControls',
                'hoverCursor',
                'hiddenLayer',
                'capitalize',
                'verticalText',
                'absolutePositioned',
                'objectCaching',
                'errored'
            ]);
        }

        state.canvas.clear();

        const boardContents = window["boardContents"][activeBoard.name];

        if (boardContents) {
            state.canvas?.loadFromJSON(boardContents, () => {
                state.canvas?.renderAll();
            });
            return;
        }

        const containerBounds = containerRef.current.getBoundingClientRect();
        const boundsScale = getScaleFromBounds(containerBounds, activeBoard.dimensions);

        const newCanvasDimensions = {
            width: Math.floor(activeBoard.dimensions.width * boundsScale),
            height: Math.floor(activeBoard.dimensions.height * boundsScale)
        }

        state.canvas.setDimensions(newCanvasDimensions);

        if (activeBoard.backgroundColor) {
            state.canvas.setBackgroundColor(activeBoard.backgroundColor, () => state.canvas?.renderAll());
        }

        if (activeBoard.backgroundImage) {
            waitGroup.add();
            fabric.Image.fromURL(activeBoard.backgroundImage, (img) => {
                const iw = img.getScaledWidth();
                const ih = img.getScaledHeight();

                const imageScaleRatio = Math.min((newCanvasDimensions.width / iw), (newCanvasDimensions.height / ih));
                const imageScaleProps = {
                    scaleX: imageScaleRatio,
                    scaleY: imageScaleRatio,
                };
                state.canvas?.setBackgroundImage(img, () => {
                    state.canvas?.renderAll();
                    waitGroup.done();
                }, imageScaleProps);

                if (activeBoard.backgroundImageOverlay) {
                    waitGroup.add();
                    fabric.Image.fromURL(activeBoard.backgroundImageOverlay, (oimg) => {
                        const overlayImageProps = {
                            width: iw,
                            height: ih,
                            ...imageScaleProps
                        };
                        oimg.set(overlayImageProps)
                        state.canvas?.setOverlayImage(oimg, () => {
                            state.canvas?.renderAll();
                            waitGroup.done();
                        }, overlayImageProps);
                    }, { crossOrigin: 'Anonymous' });
                }
            }, { crossOrigin: 'Anonymous' });
        }

        if (activeBoard.clip) {
            const newClipBounds = {
                top: Math.floor(activeBoard.clip.top * boundsScale),
                left: Math.floor(activeBoard.clip.left * boundsScale),
                height: Math.floor((activeBoard.clip.height - activeBoard.clip.top) * boundsScale),
                width: Math.floor((activeBoard.clip.width - activeBoard.clip.left) * boundsScale),
            }
            const newRect = new fabric.Rect({
                ...newClipBounds,
                hoverCursor: 'default',
                stroke: "#000000",
                strokeWidth: 1,
                strokeDashArray: [5, 5],
                fill: 'transparent',
                objectCaching: false,
                hasControls: false,
                selectable: false,
                evented: false,
                absolutePositioned: true,
            }) as IEditorObject;

            newRect.set({
                id: uuid(),
                objectType: EditorObjectType.CLIP,
                locked: true
            })
            state.canvas.add(newRect);

            generateGrid();
        }

        state.canvas?.renderAll();

    }, [state.canvas, activeBoard, prevBoard, waitGroup, generateGrid]);

    useEffect(() => {
        if (isEqual(prevBoards, props.options.boards)) return;
        setActiveBoard(props.options.boards[0]);
    }, [props.options.boards, prevBoards]);

    useEffect(() => {
        if (!!canvasRef?.current && !state.canvas) {
            const fabCan = new fabric.Canvas(canvasRef.current);
            dispatch({ type: EditorActions.SET_CANVAS, payload: fabCan });
        }
    }, [canvasRef, dispatch, state.canvas]);

    useEffect(() => {
        const callbackFn = props.options.onLayersChanged;
        callbackFn && callbackFn(layers);
    }, [layers, props.options.onLayersChanged])

    useEffect(() => {
        const callbackFn = props.options.onActiveObjectSelected;
        callbackFn && callbackFn(activeObject);
    }, [activeObject, props.options.onActiveObjectSelected])

    useImperativeHandle(ref, (): IEditorRefActions => ({
        addText: (text: string) => {
            const newTextObject = new fabric.IText(text) as IEditorTextObject;
            newTextObject.objectType = EditorObjectType.TEXT;
            newTextObject.id = uuid();

            if (activeBoard?.clip) {
                const canvasObjects = state.canvas?.getObjects() as IEditorObject[];
                const clipPathElem = canvasObjects.find((o) => o.objectType === EditorObjectType.CLIP);
                if (clipPathElem) {
                    const clipBounds = clipPathElem.getBoundingRect();
                    newTextObject.set({
                        clipPath: clipPathElem,
                        top: clipBounds.top,
                        left: clipBounds.left,
                        fontFamily: 'Arial'
                    });

                    state.canvas?.sendToBack(clipPathElem);
                }
            }

            state.canvas?.add(newTextObject);
            state.canvas?.renderAll();
        },
        selectLayer: (layer: IEditorObject) => {
            state.canvas?.discardActiveObject();
            const sel = new fabric.ActiveSelection([layer], {
                canvas: state.canvas,
            });
            state.canvas?.setActiveObject(sel);
            state.canvas?.renderAll();
        },
        exportToPNG: () => {
            return state.canvas?.toDataURL();
        }
    }));

    return (
        <>
            {waitGroup.loader}
            <Container>
                <TopBarContainer>
                    <BoardTabs onTabClick={setActiveBoard} boards={props.options.boards} activeBoard={activeBoard} />
                    <Toolbar>
                        <StyledButton color='neutral' size='small' variant='ghost'>
                            <QuestionMarkIcon />
                        </StyledButton>
                        <SettingsModal />
                        <StyledButton color='neutral' size='small' variant='ghost'>
                            3D
                        </StyledButton>
                        <Button variant='outlined'>Preview</Button>
                        <Button>Save</Button>
                    </Toolbar>
                </TopBarContainer>
                <HotKeysProvider>
                    <div ref={containerRef} style={{ display: 'grid', placeItems: 'center', height: '100%', overflow: 'hidden' }}>
                        <canvas ref={canvasRef} style={{ height: '100%' }} />
                    </div>
                </HotKeysProvider>
                {state.selectedObject && <ObjectFloatController />}
            </Container>
        </>
    )
})

export default Editor;