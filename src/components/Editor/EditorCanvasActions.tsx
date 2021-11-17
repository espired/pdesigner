import { fabric } from 'fabric';
import EditorObjectType from '../../types/EditorObjectType';
import IEditorObject from '../../types/IEditorObject';
import IEditorState from '../../types/IEditorState';
import { v4 as uuid } from 'uuid';
import IEditorImageObject from '../../types/IEditorImageObject';
import IEditorOptionsBoard from '../../types/IEditorOptionsBoard';
import IEditorTextObject from '../../types/IEditorTextObject';
import { uniqueId } from 'lodash';

export function groupObjects(state: IEditorState) {
    if (!state.canvas) return;
    const activeObject = state.canvas.getActiveObject() as IEditorObject;

    if (!activeObject || activeObject.type !== 'activeSelection') return;

    // @ts-ignore
    activeObject.toGroup().set({
        objectType: EditorObjectType.GROUP,
        layerName: 'Group',
    });

    const clipLayer = (state.canvas.getObjects() as IEditorObject[]).find((o: IEditorObject) => o.get('objectType') === EditorObjectType.CLIP);
    if (clipLayer) {
        activeObject.set({
            clipPath: clipLayer,
        });
    }

    state.canvas.renderAll();
    state.canvas.fire('object:modified');
}

export function ungroupObjects(state: IEditorState) {
    if (!state.canvas) return;
    const activeObject = state.canvas.getActiveObject() as IEditorObject;

    if (!activeObject || activeObject.objectType !== EditorObjectType.GROUP) return;

    // @ts-ignore
    activeObject.toActiveSelection();
    state.canvas.renderAll();
}

export function selectAll(state: IEditorState) {
    if (!state.canvas) return;
    const unselectableLayers = [EditorObjectType.CLIP, EditorObjectType.SNAP, EditorObjectType.BLEED];
    state.canvas.discardActiveObject();
    const sel = new fabric.ActiveSelection(state.canvas.getObjects().filter(o => {
        const castedObject = o as IEditorObject;
        return !unselectableLayers.includes(castedObject.get('objectType') || EditorObjectType.TEXT)
    }), {
        canvas: state.canvas,
    });
    state.canvas.setActiveObject(sel);
    state.canvas.renderAll();;
}

export function removeObject(state: IEditorState) {
    if (!state.canvas) return;
    const selectedObjects = state.canvas.getActiveObjects() as IEditorObject[];
    selectedObjects.forEach(o => o && state.canvas?.remove(o));
    state.canvas.discardActiveObject();
    state.canvas.renderAll();
}

export function moveObjVertical(state: IEditorState, amount: number) {
    if (!state.canvas) return;
    const activeObject = state.canvas.getActiveObject() as IEditorObject;

    if (!activeObject) return;
    activeObject.set('left', Number(activeObject.get('left')) + amount);
    state.canvas.renderAll();
}

export function moveObjHorizontal(state: IEditorState, amount: number) {
    if (!state.canvas) return;
    const activeObject = state.canvas.getActiveObject() as IEditorObject;

    if (!activeObject) return;
    activeObject.set('top', Number(activeObject.get('top')) + amount);
    state.canvas.renderAll();
}

export function unselectItem(state: IEditorState) {
    state.canvas?.discardActiveObject();
    state.canvas?.renderAll();
}

export function cloneObject(state: IEditorState, obj?: IEditorObject) {
    if (!state.canvas || !obj) return;

    obj.clone((cloned: IEditorObject) => {
        cloned.set({
            id: uuid(),
            objectType: obj.get('objectType'),
            name: obj.name,
            evented: true
        });
        state.canvas?.add(cloned);
        state.canvas?.setActiveObject(cloned);
        state.canvas?.renderAll();
    });
}

export function addText(state: IEditorState, text?: string) {
    const newText = new fabric.IText(text || 'Hello World', {
        fontWeight: '100',
        fontFamily: 'Arial',
        fill: 'black',
    }) as IEditorTextObject;

    newText.set({
        id: uuid(),
        objectType: EditorObjectType.TEXT,
    });

    addToCanvas(state, newText);
}

export function addImage(state: IEditorState, activeBoard: IEditorOptionsBoard, imgObj: HTMLImageElement, fileName: string, cb?: () => void) {
    if (!state.canvas) return;

    imgObj.crossOrigin = 'anonymous';
    fabric.Image.fromURL(imgObj.src, (image) => {
        addImageRaw(state, activeBoard, image as IEditorImageObject, fileName, cb);
    }, { crossOrigin: 'Anonymous' })
}


export function addShape(state: IEditorState, objLink: string, objName: string = 'generic') {
    fabric.loadSVGFromURL(objLink, (objects, options) => {
        var svgData = fabric.util.groupSVGElements(objects, options);
        const baseProps = {
            strokeUniform: false,
            paintFirst: 'stroke',
            objectType: EditorObjectType.SHAPE,
            name: objName,
            id: uniqueId()
        };

        svgData.set(baseProps)
        svgData.scaleToWidth(100);
        svgData.scaleToHeight(100);
        addToCanvas(state, svgData as IEditorObject);
    });
}

