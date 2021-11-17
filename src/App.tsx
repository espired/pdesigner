import './App.css';
import useWaitGroup from "./hooks/useWaitGroup";
import Editor from "./components/Editor/Editor";
import { styled } from '@streamelements/frontend-ui';
import LayersBlock from "./components/App/LayersBlock";
import ProductDetailsBlock from "./components/App/ProductDetailsBlock";
import { useCallback, useEffect, useRef, useState, lazy, Suspense } from "react";
import { getCurrentUser, getStoreItems, getTemplates, getUserAssets } from "./services/MerchApi";

// #region third party libs
import uniqBy from 'lodash/uniqBy';
import { useWindowSize } from 'usehooks-ts';
// #endregion

// #region types
import UserAssets from "./types/UserAssets";
import IEditorObject from "./types/IEditorObject";
import ProductTemplate from './types/ProductTemplate';
import IAssetItemBundle from "./types/IAssetItemBundle";
import IEditorRefActions from "./types/IEditorRefActions";
import IEditorOptionsBoard from './types/IEditorOptionsBoard';
import { UserStoreItem, UserStoreItemVariant } from "./types/UserStore";
import ColorCircle from './components/Editor/ColorCircle';
import generateBoardConfiguration from './components/App/ConfigGenerator';
// #endregion

// #region dynamic components
const SaveModal = lazy(() => import('./components/App/Modals/SaveModal'));
const AssetManager = lazy(() => import('./components/AssetManager/AssetManager'));
// #endregion

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

