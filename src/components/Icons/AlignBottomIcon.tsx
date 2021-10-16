import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function AlignBottomIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M21 19.2L21 21L3 21L3 19.2L21 19.2ZM13.8 3L13.8 17.4L16.5 17.4L16.5 3L13.8 3ZM7.5 8.4L7.5 17.4L10.2 17.4L10.2 8.4L7.5 8.4Z" />
        </SvgIcon>
    )
}