import {inject, TestContext} from "@tsed/testing";
import {expect} from "chai";
import {NotesService} from "./NotesService";

describe("NotesService", () => {
    before(() => TestContext.create());
    before(() => TestContext.reset());

    it("should get the service from the inject method", inject([NotesService], (notesService: NotesService) => {
        expect(notesService).to.be.an.instanceOf(NotesService);
    }));
});