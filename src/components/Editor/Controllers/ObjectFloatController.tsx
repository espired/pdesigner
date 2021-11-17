import { styled, Card } from '@streamelements/frontend-ui';
import { PropsWithChildren, useCallback, useEffect, useRef, useState } from 'react';
import { useEditorState } from '../../../store/EditorContext';
import EditorObjectType from '../../../types/EditorObjectType';
import GroupController from './GroupController';
import ImageController from './ImageController';
import TextController from './TextController';

const POPUP_OFFSET = 40;
const POPUP_HEIGHT = 50;

interface Props {
}

export const FloatingActionsBar = styled(Card.Root, {
    display: 'flex',
    flexWrap: 'wrap',
    position: 'absolute',
    padding: 0,
    borderRadius: '$base',
    maxWidth: 'max-content',
    zIndex: 2147483647,
    width: 560,

    '@media (max-width: 1366px)': {
        maxWidth: 560,
    }
});

export default function ObjectFloatController(props: PropsWithChildren<Props>) {
    const { state } = useEditorState();
    const [top, setTop] = useState<number>(0);
    const [left, setLeft] = useState<number>(0);

    const containerRef = useRef<HTMLDivElement>(null);

    const respoitionObjectController = useCallback(() => {
        if (!state.canvas || !state.selectedObject || !state.canvas.viewportTransform) return;
        const selectedObject = state.canvas.getActiveObject();

        if (!selectedObject) return;

        selectedObject.setCoords();
        const canvasRect = state.canvas.getElement().getBoundingClientRect();
        const objRect = selectedObject.getBoundingRect();
        const objHalfWidth = objRect.width / 2;

        let calcedLeft = objRect.left + canvasRect.left;

        if (containerRef.current) {
            const floaterBounds = containerRef.current.getBoundingClientRect();
            const floaterCenter = floaterBounds.width / 2;
            const docBounds = document.documentElement.getBoundingClientRect();
            calcedLeft = calcedLeft - floaterCenter + objHalfWidth;

            const floaterRight = floaterBounds.width + calcedLeft;

            if (floaterRight > docBounds.width) {
                calcedLeft = calcedLeft - (floaterRight - docBounds.width);
            }
        }

        const calcedTop = objRect.top + canvasRect.top - POPUP_OFFSET - POPUP_HEIGHT;

        if (calcedTop <= 0) {
            setTop(-calcedTop);
        } else {
            setTop(calcedTop);
        }

        setLeft(calcedLeft);
    }, [state.selectedObject, state.canvas, containerRef]);

    useEffect(() => {
        !!state.selectedObject && respoitionObjectController();
    }, [ state.canvas, state.selectedObject, respoitionObjectController ]);

    useEffect(() => {
        if (!state.canvas) return;
        state.canvas.on('object:moved', respoitionObjectController);
        state.canvas.on('object:rotated', respoitionObjectController);
        state.canvas.on('object:scaled', respoitionObjectController);
        state.canvas.on('canvas:zooming', respoitionObjectController);
        window.addEventListener('resize', respoitionObjectController);

        return () => {
            if (!state.canvas) return;
            state.canvas.off('object:moved', respoitionObjectController);
            state.canvas.off('object:scaled', respoitionObjectController);
            state.canvas.off('object:rotated', respoitionObjectController);
            state.canvas.off('canvas:zooming', respoitionObjectController);
            window.removeEventListener('resize', respoitionObjectController)
        }

    }, [state.canvas, respoitionObjectController]);

    const handleBarClick = () => {
        // @ts-ignore
        state.selectedObject?.exitEditing && state.selectedObject?.exitEditing()
    }

    return (
        <FloatingActionsBar ref={containerRef} style={{ top, left }} onClick={handleBarClick}>
            {state.selectedObject?.objectType === EditorObjectType.GROUP && <GroupController />}
            {state.selectedObject?.objectType === EditorObjectType.TEXT && <TextController />}
            {state.selectedObject?.objectType === EditorObjectType.IMAGE && <ImageController />}
        </FloatingActionsBar>
    )
}