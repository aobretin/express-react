import {combineReducers} from "redux";
import {notes} from "./notes";
import {searchTerm} from "./searchTerm";
import {IState} from "../interfaces";

export default combineReducers<IState>({
    notes,
    searchTerm
});