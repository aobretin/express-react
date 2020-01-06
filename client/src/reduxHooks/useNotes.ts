import {useDispatch, useSelector} from "react-redux";

import {addNotes} from "../actions";
import {INote, IState, IAddNotes} from "../interfaces";

interface IUseNotes {
    notes: INote[];
    addNotesHandler: (notes: INote[]) => IAddNotes;
}

const useNotes = (): IUseNotes => {
    const notes = useSelector((state: IState) => state.notes);
    const dispatch = useDispatch();

    const addNotesHandler = (notes: INote[]): IAddNotes => dispatch(addNotes(notes));

    return {
        notes,
        addNotesHandler
    }
}

export default useNotes;


