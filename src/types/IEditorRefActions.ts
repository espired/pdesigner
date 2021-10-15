import IEditorObject from "./IEditorObject";

export default interface IEditorRefActions {
    addText: (text: string) => void,
    selectLayer: (layer: IEditorObject) => void,
    exportToPNG: () => string | undefined
}