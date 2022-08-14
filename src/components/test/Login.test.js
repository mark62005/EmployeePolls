import {
    fireEvent,
    render,
    screen,
} from "@testing-library/react";
import thunk from "redux-thunk";
import reducer from "../../reducers";
import { configureStore } from "@reduxjs/toolkit";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import Login from "../Login";

describe("Login", () => {
    var mockStore;

    beforeEach(() => {
        mockStore = configureStore({ reducer, middleware: [ thunk ] });
    });

    it("will match the snapshot", () => {
        var view = render(
            <MemoryRouter>
                <Provider store={ mockStore }>
                    <Login />
                </Provider>
            </MemoryRouter>
        );

        expect(view).toMatchSnapshot();
    });

    it("will display a login form with user id select and a sign in button", async () => {
        render(
            <MemoryRouter>
                <Provider store={ mockStore }>
                    <Login />
                </Provider>
            </MemoryRouter>
        );

        var idSelect = screen.getByTestId("user-id-select");
        var signInButton = screen.getByTestId("sign-in-button");

        expect(idSelect).toBeInTheDocument();
        expect(signInButton).toBeInTheDocument();
    });

    it("will not display the login form if sign in is successful", async () => {
        var view = render(
            <MemoryRouter>
                <Provider store={ mockStore }>
                    <Login />
                </Provider>
            </MemoryRouter>
        );

        var idSelect = screen.getByTestId("user-id-select");
        fireEvent.change(idSelect, { target: { value: "sarahedo" } });
        var signInButton = screen.getByTestId("sign-in-button");
        fireEvent.click(signInButton);

        view.rerender();
        expect(idSelect).not.toBeInTheDocument();
        expect(signInButton).not.toBeInTheDocument();
    });

    // it("will display a login form with id input, passsword input and a sign in button", async () => {
    //     render(
    //         <MemoryRouter>
    //             <Provider store={ mockStore }>
    //                 <Login />
    //             </Provider>
    //         </MemoryRouter>
    //     );

    //     var idInput = screen.getByTestId("id-input");
    //     var passwordInput = screen.getByTestId("password-input");
    //     var signInButton = screen.getByTestId("sign-in-button");
    //     var errorAlert = screen.queryByTestId("error-message");

    //     expect(idInput).toBeInTheDocument();
    //     expect(passwordInput).toBeInTheDocument();
    //     expect(signInButton).toBeInTheDocument();
    //     expect(errorAlert).toBeNull();
    // });

    // it("will display an error message if user id does not exist", async () => {
    //     render(
    //         <MemoryRouter>
    //             <Provider store={ mockStore }>
    //                 <Login />
    //             </Provider>
    //         </MemoryRouter>
    //     );

    //     var idInput = screen.getByTestId("id-input");
    //     fireEvent.change(idInput, { target: { value: "id" } });

    //     var passwordInput = screen.getByTestId("password-input");
    //     fireEvent.change(passwordInput, { target: { value: "password" } });

    //     var signInButton = screen.getByTestId("sign-in-button");
    //     fireEvent.click(signInButton);

    //     var errorAlert = screen.getByText("Error. User ID doesn't exist.");

    //     expect(idInput).toBeInTheDocument();
    //     expect(passwordInput).toBeInTheDocument();
    //     expect(signInButton).toBeInTheDocument();
    //     expect(errorAlert).toBeInTheDocument();
    // });
});