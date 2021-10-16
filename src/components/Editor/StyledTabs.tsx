import { styled, Tabs } from '@streamelements/frontend-ui';

const StyledTabsList = styled(Tabs.List, {
    gap: '$base'
});

const StyledTabsTrigger = styled(Tabs.Trigger, {
    px: '$base'
});

const StyledTabs = {
    List: StyledTabsList,
    Trigger: StyledTabsTrigger
};

export default StyledTabs;