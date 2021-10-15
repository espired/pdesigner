import Editor from "./components/Editor/Editor";
import './App.css';
import { useCallback, useRef, useState } from "react";
import IEditorRefActions from "./types/IEditorRefActions";
import IEditorObject from "./types/IEditorObject";
import * as stringUtils from "./utils/StringUtils";
import CSS from 'csstype';
import { useWindowSize } from 'usehooks-ts';
import { downloadURI } from "./utils/DownloadUtils";

const layersContainer: CSS.Properties = {
  display: 'grid',
  rowGap: '8px',
  padding: '8px',
  border: '1px solid #2d2d2d'
}

const containerStyle: CSS.Properties = {
  height: '100vh',
  display: 'grid',
  gridTemplateColumns: '200px 1fr',
  overflow: 'hidden'
}

const toolsContainerStyle: CSS.Properties = {
  display: 'grid',
  gridAutoRows: 'max-content',
  rowGap: '16px',
  padding: '16px',
  backgroundColor: '#efefef',
}



function App() {
  const editorRef = useRef<IEditorRefActions>(null);
  const [layers, setLayers] = useState<IEditorObject[]>([]);
  const [activeObject, setActiveObject] = useState<IEditorObject>();
  const { width, height } = useWindowSize();

  const handleAddText = () => editorRef.current?.addText('okey dokey')
  const handleLayerClicked = (layer: IEditorObject) => editorRef.current?.selectLayer(layer);
  const handleExportToPNGClicked = () => {
    const contents = editorRef.current?.exportToPNG();
    !!contents && downloadURI(contents, "Graphics.png");
  }

  const onLayersChanged = useCallback((ls: IEditorObject[]) => setLayers(ls.reverse()), [setLayers])
  const onActiveObjectSelected = useCallback((l: IEditorObject | undefined) => setActiveObject(l), [setActiveObject]);

  return (
    <div style={containerStyle}>
      <div style={toolsContainerStyle}>
        <button onClick={handleAddText}>Add Text</button>
        <button onClick={handleExportToPNGClicked}>Export to png</button>
        <div style={layersContainer}>
          {!!layers.length ? layers.map((l, i) => (
            <div
              key={i}
              style={{
                fontWeight: activeObject === l ? 'bold' : 'normal',
                opacity: l.locked ? '0.5' : '1'
              }}
              onClick={() => !l.locked && handleLayerClicked(l)}
            >
              {l.locked && <span>L</span>} {stringUtils.firstCharToUpperCase(l.objectType)} Layer
            </div>
          )) : (
            <div>
              No layers
            </div>
          )}
        </div>
      </div>

      <Editor
        ref={editorRef}
        options={{
          width,
          height,
          boards: [
            {
              name: "Center Front",
              backgroundImage: "https://merch-cdn.streamelements.com/merch/products/preview/Bella-Canvas-3001_Front_light-yellow_2019-12-08.png",
              backgroundImageOverlay: "https://merch-cdn.streamelements.com/merch/products/preview/Bella_Canvas_3001_Front_Overlay_newOverlay.png",
              dimensions: {
                width: 10402,
                height: 10100,
              },
              clip: {
                left: 3066,
                top: 2111,
                width: 7566,
                height: 7811
              }
            },
            {
              name: "Back",
              backgroundImage: "https://merch-cdn.streamelements.com/merch/products/preview/Bella-Canvas-3001_Front_Purple_2019-12-08.png",
              backgroundImageOverlay: "https://merch-cdn.streamelements.com/merch/products/preview/Bella_Canvas_3001_Front_Overlay_newOverlay.png",
              dimensions: {
                width: 10100,
                height: 10402,
              },
            }
          ],
          onLayersChanged: onLayersChanged,
          onActiveObjectSelected: onActiveObjectSelected,
        }}
      />
    </div>
  );
}

export default App;
