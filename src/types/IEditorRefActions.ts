import IEditorObject from "./IEditorObject";

export default interface IEditorRefActions {
    addText: (text: string) => void,
    selectLayer: (layer: IEditorObject) => void,
    exportToPNG: () => string | undefined
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