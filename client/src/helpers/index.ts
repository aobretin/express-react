import {INote} from "../interfaces";

export const formatNoteForRequest = (note: INote) => {
    return {
        title: note.title,
        description: note.description,
        tags: note.tags
    }
};