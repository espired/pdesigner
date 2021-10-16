import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function WarningIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M3.87904 19.7796H20.121C20.7959 19.7796 21.2166 19.052 20.8835 18.4648L12.7582 4.44045C12.4163 3.85318 11.5749 3.85318 11.2418 4.44045L3.11646 18.4648C2.78339 19.052 3.20412 19.7796 3.87904 19.7796V19.7796ZM12.8809 17.15H11.1279V15.397H12.8809V17.15ZM12.0044 13.6439C11.5223 13.6439 11.1279 13.2495 11.1279 12.7674V11.0144C11.1279 10.5323 11.5223 10.1378 12.0044 10.1378C12.4865 10.1378 12.8809 10.5323 12.8809 11.0144V12.7674C12.8809 13.2495 12.4865 13.6439 12.0044 13.6439Z" fill="#F53656"/>
        </SvgIcon>
    )
}