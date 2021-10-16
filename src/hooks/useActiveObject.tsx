import { useCallback, useEffect } from "react";
import EditorActions from "../store/EditorActions";
import { useEditorState } from "../store/EditorContext";

export default function useActiveObject() {
    const { state, dispatch } = useEditorState();

    const handleSelectedObject = useCallback(() => {
        dispatch({ type: EditorActions.SET_SELECTED_OBJECT, payload: state.canvas?.getActiveObject() });
    }, [state.canvas, dispatch]);

    useEffect(() => {
        if (!state.canvas) return;
        const canvas = state.canvas;

        canvas.on('before:selection:cleared', handleSelectedObject);
        canvas.on('selection:updated', handleSelectedObject);
        canvas.on('selection:created', handleSelectedObject);
        canvas.on('selection:cleared', handleSelectedObject);

        return () => {
            canvas.off('before:selection:cleared');
            canvas.off('selection:cleared');
            canvas.off('selection:updated');
            canvas.off('selection:created');
        }
    }, [state.canvas, handleSelectedObject]);

    return state.selectedObject;
}