import { useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { ColorPicker } from "../ColorPicker";
import { ActionBlock } from "../Editor.style";

export default function FillControllerAction() {
    const { state } = useEditorState();
    const [ value, setValue ] = useState(state.selectedObject?.get('fill')?.toString());
    
    useEffect(() => setEditorObjectProp(state, 'fill', value || ''), [value, state]);

    return (
        <ActionBlock clearVerticalSpacing>
            <ColorPicker items={[]} value={value} onChange={setValue}/>
        </ActionBlock>
    );
}