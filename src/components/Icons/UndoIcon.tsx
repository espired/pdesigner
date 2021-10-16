import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function UndoIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M12.233 8.87934C9.90278 8.87934 7.79238 9.74988 6.16561 11.1656L3 8V15.914H10.914L7.73083 12.7308C8.9531 11.7108 10.5095 11.0777 12.233 11.0777C15.3459 11.0777 17.9927 13.1089 18.916 15.914L21 15.2281C19.7777 11.5437 16.3219 8.87934 12.233 8.87934Z"/>
        </SvgIcon>
    )
}