import { fabric } from 'fabric';

export default interface IEditorState {
    canvas?: fabric.Canvas,
    layers: any[]
}