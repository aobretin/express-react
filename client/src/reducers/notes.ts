import {INote, IAddNote, IAddNotes, IModifyNote, IDeleteNote} from "../interfaces";
import {ADD_NOTE, ADD_NOTES, MODIFY_NOTE, DELETE_NOTE} from "../constants";

import {initialState} from "../store/initialState";

type NotesAction = IAddNote | IAddNotes | IModifyNote | IDeleteNote;

export const notes = (state: INote[] = initialState.notes, action: NotesAction): INote[] => {
    const clonedNotes = [...state];
    
    switch (action.type) {
        case ADD_NOTES:
            return [...action.notes];
        case ADD_NOTE:
            return [...state, action.note];
        case MODIFY_NOTE:
            const toModifyNoteIndex = state.findIndex(note => note.id === action.note.id);
            const noteToModify = clonedNotes[toModifyNoteIndex];

            clonedNotes.splice(toModifyNoteIndex, 1, {...noteToModify, ...action.note});
            
            return [...clonedNotes];
        case DELETE_NOTE:
            const toDeleteNoteIndex = state.findIndex(note => note.id === action.id);
            clonedNotes.splice(toDeleteNoteIndex, 1);

            return [...clonedNotes];
        default:
            return state;
    }
}