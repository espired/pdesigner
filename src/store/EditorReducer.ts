import IEditorAction from "../types/IEditorAction";
import IEditorState from "../types/IEditorState";
import EditorActions from "./EditorActions";

export default function EditorReducer(state: IEditorState, action: IEditorAction) {
    const newState = { ...state };

    switch (action.type) {
        case EditorActions.SET_CANVAS:
            newState.canvas = action.payload;
            break;

        case EditorActions.SET_LAYERS:
            newState.layers = action.payload;
            break;


        case EditorActions.SET_OPTIONS:
            newState.options = action.payload;
            break;

        case EditorActions.SET_SELECTED_OBJECT:
            newState.selectedObject = action.payload;
            break;
    }

    return newState;
}