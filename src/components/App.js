import "../css/App.css";
import { useEffect, Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import NewQuestion from "./NewQuestion";
import Leaderboard from "./Leaderboard";
import NavBar from "./NavBar";
import Container from "react-bootstrap/Container";
import Login from "./Login";
import NotFound from "./NotFound";

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
                        <Route path="/question/:id" element={ <QuestionPage /> } />
                        <Route path="/new" element={ <NewQuestion /> } />
                        <Route path="/login" element={ <Login /> } />

                        <Route path="*" element={ <NotFound /> } />
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
