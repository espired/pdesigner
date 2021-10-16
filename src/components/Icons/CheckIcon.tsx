import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function CheckIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M8.72727 16.2047L4.43182 11.3689L3 12.9808L8.72727 19.4286L21 5.61194L19.5682 4L8.72727 16.2047Z" />
        </SvgIcon>
    )
}