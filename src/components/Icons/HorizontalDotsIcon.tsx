import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function HorizontalDotsIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M5.25 10C4.0125 10 3 11.0125 3 12.25C3 13.4875 4.0125 14.5 5.25 14.5C6.4875 14.5 7.5 13.4875 7.5 12.25C7.5 11.0125 6.4875 10 5.25 10ZM18.75 10C17.5125 10 16.5 11.0125 16.5 12.25C16.5 13.4875 17.5125 14.5 18.75 14.5C19.9875 14.5 21 13.4875 21 12.25C21 11.0125 19.9875 10 18.75 10ZM12 10C10.7625 10 9.75 11.0125 9.75 12.25C9.75 13.4875 10.7625 14.5 12 14.5C13.2375 14.5 14.25 13.4875 14.25 12.25C14.25 11.0125 13.2375 10 12 10Z"/>
        </SvgIcon>
    )
}