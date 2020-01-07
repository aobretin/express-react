import React from "react";
import {
    Switch,
    Route
} from "react-router-dom";

import Notes from "../Notes";
import NoteDetails from "../NoteDetails";

export default (): JSX.Element => {
    return (
        <Switch>
            <Route>
                <Route path="/" exact>
                    <Notes />
                </Route>

                <Route path="/note/:id?/:edit?">
                    <NoteDetails />
                </Route>
            </Route>
        </Switch>
    )
}