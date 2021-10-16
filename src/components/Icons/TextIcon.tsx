import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function TextIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M4 3V6.6H10.6V21H14.2V6.6H20.8V3H4Z"/>
        </SvgIcon>
    )
}