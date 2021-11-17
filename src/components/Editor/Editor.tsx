
import { ForwardedRef, forwardRef, lazy, PropsWithChildren, Suspense, useCallback, useEffect, useImperativeHandle, useRef, useState } from "react";
import HotKeysProvider from "./HotKeysProvider";
import EditorActions from "../../store/EditorActions";
import { useEditorState } from "../../store/EditorContext";
import { getScaleFromBounds } from "../../utils/NumberUtils";
import { styled } from '@streamelements/frontend-ui';
import { addImage, addShape, addText, updateLayersOrder } from "./EditorCanvasActions";

// #region external libraries
import { fabric } from "fabric";
import { v4 as uuid } from 'uuid';
import isEqual from 'lodash/isEqual';
import WebFontLoader from 'webfontloader';
// #endregion

// #region hooks
import useWaitGroup from "../../hooks/useWaitGroup";
import { usePrevious } from "../../hooks/usePrevious";
import useEditorLayers from "../../hooks/useEditorLayers";
import useActiveObject from "../../hooks/useActiveObject";
// #endregion

// #region types
import IEditorObject from "../../types/IEditorObject";
import IEditorOptions from "../../types/IEditorOptions";
import EditorObjectType from "../../types/EditorObjectType";
import IEditorClipObject from "../../types/IEditorClipObject";
import IEditorLineObject from "../../types/IEditorLineObject";
import IEditorRefActions from "../../types/IEditorRefActions";
import IEditorGroupObject from "../../types/IEditorGroupObject";
import IEditorOptionsBoard from "../../types/IEditorOptionsBoard";
import { useElementSize } from "usehooks-ts";
// #endregion

// #region dynamic imports
const ObjectFloatController = lazy(() => import('./Controllers/ObjectFloatController'));
const PreviewModal = lazy(() => import('./Modals/PreviewModal'));
const EditorControl = lazy(() => import('./EditorControl'));
const Debugger = lazy(() => import('./Debugger'));
// #endregion

const datalesssJsonProps = [
    'width',
    'height',
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
];

declare global {
    interface Window { boardContents: any }
}

interface props {
    options: IEditorOptions
}

const Root = styled('div', {
    display: 'grid',
    gridTemplateRows: '72px 1fr 8px',
    rowGap: 'calc($base * 3)',
    overflow: 'hidden'
});

const CanvasContainer = styled('div', {
    display: 'grid',
    placeItems: 'center',
    height: '100%',
    overflow: 'hidden',
    position: 'relative'
});

