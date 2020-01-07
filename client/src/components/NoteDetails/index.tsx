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
    isPreview: boolean
}

const NoteDetails: React.FC = () => {
    const { id, edit } = useParams();
    const history = useHistory();
    const {
        addNoteHandler, 
        getNoteHandler, 
        modifyNoteHandler,
        deleteNoteHandler
    } = useNotes();

    const [noteDetailsProps, setNoteDetailsProps] = useState<INoteDetailsState>({
        title: "",
        description: "",
        tag: "",
        tags: [],
        isPreview: !!id && !edit
    });
    const idForDelete = id || ""; // to bypass typescript think id can be undefined

    useEffect(() => {
        if (id) {
            getNoteHandler(id).then(res => {
                const {data: note} = res;

                setNoteDetailsProps({
                    ...noteDetailsProps,
                    id: note.id,
                    title: note.title,
                    description: note.description,
                    tags: note.tags
                });
            }).catch(e => new Error(e));
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
            id = "",
            title = "",
            description = "",
            tags = []
        } = noteDetailsProps

        const toSendNote = {
            id,
            title,
            description,
            tags
        }

        const actionToTake = edit ? modifyNoteHandler : addNoteHandler;

        actionToTake(toSendNote).then(_ => history.push("/"));
    }

    const deleteNote = (id: string): void => {
        deleteNoteHandler(id).then(_ => history.push("/"));
    }

    return (
        <NoteDetailsHolderStyles>
            <CardStyles variant="outlined">
                <CardContent>
                <Typography variant="h5" component="h2">
                    Note Details
                </Typography>
                    <InputStyles
                        name="title"
                        disabled={noteDetailsProps.isPreview}
                        value={noteDetailsProps.title}
                        onChange={onInputChange}
                        placeholder="Note title..."
                    />

                    <InputStyles
                        name="description"
                        disabled={noteDetailsProps.isPreview}
                        value={noteDetailsProps.description}
                        onChange={onInputChange}
                        placeholder="Note description..."
                    />

                    <InputStyles
                        name="tag"
                        disabled={noteDetailsProps.isPreview}
                        value={noteDetailsProps.tag}
                        onChange={onInputChange}
                        onKeyPress={addTag}
                        placeholder="Note tag..."
                    />

                    {noteDetailsProps.tags && noteDetailsProps.tags.map((tag, i) => (
                        <ChipNoteStyles 
                            disabled={noteDetailsProps.isPreview}
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

                    {(!id || edit) && <Button 
                        disabled={
                            !noteDetailsProps.title || 
                            !noteDetailsProps.description || 
                            !noteDetailsProps.tags || 
                            !noteDetailsProps.tags.length
                        }
                        variant="contained" 
                        color="primary" 
                        size="small"
                        onClick={saveNote}
                    >
                        Save
                    </Button>}

                    {noteDetailsProps.isPreview && <React.Fragment>
                        <Link to={`/note/${id}/edit`}>
                            <Button 
                                variant="contained" 
                                color="primary" 
                                size="small"
                            >
                                Edit
                            </Button>
                        </Link> 

                        <Button 
                            variant="contained" 
                            color="secondary" 
                            size="small"
                            onClick={() => deleteNote(idForDelete)}
                        >
                            Delete
                        </Button>
                    </React.Fragment>}
                </CardActions>
            </CardStyles>
        </NoteDetailsHolderStyles>
    );
}

export default NoteDetails;
