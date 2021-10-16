import { useEffect } from "react";
import { useEditorState } from "../../../store/EditorContext";
import EditorObjectType from "../../../types/EditorObjectType";
import IEditorObject from "../../../types/IEditorObject";
import { fabric } from 'fabric';
import IEditorLineObject from "../../../types/IEditorLineObject";
import IEditorGroupObject from "../../../types/IEditorGroupObject";

enum SnappingLines {
    Top = 'top',
    Left = 'left',
    Right = 'right',
    Bottom = 'bottom',
    HorizontalCenter = 'horizontalCenter',
    VerticalCenter = 'verticalCenter'
}

export default function useGrid(container: IEditorObject) {
    const { state } = useEditorState();

    useEffect(() => {
        const canvas = state.canvas;
        if (!canvas) return;

        const canvasObjects = state.canvas?.getObjects() as IEditorObject[];
        const clipLayer = canvasObjects.find(o => o.objectType === EditorObjectType.CLIP);

        if(!clipLayer) return;

        debugger;

        const clipBounds = clipLayer.getBoundingRect();

        const horizontalLine = [clipBounds.left, 0, clipBounds.width + clipBounds.left, 0];
        const verticalLine = [0, clipBounds.top, 0, clipBounds.height + clipBounds.top];

        const snappingLines = [
            {
                name: SnappingLines.Top,
                size: horizontalLine,
                coords: [clipBounds.top, clipBounds.left]
            },
            {
                name: SnappingLines.Bottom,
                size: horizontalLine,
                coords: [clipBounds.top + clipBounds.height - 2, clipBounds.left]
            },
            {
                name: SnappingLines.HorizontalCenter,
                size: horizontalLine,
                coords: [clipBounds.top + (clipBounds.height / 2) - 2, clipBounds.left]
            },
            {
                name: SnappingLines.Left,
                size: verticalLine,
                coords: [clipBounds.top, clipBounds.left]
            },
            {
                name: SnappingLines.Right,
                size: verticalLine,
                coords: [clipBounds.top, clipBounds.left + clipBounds.width - 2]
            },
            {
                name: SnappingLines.VerticalCenter,
                size: verticalLine,
                coords: [clipBounds.top, clipBounds.left + (clipBounds.width / 2) - 2]
            }
        ];

        const snapGroupItems: IEditorObject[] = [];
        snappingLines.forEach(s => {
            const clipSnapLine = new fabric.Line(s.size, {
                top: s.coords[0],
                left: s.coords[1],
                stroke: 'transparent',
                strokeWidth: 2,
            }) as IEditorLineObject;
            snapGroupItems.push(clipSnapLine);
        });

        const snapGroup = new fabric.Group(snapGroupItems) as IEditorGroupObject;
        snapGroup.set({
            objectType: EditorObjectType.SNAP,
            evented: false,
            selectable: false,
            locked: true,
            hasControls: false,
            absolutePositioned: true,
        });
        canvas.add(snapGroup);
        canvas.sendToBack(snapGroup);

    }, [state.canvas]);

    return null;
}