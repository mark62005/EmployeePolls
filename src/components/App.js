import { useEffect, Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import QuestionPage from "./QuestionPage";
import Nav from "./Nav";

const App = ({ dispatch, loading }) => {
    useEffect(() => {
        dispatch(handleInitialData());
    }, [ dispatch ]);

    return (
        <Fragment>
            <LoadingBar />
            <div className="container">
                <Nav />
                {
                    loading === true ? null : (
                        <Routes>
                            <Route exact path="/" element={ <Dashboard /> } />
                            <Route path="/question/:id" element={ <QuestionPage /> } />
                        </Routes>
                    )
                }
            </div>
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
