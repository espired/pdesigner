import Editor from "./components/Editor/Editor";
import './App.css';
import { useCallback, useRef, useState } from "react";
import IEditorRefActions from "./types/IEditorRefActions";
import IEditorObject from "./types/IEditorObject";
import { useWindowSize } from 'usehooks-ts';
// import { downloadURI } from "./utils/DownloadUtils";
import { styled } from '@streamelements/frontend-ui';
import ProductDetailsBlock from "./components/App/ProductDetailsBlock";
import LayersBlock from "./components/App/LayersBlock";

const Container = styled('div', {
  display: 'grid',
  height: '100%',
  backgroundColor: '$uiTertiary',
  backgroundImage: 'radial-gradient($uiDisabled25 1px, transparent 0)',
  backgroundSize: '10px 10px',
  backgroundPosition: '-19px -19px',
  gridTemplateColumns: 'max-content 1fr',
  overflow: 'hidden'
});

const Sidebar = styled('div', {
  width: 370,
  margin: 'calc($base * 3)',
  display: 'grid',
  rowGap: 'calc($base * 2)',
  gridTemplateRows: 'max-content 1fr',
  overflow: 'hidden'
});

function App() {
  const editorRef = useRef<IEditorRefActions>(null);
  const [layers, setLayers] = useState<IEditorObject[]>([]);
  const [activeObject, setActiveObject] = useState<IEditorObject>();
  const { width, height } = useWindowSize();

  const handleAddText = () => editorRef.current?.addText('Hello World')
  const handleLayerClicked = (layer: IEditorObject) => editorRef.current?.selectLayer(layer);
  // const handleExportToPNGClicked = () => {
  //   const contents = editorRef.current?.exportToPNG();
  //   !!contents && downloadURI(contents, "Graphics.png");
  // }

  const onLayersChanged = useCallback((ls: IEditorObject[]) => setLayers(ls.reverse()), [setLayers])
  const onActiveObjectSelected = useCallback((l: IEditorObject | undefined) => setActiveObject(l), [setActiveObject]);

  return (
    <Container>
      <Sidebar>
        <ProductDetailsBlock />
        <LayersBlock
          layers={layers}
          handleLayerClicked={handleLayerClicked}
          handleAddTextClicked={handleAddText}
          activeObject={activeObject}
        />
      </Sidebar>

      <Editor
        ref={editorRef}
        options={{
          fonts: ['Arial', 'Bungee', 'Share Tech Mono', 'Righteous', 'Squada One', 'Knewave', 'Oswald', 'Quicksand', 'Josefin Sans', 'Questrial', 'Fredoka One', 'Play', 'Carter One', 'Kaushan Script', 'Russo One', 'Orbitron', 'Fugaz One', 'Aldrich', 'Atomic Age', 'Ruge Boogy', 'Lobster', 'Architects Daughter', 'Futura'],
          width,
          height,
          palette: ['#ffffff', '#000000'],
          boards: [
            {
              name: "Front",
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
              backgroundImage: "https://i.imgur.com/YSGdoru.png",
              backgroundImageOverlay: "https://az412349.vo.msecnd.net/product-tshirts/Overlay/Back/Bella-3001/Bella_Canvas_3001_Back_Overlay_newOverlay.png",
              dimensions: {
                width: 9475,
                height: 9200,
              },
              clip: {
                left: 3029,
                top: 1073,
                width: 6629,
                height: 5873
              }
            }
          ],
          onLayersChanged: onLayersChanged,
          onActiveObjectSelected: onActiveObjectSelected,
        }}
      />
    </Container>
  );
}

export default App;
