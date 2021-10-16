import { Card, styled } from '@streamelements/frontend-ui';

export const StyledCardRoot = styled(Card.Root, {
    padding: 0,
});

export const StyledCardHeader = styled(Card.Header, {
    padding: 'calc($base * 2)'
});

export const StyledCardContent = styled(Card.Body, {
    padding: 'calc($base * 2)',
    pt: 'calc($base * 2)',
});

export const Divider = styled('div', {
    height: 1,
    display: 'block',
    backgroundColor: '$divider'
})

const CustomCard = {
    Root: StyledCardRoot,
    Header: StyledCardHeader,
    Content: StyledCardContent,
    Divider,
};

export default CustomCard;