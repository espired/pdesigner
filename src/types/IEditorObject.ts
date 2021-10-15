import EditorObjectType from "./EditorObjectType";

export default interface IEditorObject extends fabric.Object {
    objectType: EditorObjectType,
    locked: boolean
}