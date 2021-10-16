import { styled, Dropdown } from '@streamelements/frontend-ui';

const StyledDropdownItem = styled(Dropdown.Item, {
    padding: '$base',
    margin: '0',
    br: '$base',

    '&:hover' : {
        cursor: 'pointer',
        backgroundColor: '$uiPrimary25'
    }
});

const StyledDropdown = {
    ...Dropdown,
    Item: StyledDropdownItem
};

export default StyledDropdown;