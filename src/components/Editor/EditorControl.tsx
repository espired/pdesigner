import { styled, Button, Dropdown, Slot, Text, css } from '@streamelements/frontend-ui';
import { PropsWithChildren, useState } from 'react';
import IEditorOptionsBoard from '../../types/IEditorOptionsBoard';
import { BugIcon, KeyboardIcon, QuestionMarkIcon } from '../Icons';
import HelpModal from './Modals/HelpModal';
import StyledButton from './StyledButton';

const Toolbar = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: '$base',
    placeContent: 'flex-end'
});

const TopBarContainer = styled('div', {
    mt: 'calc($base * 3)',
    mr: 'calc($base * 3)',
    ml: 0,
    display: 'grid',
    //gridTemplateColumns: 'max-content 1fr',
    alignItems: 'center'
});

const dropdownItemStyle = css({
    display: 'grid',
    padding: 'calc($base * 1.5)',
    gridTemplateColumns: 'max-content 1fr max-content',
    alignItems: 'center',
    columnGap: '$base',
    cursor: 'pointer'
})();

interface Props {
    boards: IEditorOptionsBoard[],
    activeBoard?: IEditorOptionsBoard,
    onTabClicked: (board: IEditorOptionsBoard) => void,
    onPreviewClicked: () => void,
    onSaveClicked: () => void
}

export default function EditorControl({ onPreviewClicked, onSaveClicked, activeBoard }: PropsWithChildren<Props>) {
    const [helpModalOpen, setHelpModalOpen] = useState<boolean>(false);

    const onReportABugClicked = () => window.open('https://strms.net/merch-support', '_blank');

    return (
        <>
            <TopBarContainer>
                <Toolbar>
                    <Dropdown.Root>
                        <Dropdown.Trigger as={Slot}>
                            <StyledButton color='neutral' size='small' variant='ghost'>
                                <QuestionMarkIcon />
                            </StyledButton>
                        </Dropdown.Trigger>
                        <Dropdown.Content>
                            <Dropdown.Item className={dropdownItemStyle} onSelect={onReportABugClicked}>
                                <BugIcon />
                                <Text.Body>
                                    Report a Bug
                                </Text.Body>
                            </Dropdown.Item>
                            <Dropdown.Item className={dropdownItemStyle} onSelect={() => setHelpModalOpen(true)}>
                                <KeyboardIcon />
                                <Text.Body>
                                    Keyboard Shortcuts
                                </Text.Body>
                            </Dropdown.Item>
                        </Dropdown.Content>
                    </Dropdown.Root>
                    {activeBoard?.supportsModelPreview && (
                        <StyledButton color='neutral' size='small' variant='ghost'>
                            3D
                        </StyledButton>
                    )}
                    <Button variant='outlined' onClick={onPreviewClicked}>Preview</Button>
                    <Button onClick={onSaveClicked}>Save</Button>
                </Toolbar>
            </TopBarContainer>

            <HelpModal open={helpModalOpen} onOpenChange={setHelpModalOpen} />
        </>
    )
}