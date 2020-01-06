import React from "react";
import {
  Switch,
  Route
} from "react-router-dom";

import Notes from "../Notes";

export default (): JSX.Element => {
    return (
        <Switch>
            <Route>
                <Route path="/" exact>
                    <Notes />
                </Route>

                {/* <Route path="/:id" exact>
                    
                </Route> */}
            </Route>
        </Switch>
    )
}