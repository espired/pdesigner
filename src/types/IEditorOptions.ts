import IEditorObject from './IEditorObject';
import IEditorOptionsBoard from './IEditorOptionsBoard';

export default interface IEditorOptions {
    boards: IEditorOptionsBoard[],
    width: number,
    height: number,
    palette?: string[],
    preserveGraphicsOnBoardChange?: boolean,
    onLayersChanged?: (layers: IEditorObject[]) => void,
    onActiveObjectSelected?: (activeObject: IEditorObject | undefined) => void,
    onSave?: (dataUrl: string) => void,
    fonts?: string[]
}