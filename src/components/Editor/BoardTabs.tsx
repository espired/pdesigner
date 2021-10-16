import { PropsWithChildren } from "react";
import { Tabs } from '@streamelements/frontend-ui';
import IEditorOptionsBoard from "../../types/IEditorOptionsBoard";
import StyledTabs from "./StyledTabs";

interface IProps {
    onTabClick: (board: IEditorOptionsBoard) => void,
    boards: IEditorOptionsBoard[],
    activeBoard?: IEditorOptionsBoard
}

export default function BoardTabs({ boards = [], onTabClick, activeBoard }: PropsWithChildren<IProps>) {

    const handleTabClicked = (value: string) => {
        const findTab = boards.find(b => b.name === value);
        !!findTab && onTabClick(findTab)
    }

    return (
        <Tabs.Root onValueChange={handleTabClicked} defaultValue={boards[0]?.name}>
            <StyledTabs.List aria-label="Boards">
                {!!boards.length && boards.map(b => (
                    <StyledTabs.Trigger value={b.name} key={b.name}>
                        {b.name}
                    </StyledTabs.Trigger>
                ))}
            </StyledTabs.List>
        </Tabs.Root>
    )
}