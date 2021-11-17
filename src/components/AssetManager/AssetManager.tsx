import { ChangeEvent, PropsWithChildren, useCallback, useRef } from "react";
import { Modal, Tabs, styled, Button, Text, TextField, Divider } from '@streamelements/frontend-ui';
import prettyBytes from 'pretty-bytes';
import UserAssets from "../../types/UserAssets";
import AssetManagerItem from "./AssetManagerItem";
import { UserStoreItem } from "../../types/UserStore";
import IAssetItemBundle from "../../types/IAssetItemBundle";
import { uploadImage } from "../../services/MerchApi";

const availableShapes = [
    {
        name: 'Circle',
        link: '/svg-objects/circle.svg'
    },
    {
        name: 'Rect',
        link: '/svg-objects/rect.svg'
    },
    {
        name: 'RectSkew',
        link: '/svg-objects/rectangleSkew.svg'
    },
    {
        name: 'Triangle',
        link: '/svg-objects/triangle.svg'
    },
    {
        name: 'Polygon',
        link: '/svg-objects/polygon.svg'
    },
    {
        name: 'HalfCircle',
        link: '/svg-objects/halfCircle.svg'
    },
    {
        name: 'HighRect',
        link: '/svg-objects/highRect.svg'
    },
    {
        name: 'Star',
        link: '/svg-objects/star.svg'
    },
    {
        name: 'ArrowDown',
        link: '/svg-objects/arrowDown.svg'
    },
    {
        name: 'Diamond',
        link: '/svg-objects/diamond.svg'
    }
];

interface Props {
    uid?: string,
    open: boolean,
    onOpenChange: (open: boolean) => void,
    assets?: UserAssets,
    previews?: UserStoreItem[],
    bundles: IAssetItemBundle[],
    presets?: any[],
    onItemClick: (item: string, name?: string) => void,
    onPresetClick: (item: string) => void
}

const ModalContent = styled(Modal.Content, {
    minWidth: 'max-content',
    height: 600,
    overflow: 'hidden'
});

const TabContent = styled('div', {
    background: '#F7F7F7',
    position: 'relative',
    height: 'calc(100% - calc($space$base * 5))',
    overflowY: 'scroll',
    display: 'grid',
    gridTemplateColumns: 'repeat(4, 1fr)',
    rowGap: '$base',
    columnGap: '$base',
    padding: 'calc($base * 2)',
});

const PaddedContainer = styled('div', {
    padding: 'calc($base * 2)',
    height: '100%',
    overflow: 'hidden'
});

const ModalHeader = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'max-content 1fr'
});

const FiltersContainer = styled('div', {
    dispaly: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content'
});

const HeaderActions = styled('div', {
    display: 'grid',
    gridAutoFlow: 'column',
    gridAutoColumns: 'max-content',
    justifySelf: 'self-end',
    placeItems: 'center',
    columnGap: '$base'
});

const TabContentContainer = styled(Tabs.Content, {
    position: 'relative',
    height: '100%',
    overflow: 'hidden',
});

export default function AssetManager({ open, onOpenChange, assets, previews, bundles, presets, uid, onItemClick, onPresetClick }: PropsWithChildren<Props>) {
    const fileInputRef = useRef<HTMLInputElement>(null);

    const prettyFormatBytes = (value?: number) => {
        if (!value) return 0;
        return prettyBytes(Number(value))
    }

    const handleUploadFiles = useCallback((files: FileList) => {
        if (!uid) return;

        const file = files[0];

        uploadImage(file, uid, file.name)
            .then((res) => {
                if (!res.url) {
                    alert('Failed to upload image, please retry again');
                    return;
                }

                onItemClick(res.url, file.name);
                onOpenChange(false);
            })
    }, [onOpenChange, onItemClick, uid])

    const onFileInputChanged = (event: ChangeEvent<HTMLInputElement>) => {
        if (!event.target || !event.target.files) return;
        handleUploadFiles(event.target.files);
        event.target.value = '';
    };

    return (
        <Modal.Root
            open={open}
            onOpenChange={onOpenChange}
        >
            <Modal.Overlay />
            <ModalContent>
                <input type='file' hidden ref={fileInputRef} onChange={onFileInputChanged} accept='.jpg,.jpeg,.png,.svg,.webp' />

                <Tabs.Root defaultValue="useruploads" style={{ display: 'grid', gridTemplateRows: 'max-content 1fr', position: 'relative', height: '100%' }}>
                    <PaddedContainer>
                        <ModalHeader>
                            <Tabs.List>
                                <Tabs.Trigger value="segallery">
                                    SE.Gallery
                                </Tabs.Trigger>
                                <Tabs.Trigger value="useruploads">
                                    Your uploads
                                </Tabs.Trigger>
                                <Tabs.Trigger value="presets">
                                    Presets
                                </Tabs.Trigger>
                                <Tabs.Trigger value="previews">
                                    Previews
                                </Tabs.Trigger>
                                <Tabs.Trigger value="shapes">
                                    Shapes
                                </Tabs.Trigger>
                            </Tabs.List>

                            <HeaderActions>
                                <Text.Body variant='caption'>{prettyFormatBytes(assets?.totalSize)} out of {prettyFormatBytes(assets?.totalStorage)} ({((Number(assets?.totalSize) / Number(assets?.totalStorage)) * 100).toFixed(2)}%) in use</Text.Body>
                                <Button variant='outlined' onClick={() => fileInputRef.current?.click()}>Upload new</Button>
                            </HeaderActions>
                        </ModalHeader>

                    </PaddedContainer>
                    <Divider />
                    <PaddedContainer>
                        <FiltersContainer>
                            <TextField.Root placeholder='Search...' />
                        </FiltersContainer>
                    </PaddedContainer>

                    <TabContentContainer value="segallery">
                        <TabContent>
                            {bundles.map(b => b.images.map(bi => <AssetManagerItem onClick={onItemClick} name={bi.name} key={bi.name} url={bi.path} thumbnail={bi.thumbnail} />))}
                        </TabContent>
                    </TabContentContainer>

                    <TabContentContainer value="useruploads">
                        <TabContent>
                            {assets?.uploads.map(a => (
                                <AssetManagerItem
                                    key={a._id}
                                    onClick={onItemClick}
                                    name={a.name}
                                    url={a.url}
                                />
                            ))}
                        </TabContent>
                    </TabContentContainer>

                    <TabContentContainer value="presets">
                        <TabContent>
                            {presets?.map((p, i) => (
                                <AssetManagerItem
                                    key={i}
                                    content={p}
                                    onClick={onPresetClick}
                                    url='https://i.imgur.com/zvgHFAS.png'
                                />
                            ))}
                        </TabContent>
                    </TabContentContainer>

                    <TabContentContainer value="previews">
                        <TabContent>
                            {previews?.map(a => a.variants.map(v => (
                                <AssetManagerItem
                                    key={v.color}
                                    onClick={onItemClick}
                                    url={v.preview.url}
                                />
                            )))}
                        </TabContent>
                    </TabContentContainer>

                    <TabContentContainer value="shapes">
                        <TabContent>
                            {availableShapes.map(s => (
                                <AssetManagerItem
                                    key={s.name}
                                    isSvg={true}
                                    onClick={onItemClick}
                                    content={s.link}
                                    url={s.link}
                                    name={s.name}
                                />
                            ))}
                        </TabContent>
                    </TabContentContainer>
                </Tabs.Root>
            </ModalContent>
        </Modal.Root>
    )
}