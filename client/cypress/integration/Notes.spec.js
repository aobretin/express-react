/// <reference types="Cypress" />

context('Notes App', () => {
    const SELECTORS = {
        ADD_NOTE_BTN: "[data-testid='add-note']",
        FILTER_BAR: "[data-testid='filter-bar']",
        TITLE_INPUT: "[data-testid='title'] input",
        DESCRIPTION_INPUT: "[data-testid='description'] input",
        TAG_INPUT: "[data-testid='tag'] input",
        NOTE_TAG_CHIP: "[data-testid='note-tag-chip']",
        NOTES_LIST: "[data-testid='notes-list']",
        NOTE: "[data-testid='note']",
        SAVE_NOTE_BTN: "[data-testid='save-note']",
        NOTE_PREVIEW_BTN: "[data-testid='preview-note']",
        NOTE_EDIT_BTN: "[data-testid='edit-note']",
        NOTE_DELETE_BTN: "[data-testid='delete-note']",
        NO_RESULTS_TITLE: "[data-testid='no-results']"
    }

    const VALUES = {
        TITLE: "COOL NOTE",
        DESCRIPTION: "cool description",
        TAG: "another tag"
    }

    const PATHS = {
        BASE: "/",
        NOTE: "note"
    }

    before(() => {
        cy.visit(PATHS.BASE);
    });

    describe("When the user lands on the app he", () => {
        it("should have an add notes and click it", () => {
            const addNoteBtn = cy.get(SELECTORS.ADD_NOTE_BTN);
            addNoteBtn.should("be.visible");
            addNoteBtn.click();
            cy.location('pathname').should('include', PATHS.NOTE);
        });
    });

    describe("When the user lands on the add notes page he", () => {
        it("should have a title, description, and tags fields and disabled save", () => {
            cy.get(SELECTORS.TITLE_INPUT).should("be.visible");
            cy.get(SELECTORS.DESCRIPTION_INPUT).should("be.visible");
            cy.get(SELECTORS.TAG_INPUT).should("be.visible");
            cy.get(SELECTORS.SAVE_NOTE_BTN).should("be.visible").should("be.disabled");
        });

        it("should complete data for required fields and save", () => {
            cy.get(SELECTORS.TITLE_INPUT).type(VALUES.TITLE).should("have.value", VALUES.TITLE);
            cy.get(SELECTORS.DESCRIPTION_INPUT).type(VALUES.DESCRIPTION).should("have.value", VALUES.DESCRIPTION);
            cy.get(SELECTORS.TAG_INPUT).type(VALUES.TAG).should("have.value", VALUES.TAG);
        });

        it("should be able to add the selected tag and see the tag", () => {
            cy.get(SELECTORS.TAG_INPUT).type("{enter}");
            cy.get(SELECTORS.NOTE_TAG_CHIP).should("have.length.greaterThan", 0);
        });

        it("should be able to save and be returned to the landing page with the note aded", () => {
            cy.get(SELECTORS.SAVE_NOTE_BTN).click();
            cy.location('pathname').should('not.include', PATHS.NOTE);
            cy.get(SELECTORS.NOTES_LIST).children().last().contains(VALUES.TITLE);
        });
    });

    describe("When the user has added a new note he", () => {
        it("should be able to filter it", () => {
            cy.get(SELECTORS.FILTER_BAR).type("will not yield anything");
            cy.get(SELECTORS.NOTES_LIST).children(SELECTORS.NOTE).should("have.length", 0);
            cy.get(SELECTORS.FILTER_BAR).find("input").clear();
            cy.get(SELECTORS.NOTES_LIST).children().should("have.length.greaterThan", 0);
        });

        it("should be able to preview it and not be able to edit", () => {
            cy.get(SELECTORS.NOTES_LIST).children().last().invoke("attr", "data-test_id").then(id => {
                cy.get(SELECTORS.NOTES_LIST).children().last().find(SELECTORS.NOTE_PREVIEW_BTN).click();
                cy.location('pathname').should('include', `${PATHS.NOTE}/${id}`);
                cy.get(SELECTORS.TITLE_INPUT).should("be.disabled");
                cy.visit(PATHS.BASE);
            });

        });

        it("should be able to edit", () => {
            cy.get(SELECTORS.NOTES_LIST).children().last().invoke("attr", "data-test_id").then(id => {
                cy.get(SELECTORS.NOTES_LIST).children().last().find(SELECTORS.NOTE_EDIT_BTN).click();
                cy.location('pathname').should('include', `${PATHS.NOTE}/${id}/edit`);
                cy.get(SELECTORS.TITLE_INPUT).type(` ${VALUES.TITLE}`).should("have.value", `${VALUES.TITLE} ${VALUES.TITLE}`);
                cy.get(SELECTORS.SAVE_NOTE_BTN).click();
                cy.get(SELECTORS.NOTES_LIST).children().last().contains(`${VALUES.TITLE} ${VALUES.TITLE}`);
            });
        });

        it("should be able to delete his notes", () => {
            cy.get(SELECTORS.NOTE).its("length").then(initialLength => {
                cy.get(SELECTORS.NOTES_LIST).children().find(SELECTORS.NOTE_DELETE_BTN).last().click();
                cy.get('body').then($body => {
                    if ($body.find(SELECTORS.NOTE)) {
                        cy.get(SELECTORS.NOTE).should("have.length.lessThan", initialLength);
                    } else {
                        cy.get(SELECTORS.NO_RESULTS_TITLE).should('be.visible');
                    }
                });
            });
        });
    });
});
