import { Modal } from '@streamelements/frontend-ui';
import { PropsWithChildren } from 'react';

interface Props {
    title: string,
    open: boolean,
    onOpenChange: (open: boolean) => void 
}

export default function AlertModal({ title, children, open, onOpenChange }: PropsWithChildren<Props>) {
    return (
        <Modal.Root open={open} onOpenChange={onOpenChange}>
            <Modal.Overlay />
            <Modal.Content>
                <Modal.Title>
                    {title}
                </Modal.Title>
                <Modal.Description>
                    {children}
                </Modal.Description>
                <Modal.Close />
            </Modal.Content>
        </Modal.Root>
    );
}

