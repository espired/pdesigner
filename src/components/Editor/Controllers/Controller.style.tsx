import { styled } from '@streamelements/frontend-ui';

export const ActionVerticalDivider = styled('hr', {
    border: 0,
    borderLeft: '1px solid $uiDisabled25',
    height: 40,
    margin: '0 $base',

    variants: {
        dynamicHeight: {
            true: {
                height: '100%'
            }
        }
    }
});