import EditorObjectType from "../types/EditorObjectType";
import IEditorObject from "../types/IEditorObject";
import IEditorState from "../types/IEditorState";

export function setEditorObjectProp(state: IEditorState, key: any, value: string | number | boolean | undefined): void {
    if(!state.canvas || !state.selectedObject || value === undefined) return;
    const activeObject: IEditorObject = state.selectedObject;

    if(activeObject.get(key) === value) return;

    activeObject.set(key, value);

    // @ts-ignore
    if(activeObject?._objects && activeObject.get('objectType') !== EditorObjectType.GROUP) {
        // @ts-ignore
        activeObject._objects.forEach(obj => obj.set(key, value));
    }

    activeObject.setCoords();
    state.canvas.fire('object:manualChanged');

    state.canvas.renderAndReset();
}