import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

import { Link } from "react-router-dom";

const Buttons: React.FC = () => {
    return (
        <React.Fragment>
            <Link to="/note">
                <Fab size="small">
                    <AddIcon />
                </Fab>
            </Link>
        </React.Fragment>
    );
}

export default Buttons;
