import { PropsWithChildren } from "react";
import { SvgIcon } from "@streamelements/frontend-icons";
import SvgIconProps from "../../types/SvgIconProps";

export default function BugIcon(props: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIcon {...props}>
            <path d="M19.3474 7.69888H17.4955C17.0351 6.90081 16.4007 6.21529 15.6334 5.69348L16.5849 4.74194C16.9839 4.3429 16.9839 3.69831 16.5849 3.29928C16.1859 2.90024 15.5413 2.90024 15.1422 3.29928L13.6382 4.80333C13.1675 4.69078 12.6867 4.62939 12.1853 4.62939C11.684 4.62939 11.2031 4.69078 10.7426 4.80333L9.22836 3.29928C8.82933 2.90024 8.18474 2.90024 7.7857 3.29928C7.38667 3.69831 7.38667 4.3429 7.7857 4.74194L8.72701 5.69348C7.96987 6.21529 7.33551 6.90081 6.87509 7.69888H5.02316C4.46042 7.69888 4 8.1593 4 8.72204C4 9.28478 4.46042 9.7452 5.02316 9.7452H6.13841C6.08725 10.0828 6.04633 10.4205 6.04633 10.7684V11.7915H5.02316C4.46042 11.7915 4 12.252 4 12.8147C4 13.3774 4.46042 13.8379 5.02316 13.8379H6.04633V14.861C6.04633 15.2089 6.08725 15.5465 6.13841 15.8842H5.02316C4.46042 15.8842 4 16.3446 4 16.9073C4 17.4701 4.46042 17.9305 5.02316 17.9305H6.87509C7.93918 19.762 9.91388 21 12.1853 21C14.4567 21 16.4314 19.762 17.4955 17.9305H19.3474C19.9102 17.9305 20.3706 17.4701 20.3706 16.9073C20.3706 16.3446 19.9102 15.8842 19.3474 15.8842H18.2322C18.2834 15.5465 18.3243 15.2089 18.3243 14.861V13.8379H19.3474C19.9102 13.8379 20.3706 13.3774 20.3706 12.8147C20.3706 12.252 19.9102 11.7915 19.3474 11.7915H18.3243V10.7684C18.3243 10.4205 18.2834 10.0828 18.2322 9.7452H19.3474C19.9102 9.7452 20.3706 9.28478 20.3706 8.72204C20.3706 8.1593 19.9102 7.69888 19.3474 7.69888ZM13.2085 15.8842H11.1621C10.5994 15.8842 10.139 15.4238 10.139 14.861C10.139 14.2983 10.5994 13.8379 11.1621 13.8379H13.2085C13.7712 13.8379 14.2316 14.2983 14.2316 14.861C14.2316 15.4238 13.7712 15.8842 13.2085 15.8842ZM13.2085 11.7915H11.1621C10.5994 11.7915 10.139 11.3311 10.139 10.7684C10.139 10.2056 10.5994 9.7452 11.1621 9.7452H13.2085C13.7712 9.7452 14.2316 10.2056 14.2316 10.7684C14.2316 11.3311 13.7712 11.7915 13.2085 11.7915Z"/>
        </SvgIcon>
    )
}