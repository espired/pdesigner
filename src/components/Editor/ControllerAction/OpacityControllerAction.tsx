import { useEffect, useState } from "react";
import { Slider, Text } from "@streamelements/frontend-ui";
import { useEditorState } from "../../../store/EditorContext";
import IEditorObject from "../../../types/IEditorObject";
import { ActionBlock } from "../Editor.style";
import { setEditorObjectProp } from "../../../utils/editorHelpers";

export default function OpacityControllerAction() {
    const { state } = useEditorState();
    const [ value, setValue ] = useState<number>(1);
    
    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorObject;
        const loadedValue = activeObject.get('opacity');

        !!loadedValue && setValue(loadedValue);
    }, [state.canvas]);
    
    useEffect(() => {
        !!value && setEditorObjectProp('opacity', value, state.canvas, state.selectedObject);
    }, [value, state.canvas, state.selectedObject]);

    return (
        <ActionBlock>
            <div style={{ display: 'grid', gridAutoColumns: 'max-content', gridAutoFlow: 'column', placeItems: 'center', gap: '8px' }}>
                <Slider.Root min={50} max={100} step={1} style={{ width: 100 }} value={[~~((value || 1) * 100)]} onValueChange={(v) => setValue(v[0] / 100)}/><Text.Body variant='caption'>{~~(value*100)}</Text.Body>
            </div>

        </ActionBlock>
    );
}