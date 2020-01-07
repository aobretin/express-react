import {ISetSearchTerm} from "../interfaces";
import {SET_SEARCH_TERM} from "../constants";

export const setSearchTerm = (searchTerm: string): ISetSearchTerm => {
    return {
        searchTerm,
        type: SET_SEARCH_TERM
    };
}