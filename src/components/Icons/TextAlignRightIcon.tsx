import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function TextAlignRightIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M10 15H20C20.55 15 21 15.45 21 16C21 16.55 20.55 17 20 17H10C9.45 17 9 16.55 9 16C9 15.45 9.45 15 10 15ZM10 7H20C20.55 7 21 7.45 21 8C21 8.55 20.55 9 20 9H10C9.45 9 9 8.55 9 8C9 7.45 9.45 7 10 7ZM20 13H4C3.45 13 3 12.55 3 12C3 11.45 3.45 11 4 11H20C20.55 11 21 11.45 21 12C21 12.55 20.55 13 20 13ZM20 21H4C3.45 21 3 20.55 3 20C3 19.45 3.45 19 4 19H20C20.55 19 21 19.45 21 20C21 20.55 20.55 21 20 21ZM21 4C21 4.55 20.55 5 20 5H4C3.45 5 3 4.55 3 4C3 3.45 3.45 3 4 3H20C20.55 3 21 3.45 21 4Z"/>
        </SvgIcon>
    )
}