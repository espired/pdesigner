import { styled, Text } from '@streamelements/frontend-ui';
import { PropsWithChildren, useState } from 'react';
import truncate from 'lodash/truncate';

interface Props {
    url: string,
    thumbnail?: string,
    onClick: (imgUrl: string, name?: string, isSvg?: boolean) => void,
    content?: string,
    name?: string,
    isSvg?: boolean
}

const Container = styled('div', {
    width: 260,
    height: 260,
    borderRadius: '$base',
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
});

const Item = styled('div', {
    width: 260,
    height: 260,
    borderRadius: '$base',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    overflow: 'hidden',
    transition: 'box-shadow 0.2s ease-in-out',
});

export const ItemTransitionBackground = styled('div', {
    position: 'absolute',
    top: 0,
    left: 0,
    width: 260,
    height: 260,
    background: 'rgba(0,0,0,0.5)',
    opacity: 0,
    transition: 'all 0.2s ease-in-out',

    variants: {
        hover: {
            true: {
                opacity: 1,
            }
        }
    }
});

const ItemDetails = styled('div', {
    height: 55,
    position: 'absolute',
    padding: '$base',
    color: '#fff',
    bottom: -71,
    left: 0,
    right: 0,
    transition: 'bottom 0.2s ease-in-out',

    variants: {
        hover: {
            true: {
                bottom: 0,
            }
        }
    }
});

export default function AssetManagerItem({ url, content, name, thumbnail, onClick, isSvg }: PropsWithChildren<Props>) {
    const [hover, setHover] = useState<boolean>(false);
    return (
        <Container
            onClick={() => onClick(content || url, name, isSvg)}
            onMouseOut={() => setHover(false)}
            onMouseOver={() => setHover(true)}
        >
            <ItemTransitionBackground hover={hover}/>
            <ItemDetails hover={hover}>
                <Text.Subtitle weight='bold' style={{ color: '#fff' }}>{truncate('Hola Caliente', { length: 30 })}</Text.Subtitle>
            </ItemDetails>
            <Item css={{ backgroundImage: `url(${thumbnail || url})` }} />
        </Container>
    );
}