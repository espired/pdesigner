import CustomCard, { Divider } from "./CustomCard";
import { Text, Tabs, styled, TextField } from '@streamelements/frontend-ui';
import ColorCircle from "../Editor/ColorCircle";
import StyledTabs from "../Editor/StyledTabs";
import StyledButton from "../Editor/StyledButton";
import { GoBackIcon } from "../Icons";

const TabContent = styled(Tabs.Content, {
    mt: 'calc($base * 2)'
});

const InputBlock = styled('div', {
    display: 'grid',
    mb: 'calc($base * 3)',

    variants: {
        lastItem: {
            true: {
                mb: 0
            }
        }
    }
});

const CustomHeader = styled(CustomCard.Header, {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    alignItems: 'center'
});

const InputValueContainer = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '$base',
    alignItems: 'center',
    mt: '$base',
    gridAutoColumns: '1fr',

    variants: {
        circles: {
            true: {
                gridAutoFlow: 'row',
                rowGap: '$base',
                mb: '$base',
                gridTemplateColumns: 'repeat(10, 26px)',
                justifyContent: 'center'
            },
        },
        withHelper: {
            true: {
                mb: 'calc($base * 0.5)'
            }
        }
    },
});

export default function ProductDetailsBlock() {
    return (
        <CustomCard.Root>
            <CustomHeader>
                <StyledButton variant='ghost' color='neutral' density='compact'>
                    <GoBackIcon color='neutral' />
                </StyledButton>
                <Text.Heading level={6} weight='black'>
                    Espired0 Tshirt
                </Text.Heading>
            </CustomHeader>
            <Divider />
            <CustomCard.Content>
                <Tabs.Root defaultValue='colorsandnote'>
                    <StyledTabs.List aria-label="Boards">
                        <StyledTabs.Trigger value='colorsandnote'>
                            Colors and note
                        </StyledTabs.Trigger>
                        <StyledTabs.Trigger value='pricing'>
                            Pricing
                        </StyledTabs.Trigger>
                    </StyledTabs.List>
                    <TabContent value="colorsandnote">
                        <InputBlock>
                            <Text.Body weight='bold'>Title</Text.Body>
                            <InputValueContainer>
                                <TextField.Root
                                    maxLength={250}
                                    placeholder='Name to appear in store'
                                >
                                    <TextField.CharLimitIndicator />
                                </TextField.Root>
                            </InputValueContainer>
                        </InputBlock>
                        <InputBlock>
                            <Text.Body weight='bold'>Color variations</Text.Body>
                            <InputValueContainer circles>
                                <ColorCircle color='#576FA1' onClick={() => { }} />
                                <ColorCircle color='#CEB3B7' onClick={() => { }} />
                                <ColorCircle color='#5A3B81' onClick={() => { }} />
                                <ColorCircle color='#5DA594' onClick={() => { }} />
                                <ColorCircle color='#D3C891' onClick={() => { }} />
                                <ColorCircle color='#AB3648' onClick={() => { }} />
                                <ColorCircle color='#000000' onClick={() => { }} />
                                <ColorCircle color='#FFFFFF' onClick={() => { }} />
                            </InputValueContainer>
                            <Text.Body variant='caption'>
                                Select a maximum of 5
                            </Text.Body>
                        </InputBlock>
                        <InputBlock lastItem={true}>
                            <Text.Body weight='bold'>Creator note</Text.Body>
                            <InputValueContainer>
                                <TextField.Root
                                    onChange={() => { }} maxLength={250}
                                    multiline
                                    inputProps={{ rows: 3 }}
                                    placeholder='Your personal note will appear above the product details for this item in your store'
                                >
                                    <TextField.CharLimitIndicator />
                                </TextField.Root>
                            </InputValueContainer>
                        </InputBlock>
                    </TabContent>
                    <TabContent value="pricing">
                        Pricing here
                    </TabContent>
                </Tabs.Root>
            </CustomCard.Content>
        </CustomCard.Root>
    );
}