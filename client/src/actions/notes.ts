import {INote, IAddNotes} from "../interfaces";
import {ADD_NOTES} from "../constants";

export const addNotes = (notes: INote[]): IAddNotes => {
    return {
        notes,
        type: ADD_NOTES
    };
}