
import { ForwardedRef, forwardRef, PropsWithChildren, useEffect, useImperativeHandle, useRef, useState } from "react";
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

declare global {
    interface Window { boardContents: any }
}

interface props {
    options: IEditorOptions
}

const Editor = forwardRef((props: PropsWithChildren<props>, ref: ForwardedRef<IEditorRefActions>) => {
    const { state, dispatch } = useEditorState();
    const containerRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const layers = useEditorLayers();
    const activeObject = useActiveObject();

    const [activeBoard, setActiveBoard] = useState<IEditorOptionsBoard>();

    const prevBoards = usePrevious(props.options.boards);
    const prevBoard = usePrevious(activeBoard);

    useEffect(() => {
        if (!activeBoard || !state.canvas || isEqual(prevBoard?.name, activeBoard.name) || !containerRef.current) return;

        if (!window["boardContents"]) {
            window["boardContents"] = {};
        }

        if (prevBoard) {
            window["boardContents"][prevBoard.name] = state.canvas.toJSON([
                'objectType',
                'layerLocked',
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
            fabric.Image.fromURL(activeBoard.backgroundImage, (img) => {
                const iw = img.getScaledWidth();
                const ih = img.getScaledHeight();
    
                const imageScaleRatio = Math.min((newCanvasDimensions.width / iw), (newCanvasDimensions.height / ih));
                const imageScaleProps = {
                    scaleX: imageScaleRatio,
                    scaleY: imageScaleRatio,
                };
                state.canvas?.setBackgroundImage(img, () => state.canvas?.renderAll(), imageScaleProps);

                if(activeBoard.backgroundImageOverlay) {
                    fabric.Image.fromURL(activeBoard.backgroundImageOverlay, (oimg) => {
                        const overlayImageProps = {
                            width: iw,
                            height: ih,
                            ...imageScaleProps
                        };
                        oimg.set(overlayImageProps)
                        state.canvas?.setOverlayImage(oimg, () => state.canvas?.renderAll(), overlayImageProps);
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
                strokeWidth: 2,
                strokeDashArray: [5, 5],
                fill: 'transparent',
                objectCaching: false,
                hasControls: false,
                selectable: false,
                evented: false,
                absolutePositioned: true,
            }) as IEditorObject;

            newRect.set({
                objectType: EditorObjectType.CLIP,
                locked: true
            })
            state.canvas.add(newRect);
        }

        state.canvas?.renderAll();

    }, [state.canvas, activeBoard, prevBoard]);

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

            if (activeBoard?.clip) {
                const canvasObjects = state.canvas?.getObjects() as IEditorObject[];
                const clipPathElem = canvasObjects.find((o) => o.objectType === EditorObjectType.CLIP);
                if (clipPathElem) {
                    const clipBounds = clipPathElem.getBoundingRect();
                    newTextObject.set({
                        clipPath: clipPathElem,
                        top: clipBounds.top,
                        left: clipBounds.left
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
        <div style={{ display: 'grid', gridTemplateRows: '100px 1fr', overflow: 'hidden' }}>
            <div>
                {!!props.options.boards.length && props.options.boards.length > 1 && props.options.boards.map(b => (
                    <div key={b.name} onClick={() => setActiveBoard(b)}>
                        {b.name}
                    </div>
                ))}
            </div>
            <div ref={containerRef} style={{ display: 'grid', placeItems: 'center', maxHeight: '100%', overflow: 'hidden' }}>
                <canvas ref={canvasRef} style={{ height: '100%' }} />
            </div>
        </div>
    )
})

export default Editor;