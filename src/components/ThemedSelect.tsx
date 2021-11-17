import { css, Select } from '@streamelements/frontend-ui';

const styledSelect = css({
    'fieldset' : {
        border: 'none',
    },
    '[data-component-name=SelectInput]': {
        width: 'max-content'
    },
    '[data-component-name=ValueContainer]': {
        padding: 'inherit',
        margin: 'inherit',
        minWidth: 70
    },
    '[data-component-name=Menu]': {
        width: '160%'
    },
    '[data-component-name=Control]': {
        padding: 0,
        display: 'grid',
        gridAutoFlow: 'column',

        '&:hover, &--is-focused': {
            borderColor: '$themePrimaryMain',
            '[data-component-name=DropdownIndicator]': {
                color: '$themePrimaryMain',
            }
        },
        '&--menu-is-open': {
            '[data-component-name=DropdownIndicator]': {
                fill: '$themePrimaryMain',
                transform: 'rotate(180deg)',
                backgroundColor: '$themePrimary15',
            }
        },
    },
    '[data-component-name=SingleValue]': {
        color: '$themePrimaryMain'
    },
    '[data-component-name=DropdownIndicator]': {
        color: '$themePrimaryMain',
        marginRight: 0,

        'svg': {
            height: 10,
        }
    },
    '[data-component-name=Option]': {
        '&--is-selected': {
            color: '$themePrimaryMain',

            '&:hover, &:focus, &--is-focused': {
                color: '$themePrimaryMain'
            }
        },

        '&:hover, &--is-focused': {
            cursor: 'pointer',
            background: '$themePrimary15',
            br: '$base'
        }
    },

    variants: {
        size: {
            tiny: {
                '[data-component-name=SelectInput]': {
                    width: 20
                },
            },
            small: {
                '[data-component-name=SelectInput]': {
                    width: 50
                },
            },
            medium: {
                '[data-component-name=SelectInput]': {
                    width: 60
                },
            },
            large: {
                '[data-component-name=SelectInput]': {
                    width: 100
                },
            }
        }
    }
});

const ThemedSelect = (props: any) => <Select {...props} className={styledSelect({ size: props.size }).className} />

export default ThemedSelect;