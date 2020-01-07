import React, {useState, ChangeEvent} from 'react';
import {FilterBarStyles} from "./styles";
import useSearchTerm from "../../../../reduxHooks/useSearchTerm"

const FilterBar: React.FC = () => {
    const [filter, setFilter] = useState<string>('');
    const {setSearchTermHandler} = useSearchTerm();

    const onFilterChange = (event: ChangeEvent<{ value: unknown }>): void => {
        const searchTerm = event.target.value as string;

        setFilter(searchTerm);
        setSearchTermHandler(searchTerm);
    }

    return (
        <FilterBarStyles
            value={filter}
            onChange={onFilterChange}
            placeholder="Filter notes by tag..."
            inputProps={{ 'aria-label': 'search' }}
        />
    );
}

export default FilterBar;