const Editor = forwardRef((props: PropsWithChildren<props>, ref: ForwardedRef<IEditorRefActions>) => {
    const { state, dispatch } = useEditorState();
    const [previewModalOpen, setPreviewModalOpen] = useState<boolean>(false);
    const [activeBoard, setActiveBoard] = useState<IEditorOptionsBoard>();
    const [scale, setScale] = useState<number>(1);

    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const containerSize = useElementSize(containerRef);
    const waitGroup = useWaitGroup();
    const layers = useEditorLayers();
    const activeObject = useActiveObject();
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
    }, [state.canvas]);

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

    }, [props.options, state.canvas, waitGroup, dispatch]);

    useEffect(() => {
        if (!activeBoard || !state.canvas || isEqual(prevBoard, activeBoard) || !containerRef.current) return;
        
        if(!props.options.preserveGraphicsOnBoardChange) {
            state.canvas.clear();
        }

        const containerBounds = containerRef.current.getBoundingClientRect();
        let boundsScale = Math.min(getScaleFromBounds(containerBounds, activeBoard.dimensions), 1);

        setScale(boundsScale);

        const newCanvasDimensions = {
            width: Math.floor(activeBoard.dimensions.width * boundsScale),
            height: Math.floor(activeBoard.dimensions.height * boundsScale)
        }

        state.canvas.setDimensions(newCanvasDimensions);

        if (!!activeBoard.backgroundColor) {
            state.canvas.setBackgroundColor(activeBoard.backgroundColor, () => state.canvas?.renderAll());
        }

        if (!!activeBoard.backgroundImage) {
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

                if (!!activeBoard.backgroundImageOverlay) {
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

            const existingClipLayer = (state.canvas?.getObjects() as IEditorObject[]).find(o => o.get('objectType') === EditorObjectType.CLIP);

            if(props.options.preserveGraphicsOnBoardChange && existingClipLayer) {
                existingClipLayer.set({ ...newClipBounds });
            } else {
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
                }) as IEditorClipObject;
    
                newRect.set({
                    id: uuid(),
                    objectType: EditorObjectType.CLIP,
                    locked: true,
                    clipScale: boundsScale
                })
                state.canvas.add(newRect);
    
                generateGrid();
            }
        }

        state.canvas?.renderAll();
    }, [state.canvas, props.options.preserveGraphicsOnBoardChange, props.options.boards, activeBoard, activeBoard?.name, prevBoard, containerRef, waitGroup, generateGrid]);

    useEffect(() => {
        if (!props.options.boards.length || isEqual(prevBoards, props.options.boards)) return;
        setActiveBoard(props.options.boards[0]);
    }, [props.options.boards, prevBoards]);

    useEffect(() => {
        if (!!canvasRef?.current && !state.canvas) {
            const fabCan = new fabric.Canvas(canvasRef.current);
            dispatch({ type: EditorActions.SET_CANVAS, payload: fabCan });
        }
    }, [canvasRef, dispatch, state.canvas]);

    useEffect(() => {
        if(!state.canvas || !activeBoard) return;

        let canvasH = activeBoard.dimensions.height;
        let canvasW = activeBoard.dimensions.width;

        const { height, width } = containerSize;
        const scale = Math.min((height / canvasH), (width / canvasW));

        state.canvas.setDimensions({
            width: canvasW * scale,
            height: canvasH * scale
        });

        // state.canvas.setZoom(1 * scale);
        state.canvas.renderAll();

    }, [state.canvas, containerSize, activeBoard]);

    useEffect(() => {
        const callbackFn = props.options.onLayersChanged;
        callbackFn && callbackFn(layers);
    }, [layers, props.options.onLayersChanged]);

    useEffect(() => {
        const callbackFn = props.options.onActiveObjectSelected;
        callbackFn && callbackFn(activeObject);
    }, [activeObject, props.options.onActiveObjectSelected]);

    useImperativeHandle(ref, (): IEditorRefActions => ({
        toggleLayerLock: (layer: IEditorObject) => {

        },
        toggleLayerVisibility: (layer: IEditorObject) => {
            
        },
        deleteLayer: (layer: IEditorObject) => {
            state.canvas?.remove(layer);
            state.canvas?.discardActiveObject();
            state.canvas?.renderAll();
        },
        addText: (text: string) => addText(state, text),
        addShape: (shapeUrl: string, name?: string) => addShape(state, shapeUrl, name),
        addImage: (imgUrl: string, name?: string) => {
            if (!!activeBoard) {
                waitGroup.add();
                const elem = new Image();
                elem.crossOrigin = 'anonymous';
                elem.src = imgUrl + `?dc=${Date.now()}`;
                elem.onload = () =>
                    addImage(state, activeBoard, elem, name || 'image', () =>
                        waitGroup.done()
                    )
            }
        },
        selectLayer: (layer: IEditorObject) => {
            state.canvas?.discardActiveObject();
            const sel = new fabric.ActiveSelection([layer], {
                canvas: state.canvas,
            });
            state.canvas?.setActiveObject(sel);
            state.canvas?.renderAll();
        },
        reorderLayers: (layers: IEditorObject[]) => {
            if (!state.canvas) return;
            const newLayersArr = updateLayersOrder(state.canvas, layers);
            const callbackFn = props.options.onLayersChanged;
            callbackFn && callbackFn(newLayersArr);
        },
        exportToPNG: () => {
            if (!state.canvas) return;
            return state.canvas.toDatalessJSON();
        },
        loadFromJSON: (contents: string) => {
            state.canvas?.loadFromJSON(contents, () => state.canvas?.renderAll());
        }
    }));

    return (
        <Root>
            {waitGroup.loader}

            <Suspense fallback={<></>}>
                <PreviewModal
                    open={previewModalOpen}
                    onOpenChange={setPreviewModalOpen}
                />
            </Suspense>

            <Suspense fallback={<div />}>
                <EditorControl
                    boards={props.options.boards}
                    activeBoard={activeBoard}
                    onTabClicked={setActiveBoard}
                    onPreviewClicked={() => setPreviewModalOpen(true)}
                    onSaveClicked={() => props.options.onSave && props.options.onSave(state.canvas?.toJSON(datalesssJsonProps) || '')}
                />
            </Suspense>

            <HotKeysProvider>
                <CanvasContainer ref={containerRef}>
                    <canvas ref={canvasRef} style={{ height: '100%', width: '100%' }} />
                </CanvasContainer>
            </HotKeysProvider>

            <Suspense fallback={<></>}>
                {!!state.selectedObject && <ObjectFloatController />}
            </Suspense>

            <Suspense fallback={<></>}>
                <Debugger scale={scale} activeBoard={activeBoard} />
            </Suspense>
        </Root>
    )
})

export default Editor;