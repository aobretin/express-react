import React from 'react';
import List from '@material-ui/core/List';
import Divider from '@material-ui/core/Divider';
import Skeleton from '@material-ui/lab/Skeleton';

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
        getNotesHandler().then(_ => {
            shouldLoadList = false;
        });
    }

    return (
        shouldLoadList ? <React.Fragment>
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
            <Skeleton animation="wave" />
        </React.Fragment> : notes.length ?
        <List data-testid="notes-list" className="notes-list">
            {filteredNotes.length ? filteredNotes.map((note, index) => {
                return (
                    <React.Fragment key={note.id}>
                        <Note key={index} {...note} />
                        {index !== notes.length - 1 && <Divider />}
                    </React.Fragment>
                )
            }) : <NoResultsText>No notes, please refine your search</NoResultsText>}
        </List> :
        <NoResultsText data-testid="no-results">No notes, please add one</NoResultsText>
    );
}

export default Notes;
