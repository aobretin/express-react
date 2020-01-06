import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';

import {
    HeaderToolbarStyles,
    NotesAndFilterStyles
} from "./styles";
import Buttons from "./components/Buttons";
import FilterBar from "./components/FilterBar";

import useNotes from "../../reduxHooks/useNotes";

const Header: React.FC = () => {
    const {notes} = useNotes();

    return (
        <AppBar position="static">
            <HeaderToolbarStyles>
                <NotesAndFilterStyles>
                    <Typography variant="h6" noWrap>
                        Notes
                    </Typography>
                    {!!notes.length && <FilterBar />}
                </NotesAndFilterStyles>
                
                <Buttons />
            </HeaderToolbarStyles>
        </AppBar>
    );
}

export default Header;
