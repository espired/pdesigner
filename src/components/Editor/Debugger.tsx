import { Text, Card, styled } from '@streamelements/frontend-ui';
import { PropsWithChildren } from 'react';
import IEditorOptionsBoard from '../../types/IEditorOptionsBoard';

interface Props {
    activeBoard?: IEditorOptionsBoard,
    scale: number
}

const BottomFloatingInfoBarContainer = styled(Card.Root, {
    padding: 'calc($base * 2)',
    position: 'absolute',
    bottom: 'calc($base * 3)',
    right: 'calc($base * 3)',
});

export default function Debugger({ activeBoard, scale }: PropsWithChildren<Props>) {
    return (
        <BottomFloatingInfoBarContainer>
            <Text.Body variant='caption' weight='black'>Editor Debugger</Text.Body>
            <Text.Body>
                Scale: {Math.round(scale * 100)}%
                <br />
                Board: {activeBoard?.dimensions.width}x{activeBoard?.dimensions.height} px
                {
                    activeBoard?.clip && (
                        <>
                            <br />
                            Clip: {activeBoard.clip.height - activeBoard.clip.top}x{activeBoard.clip.width - activeBoard.clip.left} px
                        </>
                    )
                }
            </Text.Body>
        </BottomFloatingInfoBarContainer>
    );
}