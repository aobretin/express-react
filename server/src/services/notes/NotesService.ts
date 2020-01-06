import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "ts-log-debug";
import {Note} from "../../models/notes/Note";

@Service()
export class NotesService {
    @Inject(Note)
    private Note: MongooseModel<Note>;

    async getAllNotes(query: Partial<Note> | null): Promise<Note[] | Note> {
        $log.debug("Fetching one or all notes");
        return this.Note.find(query).exec();
    }

    async saveNote(note: Note): Promise<Note> {
        $log.debug("Saving note", note);

        const newNote = new this.Note(note);
        await newNote.save();

        return newNote;
    }

    async modifyNote(id: string, note: Note): Promise<Note> {
        $log.debug("Modifying note with id", id);
        return await this.Note.findOneAndUpdate(id, note).exec();
    }

    async removeNote(id: string): Promise<Note> {
        $log.debug("Removing note with id", id);
        return await this.Note.findByIdAndDelete(id).exec();
    }
}