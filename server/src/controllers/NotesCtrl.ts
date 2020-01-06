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
import {Note} from "../models/notes/Note";

@Controller("/notes")
export class CalendarCtrl {
    constructor(private notesService: NotesService) {

    }

    @Get()
    @Get("/:id")
    @Status(200, {description: "Success", type: Note, collectionType: Array})
    async getAllNotes(@PathParams("id") id: string): Promise<Note[] | Note> {
        const query = id ? {_id: id} : null;
        return this.notesService.getAllNotes(query);
    }

    @Post()
    @Status(201, {description: "Created", type: Note})
    async saveNote(@BodyParams() note: Note): Promise<Note> {
        return this.notesService.saveNote(note);
    }

    @Put("/:id")
    @Status(200, {description: "Success", type: Note})
    async modifyNote(@PathParams("id") @Required() id: string, @BodyParams() note: Note): Promise<Note> {
        return this.notesService.modifyNote(id, note);
    }

    @Delete("/:id")
    @Status(204, {description: "No content"})
    async removeNote(@PathParams("id") @Required() id: string): Promise<void> {
        await this.notesService.removeNote(id);
    }
}