const FloatingVariantColorPicker = styled('div', {
	position: 'absolute',
	right: 'calc($space$base * 4)',
	top: '50%',
    transform: 'translateY(-50%)',
	display: 'grid',
	rowGap: '$base'
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
	const [assets, setAssets] = useState<UserAssets>();
	const [storeItems, setStoreItems] = useState<UserStoreItem[]>([]);
	const [bundles, setBundles] = useState<IAssetItemBundle[]>([]);
	const [presets, setPresets] = useState<any[]>();
	const [assetsModalOpen, setAssetsModalOpen] = useState<boolean>(false);
	const [saveModalOpen, setSaveModalOpen] = useState<boolean>(false);
	const [currentUserId, setCurrentUserId] = useState<string>();
	const [boards, setBoards] = useState<IEditorOptionsBoard[]>([]);
	const [templates, setTemplates] = useState<ProductTemplate[]>([]);

	const { loader, add, done } = useWaitGroup();
	const { width, height } = useWindowSize();

	const handleAddText = () => editorRef.current?.addText('Hello World')
	const handleAddImage = (url: string, name?: string, isSvg?: boolean) => {
		if (!url) return;
		setAssetsModalOpen(false);
		if (isSvg) {
			editorRef.current?.addShape(url, name);
		} else {
			editorRef.current?.addImage(url, name);
		}
	};
	
	const HandleToggleLayerVisibility = (layer: IEditorObject) => editorRef.current?.toggleLayerVisibility(layer);
	const HandleToggleLayerLock = (layer: IEditorObject) => editorRef.current?.toggleLayerLock(layer);
	const HandleLayerDeleteClicked = (layer: IEditorObject) => editorRef.current?.deleteLayer(layer);

	const handleLoadJson = (value: string) => {
		if (!value) return;
		setAssetsModalOpen(false);
		editorRef.current?.loadFromJSON(value);
	};

	const handleLayerClicked = (layer: IEditorObject) => editorRef.current?.selectLayer(layer);
	const onLayersChanged = useCallback((ls: IEditorObject[]) => setLayers(ls.reverse()), [setLayers])
	const onActiveObjectSelected = useCallback((l: IEditorObject | undefined) => setActiveObject(l), [setActiveObject]);

	const handleVariantClicked = useCallback((variant: UserStoreItemVariant) => {
		const storeItem = storeItems[0];
		const templateItem = templates?.find(t => t._id === storeItem.template);

		if (!templateItem) return;

		const templateItemVariant = templateItem.variants.find(tiv => tiv.color === variant.color);

		if (!templateItemVariant) return;

		setBoards([generateBoardConfiguration(templateItem, templateItemVariant)]);
	}, [setBoards, storeItems, templates]);

	useEffect(() => {
		if (!currentUserId) return;

		getUserAssets(currentUserId).then(setAssets);

		getTemplates(currentUserId).then(setTemplates);

		getStoreItems(currentUserId)
			.then(res => {
				const uniqVariantsByColor = res.items.map(i => {
					i.variants = uniqBy(i.variants, v => v.color);
					return i;
				});

				setStoreItems(uniqVariantsByColor);
			});

		// Fetch SE Bundles
		fetch('/bundles/bundles.json')
			.then(res => res.json())
			.then(res => setBundles(res.bundles));

		// Fetch Presets
		fetch('/presets/FacebookPost.json')
			.then(res => res.json())
			.then(res => setPresets([res]));
		// eslint-disable-next-line
	}, [currentUserId]);

	useEffect(() => {
		// Fetch current user
		add(1);
		getCurrentUser()
			.then(res => {
				setCurrentUserId(res._id);
				done();
			});

		// eslint-disable-next-line
	}, []);

	return (
		<>
			{loader}
			<Suspense fallback={<></>}>
				<AssetManager
					uid={currentUserId}
					open={assetsModalOpen}
					onOpenChange={o => setAssetsModalOpen(o)}
					assets={assets}
					previews={storeItems}
					bundles={bundles}
					presets={presets}
					onItemClick={handleAddImage}
					onPresetClick={handleLoadJson}
				/>
				<SaveModal
					open={saveModalOpen}
					onOpenChange={setSaveModalOpen}
				/>
			</Suspense>
			<Container>
				<Sidebar>
					<ProductDetailsBlock
						availableVariants={templates?.find(t => t._id === storeItems?.[0].template)?.variants}
						selectedVariants={storeItems?.[0]?.variants}
						onVariantClicked={handleVariantClicked}
					/>
					<LayersBlock
						layers={layers}
						handleLayerDeleteClicked={HandleLayerDeleteClicked}
						handleToggleLayerLock={HandleToggleLayerLock}
						handleToggleLayerVisibility={HandleToggleLayerVisibility}
						handleLayerClicked={handleLayerClicked}
						handleAddTextClicked={handleAddText}
						handleOpenAssetManager={() => setAssetsModalOpen(true)}
						handleLayersOrderChanged={(layers: IEditorObject[]) => editorRef.current?.reorderLayers(layers)}
						activeObject={activeObject}
					/>
				</Sidebar>

				{!!assets && (
					<Editor
						ref={editorRef}
						options={{
							fonts: ['Arial', 'Bungee', 'Share Tech Mono', 'Righteous', 'Squada One', 'Knewave', 'Oswald', 'Quicksand', 'Josefin Sans', 'Questrial', 'Fredoka One', 'Play', 'Carter One', 'Kaushan Script', 'Russo One', 'Orbitron', 'Fugaz One', 'Aldrich', 'Atomic Age', 'Ruge Boogy', 'Lobster', 'Architects Daughter', 'Futura'],
							width,
							height,
							boards,
							preserveGraphicsOnBoardChange: true,
							onLayersChanged: onLayersChanged,
							onActiveObjectSelected: onActiveObjectSelected,
							onSave: (dataUri: string) => {
								console.log("DATA", dataUri)
								setSaveModalOpen(true);
							}
						}}
					/>
				)}

				<FloatingVariantColorPicker>
					{storeItems?.[0]?.variants.map(v => (
						<ColorCircle
							key={v.colorHex}
							color={v.colorHex}
							onClick={() => handleVariantClicked(v)}
						/>
					))}
				</FloatingVariantColorPicker>
			</Container>
		</>
	);
}

export default App;
