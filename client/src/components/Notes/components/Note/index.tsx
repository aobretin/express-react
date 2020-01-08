import React from 'react';
import ListItemText from '@material-ui/core/ListItemText';
import ListItem from '@material-ui/core/ListItem';

import Buttons from "../Buttons";

import {INote} from "../../../../interfaces";

import {
    NoteListDetailsHolderStyles, 
    NoteItemChipStyles,
    NoteListDetailsHolderSegmentStyles
} from "./styles";

const Note: React.FC<INote> = ({
    title,
    tags,
    id
}) => {
    return (
        <ListItem data-testid="note" data-test_id={id} alignItems="flex-start">
            <NoteListDetailsHolderStyles>
                <NoteListDetailsHolderSegmentStyles>
                    <ListItemText primary={title} />
                    {tags.map((tag, tagIndex) => <NoteItemChipStyles key={tagIndex} label={tag} /> )}
                </NoteListDetailsHolderSegmentStyles>
                
                <NoteListDetailsHolderSegmentStyles>
                    <Buttons id={id} />
                </NoteListDetailsHolderSegmentStyles>
            </NoteListDetailsHolderStyles>
        </ListItem>
    );
}

export default Note;
