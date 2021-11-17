import { useEffect, useState } from "react";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { useEditorState } from "../../../store/EditorContext";
import { ActionBlock, smallIcon } from "../Editor.style";
import IEditorTextObject from "../../../types/IEditorTextObject";
import StyledButton from "../StyledButton";
import { TextCapitalizeIcon, TextDirectionIcon, TextItalicIcon, TextUnderlineIcon } from "../../Icons";

export default function FontStyleControllerAction() {
    const { state } = useEditorState();
    const [underlineValue, setUnderlineValue] = useState<boolean>();
    const [italicValue, setItalicValue] = useState<string>();

    const capitalizeText = () => {
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        let text = activeObject.get('text');
        if (text === text?.toUpperCase()) {
            text = text?.toLowerCase();
        } else {
            text = text?.toUpperCase();
        }

        setEditorObjectProp('text', text, state.canvas, state.selectedObject);
    }

    const changeTextDirection = () => {
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const isVertical = activeObject.get('verticalText') || false;
        let text = activeObject.get('text');
        if (isVertical) {
            text = text?.replace(/(\n){1}/g, '');
        } else {
            text = text?.replace(/(\b\n){1}/g, '\n');
            text = text?.split('').join('\n')
        }

        setEditorObjectProp('text', text, state.canvas, state.selectedObject);
        setEditorObjectProp('verticalText', !isVertical, state.canvas, state.selectedObject);
    }

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const loadedUnderlineValue = activeObject.get('underline');
        const loadedItalicValue = activeObject.get('fontStyle');

        loadedUnderlineValue !== undefined && setUnderlineValue(loadedUnderlineValue as boolean);
        !!loadedItalicValue && setItalicValue(loadedItalicValue);
    }, [state.canvas]);

    useEffect(() => {
        underlineValue !== undefined && setEditorObjectProp('underline', !!underlineValue, state.canvas, state.selectedObject);
    }, [underlineValue, state.canvas, state.selectedObject]);

    useEffect(() => {
        !!italicValue && setEditorObjectProp('fontStyle', italicValue, state.canvas, state.selectedObject);
    }, [italicValue, state.canvas, state.selectedObject]);

    return (
        <ActionBlock clearVerticalSpacing>
            <StyledButton variant='ghost' color='neutral' size='tiny' onClick={() => setUnderlineValue(prevValue => !prevValue)} >
                <TextUnderlineIcon className={smallIcon} />
            </StyledButton>
            <StyledButton variant='ghost' color='neutral' size='tiny' onClick={() => setItalicValue(italicValue === 'italic' ? 'normal' : 'italic')}>
                <TextItalicIcon className={smallIcon} />
            </StyledButton>
            <StyledButton variant='ghost' color='neutral' size='tiny' onClick={capitalizeText}>
                <TextCapitalizeIcon className={smallIcon} />
            </StyledButton>
            <StyledButton variant='ghost' color='neutral' size='tiny' onClick={changeTextDirection}>
                <TextDirectionIcon className={smallIcon} />
            </StyledButton>
        </ActionBlock>
    );
}