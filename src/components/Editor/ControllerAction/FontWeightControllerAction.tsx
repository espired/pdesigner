import { useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import IEditorTextObject from "../../../types/IEditorTextObject";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import ThemedSelect from "../../ThemedSelect";
import { ActionBlock } from "../Editor.style";

const items = [
    {
        label: 'Normal',
        value: 100
    },
    {
        label: 'Bold',
        value: 800
    }
];

export default function FontWeightControllerAction() {
    const { state } = useEditorState();
    const [value, setValue] = useState<string | number>();

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;

        if(!activeObject) return;

        const loadedFontWeight = activeObject.get('fontWeight');

        !!loadedFontWeight && setValue(loadedFontWeight);
        // eslint-disable-next-line
    }, []);

    useEffect(() => {
        !!value && setEditorObjectProp('fontWeight', value, state.canvas, state.selectedObject);
    }, [value, state.canvas, state.selectedObject]);

    return (
        <ActionBlock clearVerticalSpacing>
            <ThemedSelect
                placeholder='Weight...'
                size='small'
                borderless
                options={items}
                value={items.find(i => i.value === value)}
                onChange={(v: { value: number }) => setValue(v.value)}
            />
        </ActionBlock>
    );
}