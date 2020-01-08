import React from "react";
import { render } from "@testing-library/react";
import {Provider} from "react-redux";
import {createStore} from "redux";
import configureMockStore from 'redux-mock-store'
import thunk from 'redux-thunk';
import Header from '../../components/Header';
import reducers from "../../reducers";

import { BrowserRouter as Router } from "react-router-dom";

const mockStore = configureMockStore([thunk]);

describe("<Header />", () => {
    it("renders without crashing", () => {
        render(
            <Provider store={createStore(reducers)}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );
    });

    it("renders a search bar if notes are available", () => {
        const store = mockStore({
            notes: [{key: 1}]
        });

        const {getByTestId} = render(
            <Provider store={store}>
                <Router>
                    <Header />
                </Router>
            </Provider>
        );

        expect(getByTestId("filter-bar")).not.toBe(null);
    });
});
