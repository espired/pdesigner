import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function TextAlignCenterIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M7 16C7 16.55 7.45 17 8 17H16C16.55 17 17 16.55 17 16C17 15.45 16.55 15 16 15H8C7.45 15 7 15.45 7 16ZM4 21H20C20.55 21 21 20.55 21 20C21 19.45 20.55 19 20 19H4C3.45 19 3 19.45 3 20C3 20.55 3.45 21 4 21ZM4 13H20C20.55 13 21 12.55 21 12C21 11.45 20.55 11 20 11H4C3.45 11 3 11.45 3 12C3 12.55 3.45 13 4 13ZM7 8C7 8.55 7.45 9 8 9H16C16.55 9 17 8.55 17 8C17 7.45 16.55 7 16 7H8C7.45 7 7 7.45 7 8ZM3 4C3 4.55 3.45 5 4 5H20C20.55 5 21 4.55 21 4C21 3.45 20.55 3 20 3H4C3.45 3 3 3.45 3 4Z"/>
        </SvgIcon>
    )
}