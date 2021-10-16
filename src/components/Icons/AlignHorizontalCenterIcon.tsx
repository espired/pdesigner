import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function AlignHorizontalCenterIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M11.2 3H13V7.5H20.2V10.2H13V13.8H17.5V16.5H13V21H11.2V16.5H6.7V13.8H11.2V10.2H4V7.5H11.2V3Z" />
        </SvgIcon>
    )
}