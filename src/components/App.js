import "../css/App.css";
import { useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
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


const App = ({ dispatch, loading }) => {
    useEffect(() => {
        dispatch(handleInitialData());
    }, []);

    return (
        <Fragment>
            <LoadingBar />
            <Container>
                <NavBar />
                {
                    loading === true ? null : (
                        <Routes>
                            <Route exact path="/" element={ <Dashboard /> } />
                            <Route path="/leaderboard" element={ <Leaderboard /> } />
                            <Route path="/question/:id" element={ <QuestionPage /> } />
                            <Route path="/new" element={ <NewQuestion /> } />
                        </Routes>
                    )
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
});

export default connect(mapStateToProps)(App);
