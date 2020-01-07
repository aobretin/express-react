import {Inject, Service} from "@tsed/common";
import {MongooseModel} from "@tsed/mongoose";
import {$log} from "ts-log-debug";
import {Note, NoteModel} from "../../models/notes/Note";

@Service()
export class NotesService {
    @Inject(NoteModel)
    private Note: MongooseModel<NoteModel>;

    async getAllNotes(): Promise<NoteModel[]> {
        $log.debug("Fetching all notes");
        return this.Note.find({}).exec();
    }

    async getNote(id: string): Promise<NoteModel> {
        $log.debug("Fetching note with id", id);
        return this.Note.findById(id).exec();
    }

    async saveNote(note: NoteModel): Promise<NoteModel> {
        console.log(note);
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