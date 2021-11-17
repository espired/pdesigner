import { Button } from "@streamelements/frontend-ui";
import { useEditorState } from "../../../store/EditorContext";
import { AlignHorizontalLeft, AlignHorizontalMiddle, AlignVerticalBottom, AlignVerticalMiddle, AlignVerticalTop } from "../../../utils/EditorAlignUtils";
import { AlignBottomIcon, AlignHorizontalCenterIcon, AlignLeftIcon, AlignRightIcon, AlignTopIcon, AlignVerticalCenterIcon, FlipHorizontalIcon, FlipVerticalIcon } from "../../Icons";
import { ActionBlock, mediumIcon, smallIconButton } from "../Editor.style";
import { setObjProp } from "../EditorCanvasActions";
import { ActionVerticalDivider } from "./Controller.style";

export default function GroupController() {
    const { state } = useEditorState();

    return state.canvas ? (
        <>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => AlignHorizontalLeft(state.canvas, state.selectedObject)} className={smallIconButton}>
                    <AlignLeftIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => AlignHorizontalMiddle(state.canvas, state.selectedObject)} className={smallIconButton}>
                    <AlignRightIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => AlignVerticalTop(state.canvas, state.selectedObject)} className={smallIconButton}>
                    <AlignTopIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => AlignVerticalBottom(state.canvas, state.selectedObject)} className={smallIconButton}>
                    <AlignBottomIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => AlignVerticalMiddle(state.canvas, state.selectedObject)} className={smallIconButton}>
                    <AlignVerticalCenterIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => AlignHorizontalMiddle(state.canvas, state.selectedObject)} className={smallIconButton}>
                    <AlignHorizontalCenterIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionVerticalDivider />
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => setObjProp(state, 'flipX', !state.canvas?.getActiveObject().get('flipX'))} className={smallIconButton}>
                    <FlipHorizontalIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
            <ActionBlock clearVerticalSpacing>
                <Button iconButton variant='ghost' color='neutral' onClick={() => setObjProp(state, 'flipY', !state.canvas?.getActiveObject().get('flipY'))} className={smallIconButton}>
                    <FlipVerticalIcon className={mediumIcon} />
                </Button>
            </ActionBlock>
        </>
    ) : null;
}