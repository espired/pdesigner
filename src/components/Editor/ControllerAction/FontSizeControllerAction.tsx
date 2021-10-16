import { useEffect, useState } from "react";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { useEditorState } from "../../../store/EditorContext";
import ThemedSelect from "../../ThemedSelect";
import { ActionBlock } from "../Editor.style";

const availableWidth = [16, 24, 32, 40, 48, 56, 64, 72, 80];

export default function FontSizeControllerAction() {
    const { state } = useEditorState();
    // @ts-ignore
    const [fontSize, setFontSize] = useState<string | number>(state.selectedObject?.get('fontSize'));

    useEffect(() => setEditorObjectProp(state, 'fontSize', fontSize), [fontSize, state]);

    const getValueObjFromNumber = (value: number | string) => ({ label: `${value}px`, value });

    return (
        <ActionBlock clearVerticalSpacing>
            <ThemedSelect
                borderless
                size='medium'
                value={getValueObjFromNumber(fontSize)}
                options={availableWidth.map(a => getValueObjFromNumber(a))}
                onChange={(newVal: any) => setFontSize(newVal.value)}
            />
        </ActionBlock>
    );
}