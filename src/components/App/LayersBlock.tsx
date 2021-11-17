import CustomCard from "./CustomCard";
import { styled, Text, Button, List, ListItem } from '@streamelements/frontend-ui';
import { PropsWithChildren, useState } from "react";
import IEditorObject from "../../types/IEditorObject";
import IEditorTextObject from '../../types/IEditorTextObject';
import { firstCharToUpperCase } from "../../utils/StringUtils";
import EditorObjectType from "../../types/EditorObjectType";
import truncate from 'lodash/truncate'
import StyledDropdown from "../StyledDropdown";
import { EyeIcon, TrashCanIcon, VerticalDotsIcon } from "../Icons";
import { smallIcon } from "../Editor/Editor.style";
import {
    DndContext,
    PointerSensor,
    useSensors,
    useSensor,
    closestCenter,
    DragEndEvent
} from '@dnd-kit/core';
import {
    arrayMove,
    SortableContext,
    verticalListSortingStrategy,
    useSortable
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import IEditorImageObject from "../../types/IEditorImageObject";

interface Props {
    layers: IEditorObject[],
    handleLayerClicked: (layer: IEditorObject) => void,
    handleLayerDeleteClicked: (layer: IEditorObject) => void,
    handleAddTextClicked: () => void,
    handleOpenAssetManager: () => void,
    handleLayersOrderChanged: (layers: IEditorObject[]) => void,
    handleToggleLayerVisibility: (layer: IEditorObject) => void,
    handleToggleLayerLock: (layer: IEditorObject) => void,
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
            return `${truncate(casted.text, { length: 20 })} (Text)`;

        case EditorObjectType.IMAGE:
            return `${truncate((l as IEditorImageObject).name, { length: 20 })} (Image)`;

        case EditorObjectType.SHAPE:
            return `${truncate((l as IEditorImageObject).name, { length: 20 })} (Shape)`;

        default:
            return `${!!l.objectType ? firstCharToUpperCase(l.objectType) : ''} Layer`;
    }
};

interface LayerItemProps {
    key: any,
    item: IEditorObject,
    isActive: boolean,
    onClick: (layer: IEditorObject) => void,
    onClickDelete: (layer: IEditorObject) => void 
}

const LayerItem = ({ item, isActive, onClick, onClickDelete }: LayerItemProps) => {
    const [editMode, setEditMode] = useState<boolean>(false);
    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
    } = useSortable({ id: item.id });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
    };

    return (
        <StyledListItem
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            state={
                (item.locked && 'disabled') || (isActive && 'selected') || undefined
            }
            clickable={!item.locked}
            onClick={() => !item.locked && onClick(item)}
            onDoubleClick={() => setEditMode(true)}
        >
            <InlineLayerItem>
                {!item.locked && <VerticalDotsIcon style={{ cursor: 'grab' }} />}
            </InlineLayerItem>
            <span>
                {editMode ? (
                    <input defaultValue={getLayerName(item)} />
                ) : (
                    <>
                        {getLayerName(item)}
                    </>
                )}
            </span>
            <InlineLayerItem>
                {!item.locked && (
                    <>
                        <EyeIcon className={smallIcon} />
                        <Button variant='ghost' color='neutral' iconButton onClick={() => onClickDelete(item)}>
                            <TrashCanIcon className={smallIcon} />
                        </Button>
                    </>
                )}
            </InlineLayerItem>
        </StyledListItem >
    )
}

export default function LayersBlock({ layers, handleLayerClicked, handleToggleLayerVisibility, handleToggleLayerLock, handleLayerDeleteClicked, handleAddTextClicked, handleOpenAssetManager, handleLayersOrderChanged, activeObject }: PropsWithChildren<Props>) {
    const sensors = useSensors(
        useSensor(PointerSensor)
    );
    const [dropdownOpen, setDropdownOpen] = useState<boolean>(false);

    const onItemSelect = (cb: () => void) => {
        setDropdownOpen(false);
        // TEMPORARY HACK, SOLVES RADIX-UI PROBLEM WITH DOUBLE INITIATING MODALS
        setTimeout(cb, 0);
    }

    const handleDragEnd = (event: DragEndEvent) => {
        const { active, over } = event;

        if (active.id !== over?.id) {
            const oldIndex = layers.findIndex(l => l.id === active?.id);
            const newIndex = layers.findIndex(l => l.id === over?.id);

            const newOrder = arrayMove(layers, oldIndex, newIndex);
            handleLayersOrderChanged(newOrder);
        }
    }

    return (
        <Root>
            <StyledCustomCardHeader>
                <Text.Heading level={6} weight='black'>Layers</Text.Heading>
                <StyledDropdown.Root open={dropdownOpen} onOpenChange={setDropdownOpen}>
                    <StyledDropdown.Trigger as={Button} variant='outlined'>
                        ADD NEW
                    </StyledDropdown.Trigger>
                    <StyledDropdown.Content>
                        <StyledDropdown.Item onSelect={() => onItemSelect(handleOpenAssetManager)}>
                            <Text.Body>SE.Gallery</Text.Body>
                        </StyledDropdown.Item>
                        <StyledDropdown.Item onSelect={() => onItemSelect(handleOpenAssetManager)}>
                            <Text.Body>Your uploads</Text.Body>
                        </StyledDropdown.Item>
                        <StyledDropdown.Item onSelect={() => onItemSelect(handleAddTextClicked)}>
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
                    <DndContext
                        sensors={sensors}
                        collisionDetection={closestCenter}
                        onDragEnd={handleDragEnd}
                    >
                        <SortableContext
                            items={layers}
                            strategy={verticalListSortingStrategy}
                        >
                            {!!layers.length && layers.map((l, i) => (
                                <LayerItem
                                    key={i}
                                    item={l}
                                    onClickDelete={handleLayerDeleteClicked}
                                    onClick={handleLayerClicked}
                                    isActive={activeObject?.id === l.id}
                                />
                            ))}
                        </SortableContext>
                    </DndContext>
                    {!layers.length && (
                        <div>
                            No layers
                        </div>
                    )}
                </List>
            </Content>
        </Root>
    );
}