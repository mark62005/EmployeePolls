import "../css/App.css";
import { useEffect, Fragment } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import { PAGE_NOT_FOUND } from "../utils/helpers";
import Dashboard from "./pages/Dashboard";
import QuestionPage from "./pages/QuestionPage";
import NewQuestion from "./pages/NewQuestion";
import Leaderboard from "./pages/Leaderboard";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";

const RequireAuth = ({ children, authedUser }) => {
    const location = useLocation();

    return authedUser !== null
        ? children
        : (
            <Navigate
                to="/login"
                replace
                state={ { path: location.pathname } }
            />
        );
};

const App = ({ dispatch, loading, authedUser }) => {
    useEffect(() => {
        if (authedUser === false) {
            dispatch(handleInitialData());
        } else {
            dispatch(handleInitialData(true, authedUser));
        }
    }, [ authedUser, dispatch ]);

    return (
        <Fragment>
            <LoadingBar />
            <Container>
                <NavBar />
                {
                    <Routes>
                        <Route
                            exact
                            path="/"
                            element={
                                <RequireAuth authedUser={ authedUser }>
                                    <Dashboard />
                                </RequireAuth>
                            }
                        >
                        </Route>
                        <Route
                            path="/leaderboard"
                            element={
                                <RequireAuth authedUser={ authedUser }>
                                    <Leaderboard />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/questions/:id"
                            element={
                                <RequireAuth authedUser={ authedUser }>
                                    <QuestionPage />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/add"
                            element={
                                <RequireAuth authedUser={ authedUser }>
                                    <NewQuestion />
                                </RequireAuth>
                            }
                        />
                        <Route
                            path="/login"
                            element={ <Login /> }
                        />

                        <Route path="*" element={ <NotFound type={ PAGE_NOT_FOUND } /> } />
                    </Routes>
                }
            </Container>
        </Fragment>
    );
};

App.propTypes = {
    dispatch: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
};

const mapStateToProps = ({ authedUser }) => ({
    loading: authedUser === null,
    authedUser,
});

export default connect(mapStateToProps)(App);
