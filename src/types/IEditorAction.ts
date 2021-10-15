import EditorActions from "../store/EditorActions";

export default interface IEditorAction {
    type: EditorActions,
    payload: any
}