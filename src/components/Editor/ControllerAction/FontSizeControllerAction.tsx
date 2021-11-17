import { useEffect, useState } from "react";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { useEditorState } from "../../../store/EditorContext";
import ThemedSelect from "../../ThemedSelect";
import { ActionBlock } from "../Editor.style";
import IEditorTextObject from "../../../types/IEditorTextObject";

const availableWidth = [16, 24, 32, 40, 48, 56, 64, 72, 80];

export default function FontSizeControllerAction() {
    const { state } = useEditorState();
    // @ts-ignore
    const [fontSize, setFontSize] = useState<number>(state.selectedObject?.get('fontSize'));

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const loadedFontSize = activeObject.get('fontSize');

        !!loadedFontSize && setFontSize(loadedFontSize);
    }, [state.canvas]);

    useEffect(() => {
        !!fontSize && setEditorObjectProp('fontSize', fontSize, state.canvas, state.selectedObject);
    }, [fontSize, state.canvas, state.selectedObject]);

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