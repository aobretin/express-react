import {combineReducers} from "redux";
import {notes} from "./notes";
import {IState} from "../interfaces";

export default combineReducers<IState>({
    notes
});