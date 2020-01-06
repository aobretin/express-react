import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "ts-log-debug";
import {Note, NoteModel} from "../../models/notes/Note";

@Service()
export class NotesService {
    @Inject(NoteModel)
    private Note: MongooseModel<NoteModel>;

    async getAllNotes(query: Partial<NoteModel> | null): Promise<NoteModel[] | NoteModel> {
        $log.debug("Fetching one or all notes");
        return this.Note.find(query).exec();
    }

    async saveNote(note: NoteModel): Promise<NoteModel> {
        $log.debug("Saving note", note);

        const newNote = new this.Note(note);
        await newNote.save();

        return newNote;
    }

    async modifyNote(id: string, note: Note): Promise<NoteModel> {
        $log.debug("Modifying note with id", id);
        return await this.Note.findOneAndUpdate(id, note).exec();
    }

    async removeNote(id: string): Promise<NoteModel> {
        $log.debug("Removing note with id", id);
        return await this.Note.findByIdAndDelete(id).exec();
    }
}