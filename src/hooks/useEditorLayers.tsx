import { useEffect, useState } from "react";
import { useEditorState } from "../store/EditorContext";
import IEditorObject from "../types/IEditorObject";

export default function useEditorLayers() {
    const { state } = useEditorState();
    const [layers, setLayers] = useState<IEditorObject[]>([]);

    useEffect(() => {
        if (!state.canvas) return;
        const canvas = state.canvas;

        const callbackFn = () => !!state.canvas && setLayers(state.canvas.getObjects() as IEditorObject[]);

        canvas.on('objects:loaded', callbackFn);
        canvas.on('object:added', callbackFn);
        canvas.on('object:modified', callbackFn);
        canvas.on('object:removed', callbackFn);

        return () => {
            if (!state.canvas) return;
            const canvas = state.canvas;

            canvas.off('objects:loaded', callbackFn);
            canvas.off('object:added', callbackFn);
            canvas.off('object:modified', callbackFn);
            canvas.off('object:removed', callbackFn);
        }

    }, [state.canvas]);

    return layers;
}