import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function AlignVerticalCenterIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M21 11.2L21 13L16.5 13L16.5 20.2L13.8 20.2L13.8 13L10.2 13L10.2 17.5L7.5 17.5L7.5 13L3 13L3 11.2L7.5 11.2L7.5 6.7L10.2 6.7L10.2 11.2L13.8 11.2L13.8 4L16.5 4L16.5 11.2L21 11.2Z" />
        </SvgIcon>
    )
}