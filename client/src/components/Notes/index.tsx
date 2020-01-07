import React from 'react';
import useNotes from "../../reduxHooks/useNotes";
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Note from "./components/Note";
import {NoResultsText} from "./styles";

let shouldLoadList = true;

const Notes: React.FC = () => {
    const {notes, getNotesHandler} = useNotes();

    if (shouldLoadList) {
        getNotesHandler();
        shouldLoadList = false;
    }

    return (
        notes.length ?
        <List className="notes-list">
            {notes.map((note, index) => {
                return (
                    <React.Fragment key={note.id}>
                        <Note key={index} {...note} />
                        {index !== notes.length - 1 && <Divider />}
                    </React.Fragment>
                )
            })}
        </List> :
        <NoResultsText>No notes, please add one</NoResultsText>
    );
}

export default Notes;
