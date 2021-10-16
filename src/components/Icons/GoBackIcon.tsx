import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function GoBackIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M21 10.875H7.30875L13.5975 4.58625L12 3L3 12L12 21L13.5862 19.4138L7.30875 13.125H21V10.875Z"/>
        </SvgIcon>
    )
}