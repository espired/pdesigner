import { fabric } from 'fabric';
import EditorObjectType from '../../types/EditorObjectType';
import IEditorObject from '../../types/IEditorObject';
import IEditorState from '../../types/IEditorState';
import { v4 as uuid } from 'uuid';

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
    [state.selectedObject].forEach(o => o && state.canvas?.remove(o));
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