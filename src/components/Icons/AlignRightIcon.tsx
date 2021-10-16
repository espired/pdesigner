import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function AlignRightIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M19.2 3H21V21H19.2V3ZM3 10.2H17.4V7.5H3V10.2ZM8.4 16.5H17.4V13.8H8.4V16.5Z" />
        </SvgIcon>
    )
}