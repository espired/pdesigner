import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function RedoIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M11.767 8.87934C14.0972 8.87934 16.2076 9.74988 17.8344 11.1656L21 8V15.914H13.086L16.2692 12.7308C15.0469 11.7108 13.4905 11.0777 11.767 11.0777C8.65413 11.0777 6.00733 13.1089 5.08402 15.914L3 15.2281C4.22228 11.5437 7.67806 8.87934 11.767 8.87934Z"/>
        </SvgIcon>
    )
}