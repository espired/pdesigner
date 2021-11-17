import { PropsWithChildren } from 'react';
import { HotKeys } from 'react-keyboard';
import useHistoryClipboard from '../../hooks/useHistoryClipboard';
import { useEditorState } from '../../store/EditorContext';
import { cloneObject, groupObjects, moveObjHorizontal, moveObjVertical, removeObject, selectAll, ungroupObjects, unselectItem } from './EditorCanvasActions';

const hotKeysMap = {
    delete: ['del', 'backspace'],
    group: ['command+g', 'control+g', 'ctrl+g'],
    ungroup: ['command+shift+g', 'control+shift+g', 'ctrl+shift+g'],
    selectAll: ['command+a', 'control+a', 'ctrl+a'],
    moveRight: ['right'],
    moveShiftRight: ['shift+right'],
    moveLeft: ['left'],
    moveShiftLeft: ['shift+left'],
    moveUp: ['up'],
    moveShiftUp: ['shift+up'],
    moveDown: ['down'],
    moveShiftDown: ['shift+down'],
    copy: ['command+c', 'control+c', 'ctrl+c'],
    paste: ['command+v', 'control+v', 'ctrl+v'],
    undo: ['command+z', 'control+z', 'ctrl+z'],
    redo: ['command+shift+z', 'control+shift+z', 'ctrl+shift+z'],
    unselect: ['esc']
};

export default function HotKeysProvider(props: PropsWithChildren<{}>) {
    const { state } = useEditorState();
    const { clipboard, setClipboard } = useHistoryClipboard();

    const hotKeysHandlers = (() => {
        if (!state.canvas) return;

        return {
            delete: (e: Event) => {
                e.preventDefault();
                removeObject(state);
            },
            group: (e: Event) => {
                e.preventDefault();
                groupObjects(state);
            },
            ungroup: (e: Event) => {
                e.preventDefault();
                ungroupObjects(state);
            },
            selectAll: (e: Event) => {
                e.preventDefault();
                selectAll(state);
            },
            moveRight: (e: Event) => {
                e.preventDefault();
                moveObjVertical(state, 5);
            },
            moveShiftRight: (e: Event) => {
                e.preventDefault();
                moveObjVertical(state, 50);
            },
            moveLeft: (e: Event) => {
                e.preventDefault();
                moveObjVertical(state, -5);
            },
            moveShiftLeft: (e: Event) => {
                e.preventDefault();
                moveObjVertical(state, -50);
            },
            moveUp: (e: Event) => {
                e.preventDefault();
                moveObjHorizontal(state, -5);
            },
            moveShiftUp: (e: Event) => {
                e.preventDefault();
                moveObjHorizontal(state, -50);
            },
            moveDown: (e: Event) => {
                e.preventDefault();
                moveObjHorizontal(state, 5);
            },
            moveShiftDown: (e: Event) => {
                e.preventDefault();
                moveObjHorizontal(state, 50);
            },
            copy: (e: Event) => {
                e.preventDefault();
                setClipboard(state.selectedObject);
            },
            paste: (e: Event) => {
                e.preventDefault();
                cloneObject(state, clipboard);
            },
            undo: (e: Event) => {
                e.preventDefault();
                console.log("Hotkeys: Undo History");
            },
            redo: (e: Event) => {
                e.preventDefault();
                console.log("Hotkeys: Redo History");
            },
            unselect: (e: Event) => {
                e.preventDefault();
                unselectItem(state);
            }
        }
    })();

    return (
        <HotKeys keyMap={hotKeysMap} handlers={hotKeysHandlers}>
            {props.children}
        </HotKeys>
    )
}