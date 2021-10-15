import { createContext, PropsWithChildren, useContext, useReducer } from "react";
import IEditorAction from "../types/IEditorAction";
import IEditorState from "../types/IEditorState";
import EditorReducer from "./EditorReducer";
import InitialEditorState from "./InitialEditorState";

export const EditorContext = createContext<{
    state: IEditorState,
    dispatch: (action: IEditorAction) => void
}>({
    state: InitialEditorState,
    dispatch: () => { }
});

const EditorProvider = (props: PropsWithChildren<any>) => {
    const [state, dispatch] = useReducer(EditorReducer, InitialEditorState);
    return <EditorContext.Provider value={{ state, dispatch }} {...props} />;
}

export const useEditorState = () => useContext(EditorContext);

export default EditorProvider;