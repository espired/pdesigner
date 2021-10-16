import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function PlusIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M19.7143 13.5857H13.2857V20.0143C13.2857 20.7214 12.7071 21.3 12 21.3C11.2929 21.3 10.7143 20.7214 10.7143 20.0143V13.5857H4.28571C3.57857 13.5857 3 13.0071 3 12.3C3 11.5929 3.57857 11.0143 4.28571 11.0143H10.7143V4.58571C10.7143 3.87857 11.2929 3.3 12 3.3C12.7071 3.3 13.2857 3.87857 13.2857 4.58571V11.0143H19.7143C20.4214 11.0143 21 11.5929 21 12.3C21 13.0071 20.4214 13.5857 19.7143 13.5857Z"/>
        </SvgIcon>
    )
}