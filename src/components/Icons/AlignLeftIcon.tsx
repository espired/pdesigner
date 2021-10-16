import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function AlignLeftIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M4.8 21H3V3H4.8V21ZM21 7.5H6.6V10.2H21V7.5ZM15.6 13.8H6.6V16.5H15.6V13.8Z" />
        </SvgIcon>
    )
}