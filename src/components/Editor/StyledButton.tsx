import { Button, styled } from '@streamelements/frontend-ui';

const StyledButton = styled(Button, {
    variants: {
        size: {
            small: {
                padding: '0.5rem'
            }
        }
    }
});

export default StyledButton;