import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function DownloadIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M17.2718 9.35294H15.5882V4.05882C15.5882 3.47647 15.1118 3 14.5294 3H10.2941C9.71176 3 9.23529 3.47647 9.23529 4.05882V9.35294H7.55176C6.60941 9.35294 6.13294 10.4965 6.8 11.1635L11.66 16.0235C12.0729 16.4365 12.74 16.4365 13.1529 16.0235L18.0129 11.1635C18.68 10.4965 18.2141 9.35294 17.2718 9.35294ZM5 19.9412C5 20.5235 5.47647 21 6.05882 21H18.7647C19.3471 21 19.8235 20.5235 19.8235 19.9412C19.8235 19.3588 19.3471 18.8824 18.7647 18.8824H6.05882C5.47647 18.8824 5 19.3588 5 19.9412Z"/>
        </SvgIcon>
    )
}