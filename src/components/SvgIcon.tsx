import { styled } from "@streamelements/frontend-ui";
import { CSSProperties, PropsWithChildren } from "react";

interface SvgIconProps {
    alt: string | undefined;
    icon: string;
    style?: CSSProperties;
    className?: string;
    width?: number | string;
    height?: number | string;
    static?: boolean,
    disabled?: boolean,
    color?: 'primary' | 'success' | 'attention' | 'error' | 'neutral'
    bold?: boolean,
    onClick?: () => void,
    itemCentered?: boolean
}

export const SvgIconContainer = styled('p', {
    display: 'grid',
    opacity: 0.5,
    transition: 'opacity 0.2s ease-in-out',
    cursor: 'pointer',

    '&:hover': {
        opacity: 1,
    },

    variants: {
        itemCentered: {
            true: {
                placeItems: 'center'
            }
        },
        static: {
            true: {
                opacity: 1,
            }
        },
        bold: {
            true: {
                opacity: 0.7,
            }
        },
        disabled: {
            true: {
                opacity: 0.3,
                '&:hover': {
                    pointerEvents: 'none',
                    cursor: 'default',
                    opacity: 0.3,
                }
            }
        }
    }
});

export default function SvgIcon({ width = 'auto', height = 'auto', alt, icon, ...props }: PropsWithChildren<SvgIconProps>) {
    return (
        <SvgIconContainer {...props}>
            <img src={icon} style={{ width, height }} alt={alt} />
        </SvgIconContainer>
    );
}