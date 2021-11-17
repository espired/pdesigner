import { useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import IEditorTextObject from "../../../types/IEditorTextObject";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { ColorPicker } from "../ColorPicker";
import { ActionBlock } from "../Editor.style";

export default function FillControllerAction() {
    const { state } = useEditorState();
    const [ value, setValue ] = useState<string>();

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const loadedValue = activeObject.get('fill');

        !!loadedValue && setValue(loadedValue as string);
    }, [state.canvas]);
    
    useEffect(() => {
        !!value && setEditorObjectProp('fill', value, state.canvas, state.selectedObject);
    }, [value, state.canvas, state.selectedObject]);

    return (
        <ActionBlock clearVerticalSpacing>
            <ColorPicker items={[]} value={value} onChange={setValue}/>
        </ActionBlock>
    );
}