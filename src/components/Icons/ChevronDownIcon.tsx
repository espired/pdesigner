import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function ChevronDownIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M18.2416 7.47114L11.9919 13.7208L5.74228 7.47114C5.11409 6.84295 4.09933 6.84295 3.47114 7.47114C2.84295 8.09933 2.84295 9.11409 3.47114 9.74228L10.8644 17.1356C11.4926 17.7638 12.5074 17.7638 13.1356 17.1356L20.5289 9.74228C21.157 9.11409 21.157 8.09933 20.5289 7.47114C19.9007 6.85906 18.8698 6.84295 18.2416 7.47114V7.47114Z" />
        </SvgIcon>
    )
}