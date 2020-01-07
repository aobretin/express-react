import {
    Controller, 
    Get, 
    Post, 
    Put, 
    Status, 
    BodyParams, 
    PathParams, 
    Required,
    Delete
} from "@tsed/common";
import {NotesService} from "../services/notes/NotesService";
import {Note, NoteModel} from "../models/notes/Note";

@Controller("/notes")
export class NotesCtrl {
    constructor(private notesService: NotesService) {

    }

    @Get()
    @Status(200, {description: "Success", type: Note, collectionType: Array})
    async getAllNotes(): Promise<Note[]> {
        return this.notesService.getAllNotes();
    }

    @Get("/:id")
    @Status(200, {description: "Success", type: Note})
    async getNote(@PathParams("id") id?: string): Promise<Note> {
        return this.notesService.getNote(id);
    }

    @Post()
    @Status(201, {description: "Created", type: Note})
    async saveNote(@BodyParams() note: NoteModel): Promise<Note> {
        return this.notesService.saveNote(note);
    }

    @Put("/:id")
    @Status(200, {description: "Success", type: Note})
    async modifyNote(@PathParams("id") @Required() id: string, @BodyParams() note: Partial<Note>): Promise<Note> {
        return this.notesService.modifyNote(id, note);
    }

    @Delete("/:id")
    @Status(204, {description: "No content"})
    async removeNote(@PathParams("id") @Required() id: string): Promise<void> {
        await this.notesService.removeNote(id);
    }
}