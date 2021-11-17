import IEditorObject from "./IEditorObject";

export default interface IEditorRefActions {
    addText: (text: string) => void,
    selectLayer: (layer: IEditorObject) => void,
    exportToPNG: () => string | undefined,
    addImage: (imgUrl: string, name?: string) => void,
    addShape: (shapeUrl: string, name?: string) => void,
    loadFromJSON: (value: string) => void,
    reorderLayers: (layers: IEditorObject[]) => void,
    toggleLayerLock: (layer: IEditorObject) => void,
    toggleLayerVisibility: (layer: IEditorObject) => void,
    deleteLayer: (layer: IEditorObject) => void,
}

// Future structure
// const a = {
//     text: {
//         add: () => {}
//     },
//     shape: {
//         add: () => {}
//     },
//     image: {
//         add: () => {}
//     },
//     layer: {
//         select: () => {},
//         remove: () => {},
//         toggleVisible: () => {},
//         lock: () => {}
//     },
//     history: {
//         undo: () => {},
//         redo: () => {},
//     },
//     canvas: {
//         export: () => {},
//         clear: () => {}
//     }
// }