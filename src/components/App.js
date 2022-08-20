import "../css/App.css";
import { useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
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

const App = ({ dispatch, loading, authedUser }) => {
    useEffect(() => {
        if (authedUser === null) {
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
                                authedUser === null
                                    ? <Navigate replace to="/login" />
                                    : <Dashboard />
                            }
                        >
                        </Route>
                        <Route path="/leaderboard" element={ <Leaderboard /> } />
                        <Route path="/questions/:id" element={ <QuestionPage /> } />
                        <Route path="/add" element={ <NewQuestion /> } />
                        <Route
                            path="/login"
                            element={
                                authedUser === null
                                    ? <Login />
                                    : <Navigate replace to="/" />
                            }
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
