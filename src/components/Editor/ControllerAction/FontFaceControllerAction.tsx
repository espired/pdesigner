import { styled } from "@streamelements/frontend-ui";
import { useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import ThemedSelect from "../../ThemedSelect";
import { ActionBlock } from "../Editor.style";
import { setEditorObjectProp } from '../../../utils/editorHelpers';
import IEditorTextObject from "../../../types/IEditorTextObject";

const StyledOption = styled('div', {
    padding: '$base calc($base * 2)',

    '&:hover': {
        cursor: 'pointer',
        background: '$uiTertiary',
        borderRadius: '$base'
    }
});

export default function FontFaceControllerAction() {
    const { state } = useEditorState();
    const [fonts, setFonts] = useState<{ label: string, value: string }[]>([]);
    const [value, setValue] = useState<string>('Arial');

    const CustomOption = (props: any) => {
        const { data, children, setValue } = props;
        return <StyledOption style={{ fontFamily: data.value }} onClick={() => setValue(data)}>{children}</StyledOption>;
    };

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const loadedValue = activeObject.get('fontFamily');

        !!loadedValue && setValue(loadedValue as string);
    }, [state.canvas]);

    useEffect(() => {
        // @ts-ignore 
        setValue(state.selectedObject?.get('fontFamily') || 'Arial');
    }, [state.selectedObject, state])
    
    useEffect(() => {
        !!value && setEditorObjectProp('fontFamily', value, state.canvas, state.selectedObject);
    }, [value, state.canvas, state.selectedObject]);

    useEffect(() => {
        if (!state.options || !state.options.fonts) return;

        setFonts(state.options?.fonts?.map(f => ({ label: f, value: f })));
    }, [state.options]);

    return (
        <ActionBlock clearVerticalSpacing>
            <ThemedSelect
                placeholder='Font...'
                borderless
                size='large'
                value={fonts.find(i => i.value === value)}
                onChange={(v: { value: string }) => setValue(v.value)}
                options={fonts}
                components={{
                    Option: CustomOption
                }}
            />
        </ActionBlock>
    )
}