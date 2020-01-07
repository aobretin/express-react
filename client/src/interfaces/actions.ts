import {ADD_NOTE, ADD_NOTES, MODIFY_NOTE, DELETE_NOTE, SET_SEARCH_TERM} from "../constants";
import {INote} from "./notes";

export interface IAddNotes {
    type: typeof ADD_NOTES;
    notes: INote[]
}

export interface IAddNote {
    type: typeof ADD_NOTE;
    note: INote
}

export interface IModifyNote {
    type: typeof MODIFY_NOTE;
    note: Partial<INote>;
}

export interface IDeleteNote {
    type: typeof DELETE_NOTE;
    id: string
}

export interface ISetSearchTerm {
    type: typeof SET_SEARCH_TERM;
    searchTerm: string
}