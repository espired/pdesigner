import { Modal, styled } from '@streamelements/frontend-ui';
import { PropsWithChildren, ReactElement, useCallback, useEffect, useState } from 'react';
import { useEditorState } from '../../../store/EditorContext';
import { fabric } from 'fabric';
import IEditorObject from '../../../types/IEditorObject';
import EditorObjectType from '../../../types/EditorObjectType';

interface Props {
    open: boolean,
    onOpenChange: (open: boolean) => void
}

const Root = styled(Modal.Content, {
    height: 600,
    width: 600,
    padding: 'calc($base * 3)',
    display: 'grid',
    placeContent: 'center'
});

const PreviewContainer = styled('div', {
    overflow: 'hidden',
});

export default function PreviewModal({ open, onOpenChange }: PropsWithChildren<Props>) {
    const { state } = useEditorState();
    const [preview, setPreview] = useState<ReactElement<any, any>>(<div />);

    const getRawCanvasGraphics = useCallback(() => {
        const canvas = state.canvas;
        if (!canvas) return;

        const canvasContents = canvas.toDatalessJSON([
            'objectType',
        ]);

        const newStaticCanvas = new fabric.StaticCanvas(null, {
            width: canvas.getWidth(),
            height: canvas.getHeight(),
            backgroundColor: 'transparent'
        });

        newStaticCanvas.loadFromJSON(canvasContents, () => {
            newStaticCanvas.getObjects().forEach(o => {
                const castedObject = o as IEditorObject;
                switch (castedObject.objectType) {
                    case EditorObjectType.SNAP:
                    case EditorObjectType.BLEED:
                        newStaticCanvas.remove(o);
                        break;

                    case EditorObjectType.CLIP:
                        o.set('stroke', 'transparent');
                        break;
                }
            })

            const imgContent = newStaticCanvas.toDataURL();

            setPreview(<img src={imgContent} alt='Graphics preview' style={{ objectFit: 'contain', maxWidth: '100%', maxHeight: '100%' }} />);
        });
    }, [state.canvas, setPreview]);

    useEffect(() => {
        !!open && getRawCanvasGraphics();
    }, [open, getRawCanvasGraphics]);

    return (
        <Modal.Root open={open} onOpenChange={onOpenChange}>
            <Modal.Overlay />
            <Root>
                <PreviewContainer>
                    {!!open && preview}
                </PreviewContainer>
                <Modal.Close />
            </Root>
        </Modal.Root>
    );
}

