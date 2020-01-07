import React, {useState, useEffect, KeyboardEvent, ChangeEvent} from 'react';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import { Link, useHistory, useParams } from "react-router-dom";

import useNotes from "../../reduxHooks/useNotes";
import {INote} from "../../interfaces";

import {
    CardStyles, 
    NoteDetailsHolderStyles,
    InputStyles,
    ChipNoteStyles
} from "./styles";

interface INoteDetailsState extends Partial<INote> {
    tag: string,
    edit: boolean,
    noteId: string | null
}

const NoteDetails: React.FC = () => {
    const { id, edit } = useParams();
    const history = useHistory();
    const {addNoteHandler, getNoteHandler, modifyNoteHandler} = useNotes();

    const [noteDetailsProps, setNoteDetailsProps] = useState<INoteDetailsState>({
        title: "",
        description: "",
        tag: "",
        noteId: null,
        edit: false,
        tags: []
    });

    useEffect(() => {
        if (id) {
            getNoteHandler(id).then(res => {
                const note = res.data[0];

                setNoteDetailsProps({
                    ...noteDetailsProps,
                    noteId: note.id,
                    title: note.title,
                    description: note.description,
                    tags: note.tags,
                    edit: edit === "edit"
                });
            });
        }
    }, [])

    const onInputChange = (event: ChangeEvent<{ value: unknown, name: string }>): void => {
        setNoteDetailsProps({
            ...noteDetailsProps,
            [event.target.name]: event.target.value as string
        });
    }

    const addTag = (event: KeyboardEvent): void => {
        const currentTags = noteDetailsProps.tags;
        const tagValue = noteDetailsProps.tag;

        if (
            event.key === "Enter" && 
            currentTags && 
            !currentTags.includes(tagValue) && 
            tagValue.length > 1
        ) {
            const currentTagsClone = [...currentTags];
            currentTagsClone.push(tagValue);

            setNoteDetailsProps({
                ...noteDetailsProps,
                tag: "",
                tags: Object.assign([], currentTags, currentTagsClone)
            });
        }
    };

    const removeTag = (toDeleteTag: string): void => {
        if (!noteDetailsProps.tags) return;

        const toDeleteTagIndex = noteDetailsProps.tags.findIndex(tag => tag === toDeleteTag);
        const currentTagsClone = [...noteDetailsProps.tags];
        currentTagsClone.splice(toDeleteTagIndex, 1);

        setNoteDetailsProps({
            ...noteDetailsProps,
            tags: Object.assign([], currentTagsClone)
        });
    };

    const saveNote = (): void => {
        const {
            title = "",
            description = "",
            tags = []
        } = noteDetailsProps

        const toSendNote = {
            id: "",
            title,
            description,
            tags
        }
        
        addNoteHandler(toSendNote).then(_ => {
            history.push("/");
        });
    }

    const renderCorrectSaveButton = (): JSX.Element | null => {
        let button = null;
        const isDisabled = !noteDetailsProps.title || !noteDetailsProps.description || !noteDetailsProps.tags || !noteDetailsProps.tags.length;

        if (noteDetailsProps.noteId && noteDetailsProps.edit) {
            button = <Button 
                        disabled={isDisabled}
                        variant="contained" 
                        color="primary" 
                        size="small"
                    >
                        Modify note
                    </Button>;
            
        } else {
            button = <Button 
                        disabled={isDisabled}
                        variant="contained" 
                        color="primary" 
                        size="small"
                        onClick={saveNote}
                    >
                        Save note
                    </Button>;
        }

        return button;
    };

    return (
        <NoteDetailsHolderStyles>
            <CardStyles variant="outlined">
                <CardContent>
                <Typography variant="h5" component="h2">
                    Card Details
                </Typography>
                    <InputStyles
                        name="title"
                        value={noteDetailsProps.title}
                        onChange={onInputChange}
                        placeholder="Note title..."
                    />

                    <InputStyles
                        name="description"
                        value={noteDetailsProps.description}
                        onChange={onInputChange}
                        placeholder="Note description..."
                    />

                    <InputStyles
                        name="tag"
                        value={noteDetailsProps.tag}
                        onChange={onInputChange}
                        onKeyPress={addTag}
                        placeholder="Note tag..."
                    />
                    {noteDetailsProps.tags && noteDetailsProps.tags.map((tag, i) => (
                        <ChipNoteStyles 
                            onDelete={() => removeTag(tag)} 
                            variant="outlined" 
                            key={i} 
                            label={tag} 
                        />
                    ))}
                </CardContent>
                <Divider />
                <CardActions>
                    <Link to="/">
                        <Button size="small">
                            Back to notes
                        </Button>
                    </Link>

                    {renderCorrectSaveButton()}
                </CardActions>
            </CardStyles>
        </NoteDetailsHolderStyles>
    );
}

export default NoteDetails;
