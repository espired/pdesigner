import { useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import IEditorTextObject from "../../../types/IEditorTextObject";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import ThemedSelect from "../../ThemedSelect";
import { ColorPicker } from "../ColorPicker";
import { ActionBlock, ActionTitle } from "../Editor.style";

const availableWidth = [1,2,3,4,5,6,7,8,9,10];

export default function StyleControllerAction() {
    const { state } = useEditorState();
    const [strokeValue, setStrokeValue] = useState<string>('');
    const [strokeWidthValue, setStrokeWidthValue] = useState<number>(0);

    const getValueObjFromNumber = (value: number | string) => {
        const label = (value === 0) ? 'None' : value;
        return { label: label, value };
    };

    const getOptions = () => {
        const items = availableWidth.map(a => getValueObjFromNumber(a));
        return [{ label: 'None', value: 0 }, ...items];
    }

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const loadedStrokeValue = activeObject.get('stroke');
        const loadedStrokeWidthValue = activeObject.get('strokeWidth');

        !!loadedStrokeValue && setStrokeValue(loadedStrokeValue);
        !!loadedStrokeWidthValue && setStrokeWidthValue(loadedStrokeWidthValue);
    }, [state.canvas]);

    useEffect(() => {
        !!strokeWidthValue && setEditorObjectProp('strokeWidth', strokeWidthValue, state.canvas, state.selectedObject);
    }, [strokeWidthValue, state.canvas, state.selectedObject]);

    useEffect(() => {
        !!strokeValue && setEditorObjectProp('stroke', strokeValue, state.canvas, state.selectedObject);
    }, [strokeValue, state.canvas, state.selectedObject]);

    return (
        <>
            <ActionBlock>
                <ActionTitle variant='caption' weight='bold'>OUTLINE</ActionTitle>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <ColorPicker items={[]} value={strokeValue} onChange={setStrokeValue} />
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <ThemedSelect
                    borderless
                    size='small'
                    value={getValueObjFromNumber(strokeWidthValue)}
                    options={getOptions()}
                    onChange={(newVal: any) => setStrokeWidthValue(newVal.value)}
                    formatOptionLabel={(o: { label: string, value: string }) => o.label}
                />
            </ActionBlock>
        </>
    );
}