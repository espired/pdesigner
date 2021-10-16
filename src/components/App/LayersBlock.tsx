import CustomCard from "./CustomCard";
import { styled, Text, Button, List, ListItem } from '@streamelements/frontend-ui';
import { PropsWithChildren } from "react";
import IEditorObject from "../../types/IEditorObject";
import IEditorTextObject from '../../types/IEditorTextObject';
import { firstCharToUpperCase } from "../../utils/StringUtils";
import EditorObjectType from "../../types/EditorObjectType";
import truncate from 'lodash/truncate'
import StyledDropdown from "../StyledDropdown";
import { EyeIcon, TrashCanIcon, VerticalDotsIcon } from "../Icons";

interface Props {
    layers: IEditorObject[],
    handleLayerClicked: (layer: IEditorObject) => void,
    handleAddTextClicked: () => void,
    activeObject?: IEditorObject
}

const StyledListItem = styled(ListItem, {
    display: 'grid',
    gridAutoFlow: 'column',
    gridTemplateColumns: 'max-content 1fr max-content',
    columnGap: '$base',
    alignItems: 'center'
});

const StyledCustomCardHeader = styled(CustomCard.Header, {
    display: 'grid',
    gridAutoFlow: 'column',
    placeContent: 'space-between',
    placeItems: 'center',
    overflow: 'visible'
});

const Root = styled(CustomCard.Root, {
    display: 'grid',
    height: '100%',
    overflow: 'hidden',
    gridTemplateRows: 'max-content max-content 1fr'
});

const Content = styled(CustomCard.Content, {
    overflow: 'auto'
});

const InlineLayerItem = styled('span', {
    display: 'grid',
    alignItems: 'center',
    gridAutoFlow: 'column'
});

const getLayerName = (l: IEditorObject) => {
    switch (l.objectType) {
        case EditorObjectType.TEXT:
            const casted = l as IEditorTextObject;
            return `${truncate(casted.text, { length: 20 })} (Text)`

        default:
            return `${firstCharToUpperCase(l.objectType)} Layer`;
    }
};

const LayerItem = ({ item, isActive, onClick }: { key: any, item: IEditorObject, isActive: boolean, onClick: (layer: IEditorObject) => void }) => {
    return (
        <StyledListItem
            state={
                (item.locked && 'disabled') || (isActive && 'selected') || undefined
            }
            clickable={!item.locked}
            onClick={() => !item.locked && onClick(item)}
        >
            <InlineLayerItem>
                {!item.locked && <VerticalDotsIcon style={{ cursor: 'grab' }} />}
            </InlineLayerItem>
            {getLayerName(item)}
            <InlineLayerItem>
                {!item.locked && (
                    <>
                        <EyeIcon />
                        <TrashCanIcon />
                    </>
                )}
            </InlineLayerItem>
        </StyledListItem>
    )
}

export default function LayersBlock({ layers, handleLayerClicked, handleAddTextClicked, activeObject }: PropsWithChildren<Props>) {
    return (
        <Root>
            <StyledCustomCardHeader>
                <Text.Heading level={6} weight='black'>Layers</Text.Heading>
                <StyledDropdown.Root>
                    <StyledDropdown.Trigger as={Button} variant='outlined'>
                        ADD NEW
                    </StyledDropdown.Trigger>
                    <StyledDropdown.Content>
                        <StyledDropdown.Item>
                            <Text.Body>SE.Gallery</Text.Body>
                        </StyledDropdown.Item>
                        <StyledDropdown.Item>
                            <Text.Body>Your uploads</Text.Body>
                        </StyledDropdown.Item>
                        <StyledDropdown.Item onSelect={() => handleAddTextClicked()}>
                            <Text.Body>Text</Text.Body>
                        </StyledDropdown.Item>
                        <StyledDropdown.Item>
                            <Text.Body>Shape</Text.Body>
                        </StyledDropdown.Item>
                    </StyledDropdown.Content>
                </StyledDropdown.Root>
            </StyledCustomCardHeader>
            <CustomCard.Divider />
            <Content>
                <List>
                    {!!layers.length ? layers.map((l, i) => (
                        <LayerItem
                            key={i}
                            item={l}
                            onClick={handleLayerClicked}
                            isActive={activeObject?.id === l.id}
                        />
                    )) : (
                        <div>
                            No layers
                        </div>
                    )}
                </List>
            </Content>
        </Root>
    );
}