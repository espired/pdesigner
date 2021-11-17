import IEditorObject from "./IEditorObject";
import { fabric } from 'fabric';

export default interface IEditorTextObject extends IEditorObject, fabric.IText {
    verticalText?: boolean,
}