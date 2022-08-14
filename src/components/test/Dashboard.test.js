import { render } from "@testing-library/react";
import thunk from "redux-thunk";
import reducer from "../../reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Dashboard from "../Dashboard";

describe("Dashboard", () => {
    var mockStore = configureStore({ reducer, middleware: [ thunk ] });

    it("will match the snapshot", () => {
        var view = render(
            <MemoryRouter>
                <Provider store={ mockStore }>
                    <Dashboard />
                </Provider>
            </MemoryRouter>
        );

        expect(view).toMatchSnapshot();
    });
});