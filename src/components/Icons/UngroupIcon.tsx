import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function UngroupIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M19.3125 7.33976H15.2344H11.7626L10.2782 5.23823C10.1724 5.08849 10.002 5 9.82031 5H6.34012H4.6875C3.76162 5 3 5.76801 3 6.70164V17.2984C3 18.2314 3.76162 19 4.6875 19H19.3125C20.2384 19 21 18.2314 21 17.2984V9.04141C21 8.10834 20.2384 7.33976 19.3125 7.33976ZM14.4817 13.7453H9.516C9.20494 13.7385 8.95912 13.4793 8.96531 13.1656C8.97206 12.8622 9.2145 12.6171 9.516 12.6109H14.4817C14.7928 12.6177 15.0386 12.8769 15.0324 13.19C15.0257 13.494 14.7827 13.7385 14.4817 13.7453Z"/>
        </SvgIcon>
    )
}