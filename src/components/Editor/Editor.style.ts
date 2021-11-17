import { styled, Text, css } from '@streamelements/frontend-ui';

export const smallIcon = css({ fontSize: '1.125rem !important' })();
export const mediumIcon = css({ fontSize: '1.25rem !important' })();
export const whiteIcon = css({ color: '#fff !important' })();
export const smallIconButton = css({
    paddingLeft: '1rem',
    paddingRight: '1rem'
})();

export const midGreyText = css({ color: '$textPrimary50' })();

export const ActionBlock = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: '1fr',
    margin: 'calc($base * 1.5)',
    placeItems: 'center',

    variants: {
        withIcon: {
            true: {
                gridAutoColumns: '2fr'
            }
        },
        clearVerticalSpacing: {
            true: {
                margin: '0 calc($base * 0.5)'
            }
        },
        clearSpacing: {
            true: {
                margin: 0
            }
        }
    }
});

export const ActionTitle = styled(Text.Body, {
    margin: 0
})