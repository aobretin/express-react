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

                <Route path="/note/:id?/:edit?" render={props => {
                    // this is for reloading the component when only query params
                    // change but location stays the same, for preview -> edit
                    const {
                        match: {
                            params: { id, edit }
                        }
                    } = props;

                    return <NoteDetails key={`${id}+${edit}`} />
                }} />
            </Route>
        </Switch>
    )
}