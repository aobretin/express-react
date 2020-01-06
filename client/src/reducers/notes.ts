import {INote, IAddNote, IAddNotes, IModifyNote, IDeleteNote} from "../interfaces";
import {ADD_NOTE, ADD_NOTES, MODIFY_NOTE, DELETE_NOTE} from "../constants";

import {initialState} from "../store/initialState";

type NotesAction = IAddNote | IAddNotes | IModifyNote | IDeleteNote;

export const notes = (state: INote[] = initialState.notes, action: NotesAction): INote[] => {
    switch (action.type) {
        case ADD_NOTES:
            return [...action.notes];
        case ADD_NOTE:
            return [action.note, ...state];
        case MODIFY_NOTE:
            return state;
        case DELETE_NOTE:
            return state;
        default:
            return state;
    }
}