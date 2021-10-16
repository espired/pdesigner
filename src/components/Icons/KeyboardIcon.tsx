import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function KeyboardIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M19.2 6H4.8C3.81 6 3.009 6.81 3.009 7.8L3 16.8C3 17.79 3.81 18.6 4.8 18.6H19.2C20.19 18.6 21 17.79 21 16.8V7.8C21 6.81 20.19 6 19.2 6ZM11.1 8.7H12.9V10.5H11.1V8.7ZM11.1 11.4H12.9V13.2H11.1V11.4ZM8.4 8.7H10.2V10.5H8.4V8.7ZM8.4 11.4H10.2V13.2H8.4V11.4ZM7.5 13.2H5.7V11.4H7.5V13.2ZM7.5 10.5H5.7V8.7H7.5V10.5ZM14.7 16.8H9.3C8.805 16.8 8.4 16.395 8.4 15.9C8.4 15.405 8.805 15 9.3 15H14.7C15.195 15 15.6 15.405 15.6 15.9C15.6 16.395 15.195 16.8 14.7 16.8ZM15.6 13.2H13.8V11.4H15.6V13.2ZM15.6 10.5H13.8V8.7H15.6V10.5ZM18.3 13.2H16.5V11.4H18.3V13.2ZM18.3 10.5H16.5V8.7H18.3V10.5Z"/>
        </SvgIcon>
    )
}