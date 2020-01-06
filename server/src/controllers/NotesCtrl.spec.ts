import {TestContext} from "@tsed/testing";
import {expect} from "chai";
import * as Sinon from "sinon";
import {NotFound, VariantAlsoNegotiates} from "ts-httpexceptions";
import {NoteModel} from "../models/notes/Note";
import {NotesService} from "../services/notes/NotesService";
import {NotesCtrl} from "./NotesCtrl";

describe("NotesCtrl", () => {
    beforeEach(() => TestContext.create());
    afterEach(() => TestContext.reset());

    describe("getAllNotes()", () => {
        it("should return one note if it has 'id' param", async () => {
            const note = new NoteModel();
            note._id = "id";
            note.title = "title";
            note.description = "description";
            note.tags = ["tag"];
        
            const notesService = {
                getAllNotes: Sinon.stub().resolves(note)
            };
        
            const notesCtrl: NotesCtrl = await TestContext.invoke(NotesCtrl, [{
                provide: NotesService,
                use: notesService
            }]);
        
            const result = await notesCtrl.getAllNotes("id");
            
            notesService.getAllNotes.should.be.calledWithExactly({_id: "id"});
            result.should.deep.eq(note);
        });

        it("should return all notes if 'id' param is not defined", async () => {
            const note = new NoteModel();
            note._id = "id";
            note.title = "title";
            note.description = "description";
            note.tags = ["tag"];

            const note2 = new NoteModel();
            note2._id = "id2";
            note2.title = "title2";
            note2.description = "description2";
            note2.tags = ["tag", "alex"];

            const notes = [note, note2];
        
            const notesService = {
                getAllNotes: Sinon.stub().resolves(notes)
            };
        
            const notesCtrl: NotesCtrl = await TestContext.invoke(NotesCtrl, [{
                provide: NotesService,
                use: notesService
            }]);
        
            const results = await notesCtrl.getAllNotes("id");

            expect(results).to.be.an("array");
        });
    });

    describe("saveNote()", () => {
        it("should return saved note", async () => {
            const note = new NoteModel();
            note._id = "id";
            note.title = "title";
            note.description = "description";
            note.tags = ["tag"];
        
            const notesService = {
                saveNote: Sinon.stub().resolves(note)
            };
        
            const notesCtrl: NotesCtrl = await TestContext.invoke(NotesCtrl, [{
                provide: NotesService,
                use: notesService
            }]);
        
            const result = await notesCtrl.saveNote(note);
        
            notesService.saveNote.should.be.calledWithExactly(note);
            result.should.deep.eq(note);
        });
    });

    describe("modifyNote()", () => {
        it("should return updated note", async () => {
            const note = new NoteModel();
            note._id = "id";
            note.title = "title2";
            note.description = "description";
            note.tags = ["tag"];
        
            const notesService = {
                modifyNote: Sinon.stub().resolves(note)
            };
        
            const notesCtrl: NotesCtrl = await TestContext.invoke(NotesCtrl, [{
                provide: NotesService,
                use: notesService
            }]);
        
            const result = await notesCtrl.modifyNote("id", {title: "title2"});
        
            notesService.modifyNote.should.be.calledWithExactly("id", {title: "title2" });
            result.should.deep.eq(note);
        });
    });

    describe("removeNote()", () => {
        it("should delete given note", async () => {
            const notesService = {
                removeNote: Sinon.stub().resolves()
            };
        
            const notesCtrl: NotesCtrl = await TestContext.invoke(NotesCtrl, [{
                provide: NotesService,
                use: notesService
            }]);
        
            const result = await notesCtrl.removeNote("id");
        
            notesService.removeNote.should.be.calledWithExactly("id");
            expect(result).to.eq(undefined);
        });
    });
});