export function addImageRaw(state: IEditorState, activeBoard: IEditorOptionsBoard, imgObj: IEditorImageObject, fileName: string, cb?: () => void) {
    if (!state.canvas) return;

    const imageHeight = imgObj.get('height') || 10;
    const imageWidth = imgObj.get('width') || 10;

    const filenameChunks = fileName.split(".");
    const fileType = filenameChunks[filenameChunks.length - 1];

    const canvasObjType = fileType === 'svg' ? EditorObjectType.SHAPE : EditorObjectType.IMAGE;

    imgObj.set({
        id: uuid(),
        angle: 0,
        objectType: canvasObjType,
        name: fileName,
        height: imgObj.height,
        width: imgObj.width,
    });

    const originalCanvasH = activeBoard.dimensions.height;
    const originalCanvasW = activeBoard.dimensions.width;
    const canvasH = state.canvas.getHeight();
    const canvasW = state.canvas.getWidth();

    const canvasScaleH = canvasH / originalCanvasH;
    const canvasScaleW = canvasW / originalCanvasW;

    const imageScaledW = imageWidth * canvasScaleW;
    const imageScaledH = imageHeight * canvasScaleH;

    const clipLayer = state.canvas.getObjects()?.find(o => {
        const castedObject = o as IEditorObject;
        return castedObject.get('objectType') === EditorObjectType.CLIP;
    });

    if ((imageScaledH >= canvasH || imageScaledW >= canvasW) || (clipLayer && (imageScaledH >= clipLayer.getScaledHeight() || imageScaledW >= clipLayer.getScaledWidth()))) {
        const scaleRatioH = canvasH / imageHeight;
        const scaleRatioW = canvasW / imageWidth;

        let scale = Math.max(scaleRatioH, scaleRatioW) / 2;

        if (clipLayer) {
            scale = Math.min(((clipLayer.get('width') || 1) / imageWidth), ((clipLayer.get('height') || 1) / imageHeight)) / 1.05;
        }

        imgObj.set({
            scaleX: scale,
            scaleY: scale,
        });
    } else {
        imgObj.set({
            scaleX: canvasScaleW,
            scaleY: canvasScaleH
        })
    }

    addToCanvas(state, imgObj, cb);
}

export function addToCanvas(state: IEditorState, obj: IEditorObject, cb?: () => void) {
    if (!state.canvas || !state.canvas.viewportTransform) return;

    obj.set({
        top: 0,
        left: 0,
        fill: obj.fill || '#000000',
        stroke: '#000000',
        strokeWidth: 0,
        paintFirst: 'stroke',
        centeredRotation: true,
        borderColor: '#5684FD',
        cornerColor: '#5684FD',
        snapAngle: 15
    });
    
    obj.setControlsVisibility({
        mt: false, // middle top disable
        mb: false, // midle bottom
        ml: false, // middle left
        mr: false, // I think you get it
    });

    const clipLayer = state.canvas.getObjects().find((o) => {
        const castedObject = o as IEditorObject;
        return castedObject.get('objectType') === EditorObjectType.CLIP
    });

    if (clipLayer) {
        const clipBounds = clipLayer.getBoundingRect();

        obj.set({
            clipPath: clipLayer,
            top: (clipBounds.height / 2 + clipBounds.top) - (obj.getScaledHeight() / 2),
            left: (clipBounds.width / 2 + clipBounds.left) - (obj.getScaledWidth() / 2),
        });
    }

    obj.center();
    state.canvas.add(obj);
    state.canvas.setActiveObject(obj);
    state.canvas.renderAll();
    !!cb && cb();
}

export function updateLayersOrder(canvas: fabric.Canvas, newOrderedLayers: IEditorObject[]): IEditorObject[] {
    if(!canvas) return [];
    newOrderedLayers.forEach(l => canvas.sendToBack(l));
    canvas.renderAll();
    return canvas.getObjects() as IEditorObject[];
}

export function setObjProp(state: IEditorState, key: any, value: string | number | boolean | undefined): void {
    if(!state.canvas || !state.selectedObject || value === undefined) return;
    const activeObject: IEditorObject = state.canvas.getActiveObject() as IEditorObject;

    if(activeObject.get(key) === value) return;

    activeObject.set(key, value);

    // @ts-ignore
    if(activeObject._objects && activeObject.get('objectType') !== EditorObjectType.GROUP) {
        // @ts-ignore
        activeObject._objects.forEach(obj => obj.set(key, value));
    }

    activeObject.setCoords();
    state.canvas.fire('object:manualChanged');

    state.canvas.renderAndReset();
}