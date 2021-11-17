import { Dropdown, styled, Slot, Text } from '@streamelements/frontend-ui';
import { PropsWithChildren, useEffect, useState } from 'react';
import { useEditorState } from '../../../store/EditorContext';
import IEditorObject from '../../../types/IEditorObject';
import { AlignHorizontalLeft, AlignHorizontalMiddle, AlignHorizontalRight, AlignVerticalBottom, AlignVerticalMiddle, AlignVerticalTop } from '../../../utils/EditorAlignUtils';
import { setEditorObjectProp } from '../../../utils/editorHelpers';
import { AlignBottomIcon, AlignHorizontalCenterIcon, AlignLeftIcon, AlignRightIcon, AlignTopIcon, AlignVerticalCenterIcon, FlipHorizontalIcon, FlipVerticalIcon, HorizontalDotsIcon } from '../../Icons';
import ThemedSelect from '../../ThemedSelect';
import { ActionVerticalDivider } from '../Controllers/Controller.style';
import { ActionBlock, smallIcon } from '../Editor.style';
import { fabric } from 'fabric';

const Trigger = styled(Dropdown.Trigger, {
    border: 0,
    bgc: 'transparent',
    fontWeight: 'black',
    cursor: 'pointer',
    padding: 0
});

const StyledMoreListItem = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr',
    columnGap: '$base',
    alignItems: 'center',
    padding: 'calc($base * 1.5)',

    '&:hover': {
        cursor: 'pointer',
        borderRadius: '$base',
        backgroundColor: '$uiPrimary16'
    }
});

interface AlignOption {
    name: string,
    icon: JSX.Element,
    action: (canvas: fabric.Canvas, selectedObject: IEditorObject) => void
}

const alignOptions: AlignOption[] = [
    {
        name: 'Align Left',
        icon: <AlignLeftIcon className={smallIcon} />,
        action: AlignHorizontalLeft
    },
    {
        name: 'Align Right',
        icon: <AlignRightIcon className={smallIcon} />,
        action: AlignHorizontalRight
    },
    {
        name: 'Align Top',
        icon: <AlignTopIcon className={smallIcon} />,
        action: AlignVerticalTop
    },
    {
        name: 'Align Bottom',
        icon: <AlignBottomIcon className={smallIcon} />,
        action: AlignVerticalBottom
    },
    {
        name: 'Vertical Center',
        icon: <AlignVerticalCenterIcon className={smallIcon} />,
        action: AlignHorizontalMiddle
    },
    {
        name: 'Horizontal Center',
        icon: <AlignHorizontalCenterIcon className={smallIcon} />,
        action: AlignVerticalMiddle
    },
];

const selectOpts = alignOptions.map(o => ({
    label: o.icon,
    value: o
}));

const MoreListItem = (props: PropsWithChildren<{ onClick?: (e: any) => void, ref?: React.Ref<HTMLDivElement> }>) => {
    return <StyledMoreListItem onClick={props.onClick} ref={props?.ref}>{props.children}</StyledMoreListItem>
}

export default function AlignController() {
    const { state } = useEditorState();
    const [selectedAlign, setSelectedAlign] = useState<any>();

    useEffect(() => {
        if (!selectedAlign || !state.selectedObject || !state.canvas) return;

        selectedAlign.value.action(state.canvas, state.selectedObject);
    }, [selectedAlign, state.canvas, state.selectedObject]);

    return (
        <>
            <ActionBlock clearVerticalSpacing>
                <ThemedSelect
                    borderless
                    size='tiny'
                    onChange={setSelectedAlign}
                    defaultValue={selectOpts[0]}
                    options={selectOpts}
                />
            </ActionBlock>
            <ActionVerticalDivider />
            <ActionBlock clearVerticalSpacing>
                <Dropdown.Root>
                    <Trigger>
                        <HorizontalDotsIcon className={smallIcon} />
                    </Trigger>
                    <Dropdown.Content>
                        <Dropdown.Item as={Slot}>
                            <MoreListItem onClick={() => setEditorObjectProp('flipX', !state.canvas?.getActiveObject().get('flipX'), state.canvas, state.selectedObject)}>
                                <FlipHorizontalIcon className={smallIcon} />
                                <Text.Body>Flip Horizontal</Text.Body>
                            </MoreListItem>
                        </Dropdown.Item>
                        <Dropdown.Item as={Slot}>
                            <MoreListItem onClick={() => setEditorObjectProp('flipY', !state.canvas?.getActiveObject().get('flipY'), state.canvas, state.selectedObject)}>
                                <FlipVerticalIcon className={smallIcon} />
                                <Text.Body>Flip Vertical</Text.Body>
                            </MoreListItem>
                        </Dropdown.Item>
                    </Dropdown.Content>
                </Dropdown.Root>
            </ActionBlock>
        </>
    )
}