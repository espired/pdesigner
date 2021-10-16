import FillControllerAction from "../ControllerAction/FillControllerAction";
import FontFaceControllerAction from "../ControllerAction/FontFaceControllerAction";
import FontSizeControllerAction from "../ControllerAction/FontSizeControllerAction";
import { ActionBlock, ActionTitle } from "../Editor.style";

export default function TextController() {
    return (
        <>
            <ActionBlock>
                <ActionTitle variant='caption' weight='bold'>FONT</ActionTitle>
            </ActionBlock>
            <FillControllerAction />
            <FontFaceControllerAction />
            <FontSizeControllerAction />
        </>
    )
}