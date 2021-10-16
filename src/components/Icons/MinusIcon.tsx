import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function MinusIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M19.7143 13.5714H4.28571C3.57857 13.5714 3 12.9929 3 12.2857C3 11.5786 3.57857 11 4.28571 11H19.7143C20.4214 11 21 11.5786 21 12.2857C21 12.9929 20.4214 13.5714 19.7143 13.5714Z"/>
        </SvgIcon>
    )
}