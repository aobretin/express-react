import {INote, IAddNotes, IDeleteNote} from "../interfaces";
import {ADD_NOTES, DELETE_NOTE} from "../constants";

export const addNotes = (notes: INote[]): IAddNotes => {
    return {
        notes,
        type: ADD_NOTES
    };
}

export const deleteNote = (id: string): IDeleteNote => {
    return {
        id,
        type: DELETE_NOTE
    };
}