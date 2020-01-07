import {useDispatch, useSelector} from "react-redux";

import {setSearchTerm} from "../actions";
import {IState, ISetSearchTerm} from "../interfaces";

interface IUseSearchTerm {
    searchTerm: string,
    setSearchTermHandler: (searchTerm: string) => ISetSearchTerm
}

const useSearchTerm = (): IUseSearchTerm => {
    const searchTerm = useSelector((state: IState) => state.searchTerm);
    const dispatch = useDispatch();

    const setSearchTermHandler = (searchTerm: string):ISetSearchTerm => dispatch(setSearchTerm(searchTerm));
    
    return {
        searchTerm,
        setSearchTermHandler
    }
}

export default useSearchTerm;


