import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';

import Note from "./components/Note";
import {NoResultsText} from "./styles";

import useSearchTerm from "../../reduxHooks/useSearchTerm"
import useNotes from "../../reduxHooks/useNotes";

let shouldLoadList = true;

const Notes: React.FC = () => {
    const {notes, getNotesHandler} = useNotes();
    const {searchTerm} = useSearchTerm();
    const filteredNotes = notes.filter(note => {
        return note.tags.some(tag => tag.includes(searchTerm));
    });

    if (shouldLoadList) {
        getNotesHandler();
        shouldLoadList = false;
    }

    return (
        notes.length ?
        <List className="notes-list">
            {filteredNotes.length ? filteredNotes.map((note, index) => {
                return (
                    <React.Fragment key={note.id}>
                        <Note key={index} {...note} />
                        {index !== notes.length - 1 && <Divider />}
                    </React.Fragment>
                )
            }) : <NoResultsText>No notes, please refine your search</NoResultsText>}
        </List> :
        <NoResultsText>No notes, please add one</NoResultsText>
    );
}

export default Notes;
