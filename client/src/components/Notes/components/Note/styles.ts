import styled from "styled-components";
import Chip from '@material-ui/core/Chip';

export const NoteListDetailsHolderSegmentStyles = styled.div`
    display: flex;
    justify-content: space-between;
`;

export const NoteListDetailsHolderStyles = styled(NoteListDetailsHolderSegmentStyles)`
    flex: 1;
`;

export const NoteItemChipStyles = styled(Chip)`
    margin-left: 10px;
`;