import { useState } from "react";
import { Modal, CircularProgress, styled } from '@streamelements/frontend-ui';

const CustomModalContent = styled(Modal.Content, {
    display: 'grid',
    placeContent: 'center',
    height: 250,
    width: 250
})

export default function useWaitGroup() {
    const [count, setCount] = useState<number>(0);

    const add = (addCount: number = 1) => setCount(prevCount => prevCount + addCount);
    const done = (doneCount: number = 1) => setCount(prevCount => Math.max(prevCount - doneCount, 0))

    const loader = (
        <Modal.Root open={count > 0}>
            <Modal.Overlay />
            <CustomModalContent>
                <CircularProgress.Root variant="indeterminate" />
            </CustomModalContent>
        </Modal.Root>
    )

    return { count, loader, add, done }
}