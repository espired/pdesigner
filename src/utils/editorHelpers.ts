import EditorObjectType from "../types/EditorObjectType";
import IEditorObject from "../types/IEditorObject";
import { fabric } from 'fabric';

export function setEditorObjectProp(key: any, value: string | number | boolean | undefined, canvas?: fabric.Canvas, selectedObject?: IEditorObject): void {
    if(!canvas || !selectedObject || value === undefined) return;
    const activeObject: IEditorObject = selectedObject;

    if(activeObject.get(key) === value) return;

    activeObject.set(key, value);

    // @ts-ignore
    if(activeObject?._objects && activeObject.get('objectType') !== EditorObjectType.GROUP) {
        // @ts-ignore
        activeObject._objects.forEach(obj => obj.set(key, value));
    }

    activeObject.setCoords();
    
    canvas.fire('object:manualChanged');
    canvas.renderAndReset();
}