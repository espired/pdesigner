import { styled, Text } from '@streamelements/frontend-ui';

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