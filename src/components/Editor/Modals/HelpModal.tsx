import { PropsWithChildren } from 'react';
import { Text, styled, css, Divider, Modal, Slot } from '@streamelements/frontend-ui';
import { CloseIcon } from '../../Icons';
import { mediumIcon, midGreyText } from '../Editor.style';

const ModalContainer = styled(Modal.Content, {
    overflowY: 'auto',
    backgroundColor: '$uiSecondary'
});

export const CloseIconContainer = styled('div', {
    position: 'absolute',
    top: 'calc($base * 1.5)',
    right: 'calc($base * 1.5)',
});

const Container = styled('div', {
    position: 'relative',
    display: 'grid',
    justifyItems: 'center',
    px: 'calc($base * 3)',
    pt: 'calc($base * 6)',
    pb: 'calc($base * 8)',
    rowGap: 'calc($base * 1.5)',
    minWidth: 605,
    height: '100%',
    overflow: 'auto'
});

const ShortcutLine = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    columnGap: 'calc($base * 4)',
    alignItems: 'center'
})

const KeyCombinations = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    alignItems: 'center',
    justifyContent: 'end',
    columnGap: '$base'
})

const Key = styled('div', {
    backgroundColor: '$uiSecondary',
    boxShadow: '0px 2px 0px rgba(0, 0, 0, 0.1), 0px 4px 10px rgba(0, 0, 0, 0.05)',
    border: '1px solid rgba(0, 0, 0, 0.1)',
    borderRadius: 'calc($base * 0.5)',
    py: '0.75rem',
    px: '1.25rem'
});

const KeyText = css({
    color: '$textPrimary70'
})();

const alignedText = css({
    textAlign: 'center'
})();

const shortcutLines = [
    {
        keys: ['Ctrl', 'G'],
        description: 'Group selected objects'
    },
    {
        keys: ['Ctrl', 'Shift', 'G'],
        description: 'Ungroup selected objects'
    },
    {
        keys: ['Ctrl', 'Z'],
        description: 'Undo Changes'
    },
    {
        keys: ['Ctrl', 'Shift', 'Z'],
        description: 'Redo undone changes'
    },
    {
        keys: ['Ctrl', 'C'],
        description: 'Copy selected object'
    },
    {
        keys: ['Ctrl', 'V'],
        description: 'Paste selected object'
    },
    {
        keys: ['Ctrl', 'A'],
        description: 'Select all'
    },
    {
        keys: ['Shift', <p><span>&#8592;</span><span>&#8593;</span><span>&#8594;</span><span>&#8595;</span></p>],
        description: 'Shift object direction'
    },
    {
        keys: ['ESC'],
        description: 'Unselect current object'
    },
]

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

export default function HelpModal({ open, onOpenChange }: PropsWithChildren<Props>) {
    return (
        <Modal.Root open={open} onOpenChange={onOpenChange}>
            <Modal.Overlay />
            <ModalContainer>
                <Container>
                    <CloseIconContainer>
                        <Modal.Close as={Slot}>
                            <CloseIcon className={mediumIcon} />
                        </Modal.Close>
                    </CloseIconContainer>
                    <Text.Heading level={5} weight='bold' className={alignedText}>Keyboard Shortcuts</Text.Heading>
                    <Text.Subtitle className={alignedText}>Available keyboard shortcuts for your convenience </Text.Subtitle>
                    <span />
                    <span />
                    {shortcutLines.map((s, i) => (
                        <>
                            <ShortcutLine key={i}>
                                <KeyCombinations>
                                    {s.keys.map((k, i) => (
                                        <>
                                            <Key key={i}>
                                                <Text.Body variant='caption' weight='bold' className={KeyText}>{k}</Text.Body>
                                            </Key>
                                            {i < (s.keys.length - 1) && <Text.Subtitle key={i+1000} weight='bold' className={midGreyText}>+</Text.Subtitle>}
                                        </>
                                    ))}
                                </KeyCombinations>
                                <div>
                                    <Text.Body weight='bold'>{s.description}</Text.Body>
                                </div>
                            </ShortcutLine>
                            {i < (shortcutLines.length - 1) && <Divider key={i+1000} />}
                        </>
                    ))}
                </Container>
            </ModalContainer>
        </Modal.Root>
    )
}