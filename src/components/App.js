import { useEffect } from "react";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import LoadingBar from "react-redux-loading-bar";
import { handleInitialData } from "../actions/shared";
import Dashboard from "./Dashboard";
import QuestionCard from "./QuestionCard";

const App = ({ dispatch, loading }) => {
    useEffect(() => {
        dispatch(handleInitialData());
    }, [ dispatch ]);

    return (
        <div className="App">
            <LoadingBar />
            { loading === false ? <Dashboard /> : null }
        </div>
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
