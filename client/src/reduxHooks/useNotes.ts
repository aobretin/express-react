import {useDispatch, useSelector} from "react-redux";
import axios from "axios";

import {addNotes, deleteNote} from "../actions";
import {INote, IState} from "../interfaces";

import {ENDPOINTS} from "../constants";

interface IUseNotes {
    notes: INote[];
    addNotesHandler: () => void;
    deleteNoteHandler: (id: string) => void;
}

const useNotes = (): IUseNotes => {
    const notes = useSelector((state: IState) => state.notes);
    const dispatch = useDispatch();

    const addNotesHandler = (): void => {
        axios.get(ENDPOINTS.GET_NOTES).then(res => {
            const {data: notes} = res;
            dispatch(addNotes(notes));
        });
    };

    const deleteNoteHandler = (id: string): void => {
        axios.delete(ENDPOINTS.DELETE_NOTE.replace(":id", id)).then(_ => {
            dispatch(deleteNote(id));
        });
    };

    return {
        notes,
        addNotesHandler,
        deleteNoteHandler
    }
}

export default useNotes;


