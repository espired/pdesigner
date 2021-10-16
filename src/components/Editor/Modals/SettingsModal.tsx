import { styled, Modal } from '@streamelements/frontend-ui';
import { FilterRounded } from '@streamelements/frontend-icons';
import StyledButton from '../StyledButton';

const Content = styled(Modal.Content, {

});

export default function SettingsModal() {
    return (
        <Modal.Root>
            <Modal.Overlay />
            <Modal.Trigger as={StyledButton} color='neutral' size='small' variant='ghost'>
                <FilterRounded />
            </Modal.Trigger>
            <Content>
                Settings Here
                <Modal.Close />
            </Content>
        </Modal.Root>
    );
}