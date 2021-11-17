import CustomCard, { Divider } from "./CustomCard";
import { Text, Tabs, styled, List, ListItem } from '@streamelements/frontend-ui';
import ColorCircle from "../Editor/ColorCircle";
import StyledTabs from "../Editor/StyledTabs";
import StyledButton from "../Editor/StyledButton";
import { GoBackIcon } from "../Icons";
import { PropsWithChildren } from "react";
import { UserStoreItemVariant } from "../../types/UserStore";
import { ProductTemplateVariant } from "../../types/ProductTemplate";
import uniqBy from "lodash/uniqBy";

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

interface Props {
    availableVariants?: ProductTemplateVariant[], 
    selectedVariants?: UserStoreItemVariant[],
    onVariantClicked: (variant: UserStoreItemVariant) => void
}

export default function ProductDetailsBlock({ availableVariants, selectedVariants, onVariantClicked }: PropsWithChildren<Props>) {

    const uniqueVariants = uniqBy(availableVariants, 'colorHex');
    
    return (
        <CustomCard.Root>
            <CustomHeader>
                <StyledButton variant='ghost' color='neutral' density='compact'>
                    <GoBackIcon color='neutral' />
                </StyledButton>
                <Text.Heading level={6} weight='black'>
                    Editor
                </Text.Heading>
            </CustomHeader>
            <Divider />
            <CustomCard.Content>
                <Tabs.Root defaultValue='colors'>
                    <StyledTabs.List aria-label="Boards">
                        <StyledTabs.Trigger value='colors'>
                            Colors
                        </StyledTabs.Trigger>
                        <StyledTabs.Trigger value='settings'>
                            Settings
                        </StyledTabs.Trigger>
                    </StyledTabs.List>
                    <TabContent value="settings">
                        <List>
                            <ListItem>
                                Presets
                            </ListItem>
                            <ListItem>
                                Show Grid
                            </ListItem>
                        </List>
                    </TabContent>
                    <TabContent value="colors">
                        <InputBlock lastItem={true}>
                            <Text.Body weight='bold'>Color variations</Text.Body>
                            <InputValueContainer circles>
                                {uniqueVariants?.map(i => (
                                    <ColorCircle
                                        key={i.colorHex}
                                        color={i.colorHex}
                                        onClick={() => {}}
                                    />
                                ))}
                            </InputValueContainer>
                            <Text.Body variant='caption'>
                                Select a maximum of 5
                            </Text.Body>
                        </InputBlock>
                    </TabContent>
                </Tabs.Root>
            </CustomCard.Content>
        </CustomCard.Root>
    );
}