import IEditorOptionsBoardClip from "./IEditorOptionsBoardClip";

export default interface IEditorOptionsBoard {
    name: string,
    backgroundColor?: string,
    backgroundImage?: string,
    supportsModelPreview?: boolean,
    backgroundImageOverlay?: string,
    dimensions:  {
        height: number,
        width: number
    },
    clip?: IEditorOptionsBoardClip
}