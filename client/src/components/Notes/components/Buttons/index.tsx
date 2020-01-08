import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import RemoveRedEyeIcon from '@material-ui/icons/RemoveRedEye';

import { Link } from "react-router-dom";

import useNotes from "../../../../reduxHooks/useNotes";

interface ButtonsProps {
    id: string
}

const Buttons: React.FC<ButtonsProps> = ({id}) => {
    const {deleteNoteHandler} = useNotes();

    return (
        <React.Fragment>
            <Link data-testid="preview-note" to={`/note/${id}`}>
                <IconButton>
                    <RemoveRedEyeIcon color="primary" fontSize="small" />
                </IconButton>
            </Link>

            <Link data-testid="edit-note" to={`/note/${id}/edit`}>
                <IconButton>
                    <EditIcon fontSize="small" />
                </IconButton>
            </Link>

            <IconButton data-testid="delete-note" onClick={() => deleteNoteHandler(id)}>
                <DeleteIcon color="secondary" fontSize="small" />
            </IconButton>
        </React.Fragment>
    );
}

export default Buttons;
