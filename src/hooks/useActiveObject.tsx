import { useCallback, useEffect, useState } from "react";
import { useEditorState } from "../store/EditorContext";
import IEditorObject from "../types/IEditorObject";

export default function useActiveObject() {
    const { state } = useEditorState();
    const [activeObject, setActiveObject] = useState<IEditorObject>();

    const handleObjectSelected = useCallback(() => {
        const activeObj = state.canvas?.getActiveObject() as IEditorObject;
        !!activeObj && setActiveObject(activeObj);
    }, [state.canvas, setActiveObject]);

    const handleObjectDeselected = useCallback(() => {
        setActiveObject(undefined);
    }, [setActiveObject]);

    useEffect(() => {
        if (!state.canvas) return;
        const canvas = state.canvas;

        canvas.on('selection:updated', () => {
            handleObjectDeselected();
            handleObjectSelected();
        });
        canvas.on('selection:created', handleObjectSelected);
        canvas.on('selection:cleared', handleObjectDeselected);

        return () => {
            canvas.off('selection:cleared');
            canvas.off('selection:updated');
            canvas.off('selection:created');
        }
    }, [state.canvas, handleObjectSelected, handleObjectDeselected]);

    return activeObject;
}