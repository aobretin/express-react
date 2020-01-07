import {INote, IAddNotes, IModifyNote, IDeleteNote, IAddNote} from "../interfaces";
import {ADD_NOTES, ADD_NOTE, MODIFY_NOTE, DELETE_NOTE} from "../constants";

export const addNotes = (notes: INote[]): IAddNotes => {
    return {
        notes,
        type: ADD_NOTES
    };
}

export const addNote = (note: INote): IAddNote => {
        return {
            note,
            type: ADD_NOTE
        }
}

export const modifyNote = (note: Partial<INote>): IModifyNote => {
    return {
        note,
        type: MODIFY_NOTE
    }
}

export const deleteNote = (id: string): IDeleteNote => {
    return {
        id,
        type: DELETE_NOTE
    };
}
