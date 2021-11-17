import { PropsWithChildren } from "react";
import AlignController from "../ControllerAction/AlignController";
import ImageDPIControllerAction from "../ControllerAction/ImageDPIControllerAction";
import { ActionBlock } from "../Editor.style";
import { ActionVerticalDivider } from "./Controller.style";

interface Props {
    isSvg?: boolean
}

export default function ImageController(props: PropsWithChildren<Props>) {
    return (
        <>
            {!props.isSvg && (
                <>
                    <ActionBlock clearVerticalSpacing>
                        <ImageDPIControllerAction />
                    </ActionBlock>
                    <ActionVerticalDivider />
                </>
            )}
            <AlignController />
        </>
    )
}