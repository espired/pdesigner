import { fabric } from 'fabric';
import IEditorObject from './IEditorObject';
import IEditorOptions from './IEditorOptions';

export default interface IEditorState {
    canvas?: fabric.Canvas,
    layers: any[],
    selectedObject?: IEditorObject,
    options?: IEditorOptions
}