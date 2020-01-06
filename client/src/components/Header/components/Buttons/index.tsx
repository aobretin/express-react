import React from 'react';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const Buttons: React.FC = () => {
    return (
        <React.Fragment>
            <Fab size="small">
                <AddIcon />
            </Fab>
        </React.Fragment>
    );
}

export default Buttons;
