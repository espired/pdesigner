import { Modal, styled, Text, TextField, Button } from '@streamelements/frontend-ui';
import { PropsWithChildren } from 'react';

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const Content = styled(Modal.Content, {
    width: 550,
    display: 'grid',
    padding: 'calc($base * 4)',
    rowGap: 'calc($base * 3)'
});

const Header = styled('div', {
    mt: 'calc($base * 4)',
    textAlign: 'center',
    display: 'grid',
    rowGap: 'calc($base * 2)'
});

const FormContainer = styled('div', {
    display: 'grid',
    rowGap: 'calc($base * 3)'
});

const FormActionsContainer = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    columnGap: 'calc($base * 2)',
    placeContent: 'end'
});

const PriceContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: '3fr 1fr',
    columnGap: 'calc($base * 2)',
    alignItems: 'center'
});

export default function SaveModal({ open, onOpenChange }: PropsWithChildren<Props>) {
    return (
        <Modal.Root open={open} onOpenChange={onOpenChange}>
            <Modal.Overlay />
            <Content>
                <Header>
                    <Modal.Title>
                        <Text.Heading level={5} weight='bold'>
                            Product Details
                        </Text.Heading>
                    </Modal.Title>
                    <Modal.Description>
                        <Text.Subtitle>
                            Name it, price it, and let’s get it into your store
                        </Text.Subtitle>
                    </Modal.Description>
                </Header>
                <FormContainer>
                    <TextField.Root
                        maxLength={50}
                        label='Item Name'
                    >
                        <TextField.CharLimitIndicator />
                    </TextField.Root>
                    <TextField.Root
                        multiline={true}
                        maxLength={250}
                        label='Creator Note (optional)'
                        placeholder='A few words to describe your product'
                        inputProps={{
                            rows: 4
                        }}
                    >
                        <TextField.CharLimitIndicator />
                    </TextField.Root>
                    <PriceContainer>
                        <TextField.Root
                            label='Price (minimum $13.50)'
                            type='number'
                        >
                            <TextField.Adornment position='start'>$</TextField.Adornment>
                        </TextField.Root>
                        <Text.Body weight='bold' css={{ color: '$brandPrimaryMain' }}>$11.20 profit</Text.Body>
                    </PriceContainer>

                    <FormActionsContainer>
                        <Button variant='outlined'>Save Draft</Button>
                        <Button variant='contained'>Save & Publish</Button>
                    </FormActionsContainer>
                </FormContainer>
                <Modal.Close />
            </Content>
        </Modal.Root>
    );
}

