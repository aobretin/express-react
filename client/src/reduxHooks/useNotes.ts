import {useDispatch, useSelector} from "react-redux";
import axios, {AxiosResponse, AxiosError} from "axios";

import {addNotes, modifyNote, deleteNote, addNote} from "../actions";
import {INote, IState} from "../interfaces";

import {formatNoteForRequest} from "../helpers";

import {ENDPOINTS} from "../constants";

interface IUseNotes {
    notes: INote[];
    getNoteHandler: (id: string) => Promise<AxiosResponse>;
    getNotesHandler: () => Promise<AxiosResponse | Error>;
    addNoteHandler: (note: INote) => Promise<AxiosResponse | Error>;
    modifyNoteHandler: (note: INote) => Promise<AxiosResponse | Error>;
    deleteNoteHandler: (id: string) => Promise<AxiosResponse | Error>;
}

const useNotes = (): IUseNotes => {
    const notes = useSelector((state: IState) => state.notes);
    const dispatch = useDispatch();

    const getNoteHandler = (id: string): Promise<AxiosResponse<INote>> => {
        return axios.get(ENDPOINTS.GET_NOTE.replace(":id", id));
    };

    const getNotesHandler = (): Promise<AxiosResponse | Error> => {
        return axios.get(ENDPOINTS.GET_NOTES).then(res => {
            const {data: notes} = res;
            dispatch(addNotes(notes));
            return res;
        }).catch(e => new Error(e));
    };

    const addNoteHandler = (note: INote): Promise<AxiosResponse<INote> | Error> => {
        return axios.post(ENDPOINTS.CREATE_NOTE, formatNoteForRequest(note)).then(res => {
            const {data: newNote} = res;
            dispatch(addNote(newNote));
            return res;
        }).catch(e => new Error(e));
    };

    const modifyNoteHandler = (note: INote): Promise<AxiosResponse | Error> => {
        return axios.put(ENDPOINTS.MODIFY_NOTE.replace(":id", note.id), note).then(res => {
            dispatch(modifyNote(note));
            return res;
        }).catch(e => new Error(e));
    };

    const deleteNoteHandler = (id: string): Promise<AxiosResponse | Error> => {
        return axios.delete(ENDPOINTS.DELETE_NOTE.replace(":id", id)).then(_ => {
            dispatch(deleteNote(id));
            return _;
        }).catch(e => new Error(e));
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


