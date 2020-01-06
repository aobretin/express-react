import React from 'react';
import useNotes from "../../reduxHooks/useNotes";
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import Chip from '@material-ui/core/Chip';
import ListItemText from '@material-ui/core/ListItemText';

const Notes: React.FC = () => {
    const {notes} = useNotes();

    return (
        <List className="notes-list">
            {notes.map(({ id, title, tags }, index) => {
                return (
                    <React.Fragment key={id}>
                        <ListItem alignItems="flex-start">
                            <ListItemText 
                                primary={title}
                            />
                            <React.Fragment>
                                {tags.map((tag, tagIndex) => {
                                    return (
                                        <Chip key={tagIndex} label={tag} />
                                    )
                                })}
                            </React.Fragment>
                        </ListItem>
                        {index !== notes.length - 1 && <Divider />}
                    </React.Fragment>
                )
            })}
        </List>

    );
}

export default Notes;
