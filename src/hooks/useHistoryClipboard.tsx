import { useState } from "react";
import IEditorObject from "../types/IEditorObject";

export default function useHistoryClipboard() {
    const [clipboard, setClipboard] = useState<IEditorObject>();
    return { clipboard, setClipboard };
}