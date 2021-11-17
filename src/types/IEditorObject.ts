import EditorObjectType from "./EditorObjectType";

export default interface IEditorObject extends fabric.Object {
    id: string,
    objectType: EditorObjectType,
    locked?: boolean
}