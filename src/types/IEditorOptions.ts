import IEditorObject from './IEditorObject';
import IEditorOptionsBoard from './IEditorOptionsBoard';

export default interface IEditorOptions {
    boards: IEditorOptionsBoard[],
    width: number,
    height: number,
    palette?: string[],
    onLayersChanged?: (layers: IEditorObject[]) => void,
    onActiveObjectSelected?: (activeObject: IEditorObject | undefined) => void,
    fonts?: string[]
}