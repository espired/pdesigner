import { styled, Text } from "@streamelements/frontend-ui";
import { useCallback, useEffect, useState } from "react";
import { useEditorState } from "../../../store/EditorContext";
import EditorObjectType from "../../../types/EditorObjectType";
import IEditorClipObject from "../../../types/IEditorClipObject";
import IEditorObject from "../../../types/IEditorObject";
import IMAGE_QUALITY from "../../../types/ImageQuality";
import { setEditorObjectProp } from "../../../utils/editorHelpers";
import { ExclamationMarkicon } from "../../Icons";
import { smallIcon, whiteIcon } from "../Editor.style";

const DPIControllerContainer = styled('div', {
    borderRadius: '$base',
    py: 'calc($base * 0.5)',
    px: '$base',
    zIndex: 9,
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: 'calc($base * 0.5)',

    variants: {
        quality: {
            default: {

            },
            high: {
                background: '$uiSuccessMain',
            },
            medium: {
                background: '$uiAttentionMain',
            },
            low: {
                background: '$uiErrorMain',
            }
        }
    }
});

const ImageQuality = [
    {
        name: IMAGE_QUALITY.HIGH,
        label: 'Excellent',
        threshold: (dpi: number) => dpi >= 300
    },
    {
        name: IMAGE_QUALITY.MEDIUM,
        label: 'Average',
        threshold: (dpi: number) => dpi >= 150 && dpi <= 299
    },
    {
        name: IMAGE_QUALITY.LOW,
        label: 'Poor',
        threshold: (dpi: number) => dpi <= 149
    }
]

export default function ImageDPIControllerAction() {
    const { state, dispatch } = useEditorState();
    const [dpi, setDpi] = useState<number>(300);

    const getDPILevel = useCallback(() => ImageQuality.find(q => q.threshold(dpi)) || ImageQuality[0], [dpi]);

    const calculateDpi = useCallback(() => {
        if (!state.canvas || !state.options || !state.selectedObject || !state.canvas.viewportTransform) return;
        const selectedObject = state.canvas.getActiveObject();

        if (!selectedObject) return;

        selectedObject.setCoords();
        const clipLayer = state.canvas.getObjects()?.find(o => {
            const castedObject = o as IEditorObject;
            return castedObject.get('objectType') === EditorObjectType.CLIP;
        }) as IEditorClipObject;

        if (!clipLayer) return;
        const originalImageWidth = (selectedObject.get('width') || 1);
        const fullResolutionScaledImageSize = originalImageWidth * Number(clipLayer.get('clipScale'));

        const currentImageWidth = selectedObject.getScaledWidth();

        const currentImageScale = currentImageWidth / fullResolutionScaledImageSize;

        setDpi(Math.round(300 / currentImageScale));
    }, [state.canvas, state.selectedObject, state.options]);

    useEffect(() => {
        if (!state.canvas || !state.selectedObject) return;

        calculateDpi();

        state.canvas.on('object:scaling', calculateDpi);

        return () => {
            if (!state.canvas) return;
            state.canvas.off('object:scaling', calculateDpi);
        }

    }, [state.canvas, state.selectedObject, calculateDpi]);

    useEffect(() => {
        setEditorObjectProp('errored', getDPILevel().name === IMAGE_QUALITY.LOW, state.canvas, state.selectedObject);
        setEditorObjectProp('dpi', dpi, state.canvas, state.selectedObject);
    }, [dpi, state.canvas, state.selectedObject, getDPILevel]);

    useEffect(() => {
        // dispatch({ type: CanvasActions.SET_ERROR, payload: getDPILevel().name === IMAGE_QUALITY.LOW });
    }, [dpi, dispatch, getDPILevel])

    return (
        <DPIControllerContainer quality={getDPILevel().name}>
            <Text.Body variant='caption' weight='bold' style={{ color: '#fff' }}>{getDPILevel().label}</Text.Body>
            <Text.Body variant='caption' style={{ color: '#fff' }}>- {dpi}dpi</Text.Body>
            {getDPILevel().name !== IMAGE_QUALITY.HIGH && (
                <ExclamationMarkicon data-tip data-delay-show={300} data-for='ImageQualityTag' data-place='bottom' className={[smallIcon, whiteIcon].join(" ")} />
            )}
        </DPIControllerContainer>
    );
}