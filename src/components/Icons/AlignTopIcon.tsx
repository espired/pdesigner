import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function AlignTopIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M3 4.8L3 3L21 3L21 4.8L3 4.8ZM10.2 21L10.2 6.6L7.5 6.6L7.5 21L10.2 21ZM16.5 15.6L16.5 6.6L13.8 6.6L13.8 15.6L16.5 15.6Z" />
        </SvgIcon>
    )
}