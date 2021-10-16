import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function TextItalicIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M9.14286 4.92857C9.14286 5.99571 10.0043 6.85714 11.0714 6.85714H11.9843L7.58714 17.1429H5.92857C4.86143 17.1429 4 18.0043 4 19.0714C4 20.1386 4.86143 21 5.92857 21H12.3571C13.4243 21 14.2857 20.1386 14.2857 19.0714C14.2857 18.0043 13.4243 17.1429 12.3571 17.1429H11.4443L15.8414 6.85714H17.5C18.5671 6.85714 19.4286 5.99571 19.4286 4.92857C19.4286 3.86143 18.5671 3 17.5 3H11.0714C10.0043 3 9.14286 3.86143 9.14286 4.92857Z" />
        </SvgIcon>
    )
}