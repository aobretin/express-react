import React from "react";
import { render } from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import App from '../../components/App';
import reducers from "../../reducers";

describe("<App />", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={createStore(reducers)}>
                <App />
            </Provider>
        );
    });
});
