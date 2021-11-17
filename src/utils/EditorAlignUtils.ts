import EditorObjectType from "../types/EditorObjectType";
import IEditorObject from "../types/IEditorObject";
import { fabric } from 'fabric';

export function AlignVerticalTop(canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if (!canvas || !selectedObject) return;
    const rect = getBoundsAndEdges(canvas);
    const activeObject = canvas.getActiveObject();
    const { top: et } = activeObject.getBoundingRect();
    const objTop = Number(activeObject.get('top'));

    let newTop = rect.top + (objTop - et);

    activeObject.set({ top: newTop });
    canvas.renderAll();
}

export function AlignVerticalMiddle(canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if (!canvas || !selectedObject) return;
    const rect = getBoundsAndEdges(canvas);
    const activeObject = canvas.getActiveObject();
    const { width: ew } = activeObject.getBoundingRect();

    let newLeft = (rect.left + (rect.width/2)) - (ew / 2);
    newLeft = newLeft / canvas.getZoom();

    activeObject.set({ left: newLeft });
    canvas.renderAll();
}

export function AlignVerticalBottom(canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if (!canvas || !selectedObject) return;
    const rect = getBoundsAndEdges(canvas);
    const activeObject = canvas.getActiveObject();
    const { height: eh } = activeObject.getBoundingRect();

    let newTop = rect.bottom - eh;

    activeObject.set({ top: newTop });
    canvas.renderAll();
}

export function AlignHorizontalLeft(canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if (!canvas || !selectedObject) return;
    const rect = getBoundsAndEdges(canvas);
    const activeObject = canvas.getActiveObject();
    const { left: el } = activeObject.getBoundingRect();
    const objLeft = Number(activeObject.get('left'));

    let newLeft = rect.left + (objLeft - el);

    activeObject.set({ left: newLeft });
    canvas.renderAll();
}

export function AlignHorizontalMiddle(canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if (!canvas || !selectedObject) return;
    const rect = getBoundsAndEdges(canvas);
    const activeObject = canvas.getActiveObject();
    const { height: eh } = activeObject.getBoundingRect();

    let newTop = (rect.top + (rect.height/2)) - (eh / 2);
    newTop = newTop / canvas.getZoom();

    activeObject.set({ top: newTop });
    canvas.renderAll();
}

export function AlignHorizontalRight(canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if (!canvas || !selectedObject) return;
    
    const rect =  getBoundsAndEdges(canvas);
    const activeObject = canvas.getActiveObject();
    const { width: ew } = activeObject.getBoundingRect();

    let newLeft = rect.right - ew;

    activeObject.set({ left: newLeft });
    canvas.renderAll();
}

export const getBoundsAndEdges = (canvas: fabric.Canvas): { top: number, left: number, right: number, width: number, bottom: number, height: number, centerH: number, centerV: number } => {
    const Rect = {
        height: canvas.getHeight(),
        width: canvas.getWidth(),
        top: 0,
        left: 0,
        bottom: 0,
        right: 0,
        centerH: 0,
        centerV: 0
    };

    Rect.bottom = Rect.height;
    Rect.right = Rect.width;
    Rect.centerH = Rect.height / 2;
    Rect.centerV = Rect.width / 2;

    const clipLayer = canvas.getObjects().find(o => {
        const castedObject = o as IEditorObject;
        return castedObject.get('objectType') === EditorObjectType.CLIP;
    });

    if (clipLayer) {
        const { height, width, top, left } = clipLayer.getBoundingRect();
        Rect.height = height;
        Rect.width = width;
        Rect.top = top;
        Rect.left = left;
        Rect.right = Rect.width + Rect.left;
        Rect.bottom = Rect.height + Rect.top;
        Rect.centerH = Rect.height / 2 + Rect.top;
        Rect.centerV = Rect.width / 2 + Rect.left;
    }

    return Rect;
}