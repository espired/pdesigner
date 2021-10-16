import { SvgIcon } from "@streamelements/frontend-icons";
import { PropsWithChildren } from "react";
import SvgIconProps from "../../types/SvgIconProps";

export default function TextDirectionIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M16.1143 4.77143H14.5714L9.68571 16.0857H11.8457L12.7714 13.8229H17.9143L18.84 16.0857H21L16.1143 4.77143ZM13.4194 11.9714L15.3429 6.808L17.2663 11.9714H13.4194V11.9714ZM6.08571 19.9429L9.17143 16.8571H7.11429V4H5.05714V16.8571H3L6.08571 19.9429Z" />
        </SvgIcon>
    )
}