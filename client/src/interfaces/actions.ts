import {ADD_NOTE, ADD_NOTES, MODIFY_NOTE, DELETE_NOTE} from "../constants";
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