import styled from "styled-components";
import Chip from '@material-ui/core/Chip';
import InputBase from '@material-ui/core/InputBase';
import Card from '@material-ui/core/Card';

export const NoteDetailsHolderStyles = styled.div`
    display: flex;
    justify-content: center;
    margin-top: 50px;
`;

export const ChipNoteStyles = styled(Chip)`
    margin-right: 10px;
`;

export const CardStyles = styled(Card)`
    flex: 1;
    max-width: 800px;
    display: flex;
    flex-direction: column;
`;

export const InputStyles = styled(InputBase)`
    width: 100%;
    display: block;
    margin-top: 20px;
`;
