import {useDispatch, useSelector} from "react-redux";
import axios, {AxiosResponse} from "axios";

import {addNotes, modifyNote, deleteNote, addNote} from "../actions";
import {INote, IState} from "../interfaces";

import {formatNoteForRequest} from "../helpers";

import {ENDPOINTS} from "../constants";

interface IUseNotes {
    notes: INote[];
    getNoteHandler: (id: string) => Promise<AxiosResponse>;
    getNotesHandler: () => void;
    addNoteHandler: (note: INote) => Promise<AxiosResponse>;
    modifyNoteHandler: (note: Partial<INote>) => Promise<AxiosResponse>;
    deleteNoteHandler: (id: string) => void;
}

const useNotes = (): IUseNotes => {
    const notes = useSelector((state: IState) => state.notes);
    const dispatch = useDispatch();

    const getNoteHandler = (id: string): Promise<AxiosResponse> => {
        return axios.get(ENDPOINTS.GET_NOTE.replace(":id", id))
    };

    const getNotesHandler = (): void => {
        axios.get(ENDPOINTS.GET_NOTES).then(res => {
            const {data: notes} = res;
            dispatch(addNotes(notes));
        });
    };

    const addNoteHandler = (note: INote): Promise<AxiosResponse> => {
        return axios.post(ENDPOINTS.CREATE_NOTE, formatNoteForRequest(note)).then(res => {
            const {data: newNote} = res;
            dispatch(addNote(newNote));
            return res;
        });
    };

    const modifyNoteHandler = (note: Partial<INote>): Promise<AxiosResponse> => {
        return axios.post(ENDPOINTS.CREATE_NOTE, note).then(res => {
            const {data: modifiedNote} = res;
            dispatch(modifyNote(modifiedNote));
            return res;
        });
    };

    const deleteNoteHandler = (id: string): void => {
        axios.delete(ENDPOINTS.DELETE_NOTE.replace(":id", id)).then(_ => {
            dispatch(deleteNote(id));
        });
    };

    return {
        notes,
        getNoteHandler,
        addNoteHandler,
        getNotesHandler,
        modifyNoteHandler,
        deleteNoteHandler
    }
}

export default useNotes;


