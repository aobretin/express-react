import {ISetSearchTerm} from "../interfaces";
import {SET_SEARCH_TERM} from "../constants";

import {initialState} from "../store/initialState";

export const searchTerm = (state: string = initialState.searchTerm, action: ISetSearchTerm):string => {
    switch (action.type) {
        case SET_SEARCH_TERM:
            return action.searchTerm;
        default:
            return state;
    }
}