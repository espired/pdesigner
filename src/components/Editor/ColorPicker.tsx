import { Dropdown, styled, TextField } from "@streamelements/frontend-ui";
import { PropsWithChildren, useEffect, useState } from "react";
import { HexColorPicker } from "react-colorful";
import { useEditorState } from "../../store/EditorContext";

interface ColorPickerProps {
    value?: string | undefined,
    onChange: (v: string) => void,
    items?: { name: string, value: string }[]
}

const ColorCircleContainer = styled('div', {
    display: 'grid',
    gridTemplateColumns: 'repeat(5, max-content)',
    gap: '$base',
})

const ColorCircleOption = styled('div', {
    width: 20,
    height: 20,
    border: '2px solid rgba(0,0,0,0.5)',
    br: '10em'
})

const Trigger = styled(Dropdown.Trigger, {
    border: 'none',
    background: 'transparent',
    padding: 0,
    display: 'grid',
    gridAutoFlow: 'column',
    columnGap: 'calc($base * 0.5)',
    placeItems: 'center',
    cursor: 'pointer'
})

const SelectedColorCircle = styled('div', {
    border: '1px solid #ededed',
    width: 18,
    height: 18,
    borderRadius: '10em',
});

const Content = styled(Dropdown.Content, {
    display: 'grid',
    gridRowGap: '$base',
    width: 176,
    marginTop: '$base',
})

export function ColorPicker(props: PropsWithChildren<ColorPickerProps>) {
    const [palette, setPalette] = useState<string[]>([]);
    const { state } = useEditorState();

    const onInputChange = (value: string) => props.onChange('#' + value);

    useEffect(() => {
        if (state.options?.palette) {
            setPalette(state.options?.palette);
        }

    }, [state.options?.palette]);

    return (
        <Dropdown.Root>
            <Trigger>
                <SelectedColorCircle style={{ backgroundColor: props.value }} />
            </Trigger>
            {/** @ts-ignore*/}
            <Content>
                {!!palette.length ? (
                    <ColorCircleContainer>
                        {palette.map(p => <ColorCircleOption key={p} css={{ backgroundColor: p }} onClick={() => props.onChange(p)} />)}
                    </ColorCircleContainer>
                ) : (
                    <HexColorPicker style={{ width: '100%' }} color={props.value} onChange={props.onChange} />
                )}
                <TextField.Root maxLength={7} value={props.value?.toUpperCase().replace('#', '')} onChange={e => onInputChange(e.target.value)}>
                    <TextField.Adornment position='start'>
                        #
                    </TextField.Adornment>
                </TextField.Root>
            </Content>
        </Dropdown.Root>
    )
}