import React from 'react';
import useNotes from "../../reduxHooks/useNotes";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Note from "./components/Note";

const Notes: React.FC = () => {
    const {notes} = useNotes();

    return (
        <List className="notes-list">
            {notes.map((note, index) => {
                return (
                    <React.Fragment key={note.id}>
                        <Note key={index} {...note} />
                        {index !== notes.length - 1 && <Divider />}
                    </React.Fragment>
                )
            })}
        </List>

    );
}

export default Notes;
