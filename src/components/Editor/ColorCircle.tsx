import { styled, Text } from "@streamelements/frontend-ui";
import { Fragment, PropsWithChildren } from "react";
import { invertColor } from "../../utils/ColorUtils";
import CheckIcon from "../Icons/CheckIcon";

const Container = styled('div', {
    height: 24,
    width: 24,
    borderRadius: '10em',
    border: '1px solid rgba(0,0,0,0.1)',
    transition: 'box-shadow 0.2s ease-in-out',
    justifySelf: 'center',
    position: 'relative',

    '&:hover': {
        cursor: 'pointer',
        boxShadow: '0 0 0 2px $colors$uiPrimaryMain'
    },

    variants: {
        disabled: {
            true: {
                opacity: 0.2
            }
        }
    }
});

const SelectedIcon = styled('div', {
    display: 'grid',
    height: '100%',
    placeContent: 'center',
    color: '#fff'
})

interface Props {
    name?: string,
    color: string,
    onClick: () => void,
    selected?: boolean,
    disabled?: boolean
}

const StyledCheckIcon = styled(CheckIcon, {
    fontSize: '1.25rem !important'
});

export default function ColorCircle(props: PropsWithChildren<Props>) {
    return (
        <Fragment>
            <Container
                onClick={props.onClick}
                style={{
                    backgroundColor: props.color
                }}
                disabled={props.disabled}
            >
                {!!props.selected && (
                    <SelectedIcon>
                        <Text.Body variant='caption' css={{ color: invertColor(props.color, true), lineHeight: 0 }}>
                            <StyledCheckIcon />
                        </Text.Body>
                    </SelectedIcon>
                )}
            </Container>
        </Fragment>
    );
}