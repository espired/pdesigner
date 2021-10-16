import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function TextCapitalizeIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M8.68421 5V7.84211H13.4211V19.2105H16.2632V7.84211H21V5H8.68421ZM3 12.5789H5.84211V19.2105H8.68421V12.5789H11.5263V9.73684H3V12.5789Z" />
        </SvgIcon>
    )
}