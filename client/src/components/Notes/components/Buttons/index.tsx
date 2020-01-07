import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';

import { Link } from "react-router-dom";

import useNotes from "../../../../reduxHooks/useNotes";

interface ButtonsProps {
    id: string
}

const Buttons: React.FC<ButtonsProps> = ({id}) => {
    const {deleteNoteHandler} = useNotes();

    return (
        <React.Fragment>
            <Link to={`/note/${id}/edit`}>
                <IconButton>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Link>

            <IconButton onClick={() => deleteNoteHandler(id)}>
                <DeleteIcon color="secondary" fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
}

export default Buttons;
