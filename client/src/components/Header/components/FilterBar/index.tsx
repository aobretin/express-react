import React, {useState, ChangeEvent} from 'react';
import {FilterBarStyles} from "./styles";

const FilterBar: React.FC = () => {
    const [filter, setFilter] = useState<string>('');

    const onFilterChange = (event: ChangeEvent<{ value: unknown }>): void => {
        setFilter(event.target.value as string);
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
