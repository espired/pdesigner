import { useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import IEditorTextObject from "../../../types/IEditorTextObject";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { TextAlignCenterIcon, TextAlignLeftIcon, TextAlignRightIcon } from "../../Icons";
import { ActionBlock, ActionTitle, smallIcon } from "../Editor.style";
import StyledButton from "../StyledButton";

export default function TextFormatControllerAction() {
    const { state } = useEditorState();
    const [value, setValue] = useState<string>('left');

    useEffect(() => {
        if (!state.canvas) return;
        const activeObject = state.canvas?.getActiveObject() as IEditorTextObject;
        const loadedValue = activeObject.get('textAlign');

        !!loadedValue && setValue(loadedValue as string);
    }, [state.canvas]);

    useEffect(() => {
        !!value && setEditorObjectProp('textAlign', value, state.canvas, state.selectedObject);
    }, [value, state.canvas, state.selectedObject]);

    return (
        <>
            <ActionBlock>
                <ActionTitle variant='caption' weight='bold'>FORMAT</ActionTitle>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <StyledButton variant='ghost' color='neutral' size='tiny' onClick={() => setValue('left')}>
                    <TextAlignLeftIcon className={smallIcon} />
                </StyledButton>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <StyledButton variant='ghost' color='neutral' size='tiny' onClick={() => setValue('center')}>
                    <TextAlignCenterIcon className={smallIcon} />
                </StyledButton>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <StyledButton variant='ghost' color='neutral' size='tiny' onClick={() => setValue('right')}>
                    <TextAlignRightIcon className={smallIcon} />
                </StyledButton>
            </ActionBlock>
        </>
    );
}