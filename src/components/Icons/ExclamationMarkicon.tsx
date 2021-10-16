import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function ExclamationMarkicon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M12 3C7.032 3 3 7.032 3 12C3 16.968 7.032 21 12 21C16.968 21 21 16.968 21 12C21 7.032 16.968 3 12 3ZM12 12.9C11.505 12.9 11.1 12.495 11.1 12V8.4C11.1 7.905 11.505 7.5 12 7.5C12.495 7.5 12.9 7.905 12.9 8.4V12C12.9 12.495 12.495 12.9 12 12.9ZM12.9 16.5H11.1V14.7H12.9V16.5Z"/>
        </SvgIcon>
    )
}