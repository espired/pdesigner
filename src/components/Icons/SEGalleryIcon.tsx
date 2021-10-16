import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function SEGalleryIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M21 15.6V4.8C21 3.81 20.19 3 19.2 3H8.4C7.41 3 6.6 3.81 6.6 4.8V15.6C6.6 16.59 7.41 17.4 8.4 17.4H19.2C20.19 17.4 21 16.59 21 15.6ZM11.1 12L12.927 14.439L15.6 11.1L19.2 15.6H8.4L11.1 12ZM3 6.6V19.2C3 20.19 3.81 21 4.8 21H17.4V19.2H4.8V6.6H3Z" />
        </SvgIcon>
    )
}