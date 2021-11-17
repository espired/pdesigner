import AlignController from "../ControllerAction/AlignController";
import FillControllerAction from "../ControllerAction/FillControllerAction";
import FontFaceControllerAction from "../ControllerAction/FontFaceControllerAction";
import FontSizeControllerAction from "../ControllerAction/FontSizeControllerAction";
import FontStyleControllerAction from "../ControllerAction/FontStyleControllerAction";
import FontWeightControllerAction from "../ControllerAction/FontWeightControllerAction";
import StrokeControllerAction from "../ControllerAction/StrokeControllerAction";
import TextFormatControllerAction from "../ControllerAction/TextFormatControllerAction";
import { ActionBlock, ActionTitle } from "../Editor.style";
import { ActionVerticalDivider } from "./Controller.style";

export default function TextController() {
    return (
        <>
            <ActionBlock>
                <ActionTitle variant='caption' weight='bold'>FONT</ActionTitle>
            </ActionBlock>
            <FillControllerAction />
            <FontFaceControllerAction />
            <FontSizeControllerAction />
            <FontWeightControllerAction />
            <FontStyleControllerAction />
            <StrokeControllerAction />
            <ActionVerticalDivider />
            <TextFormatControllerAction />
            <AlignController />
        </>
    )
}