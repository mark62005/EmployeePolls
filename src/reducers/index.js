import { combineReducers } from "@reduxjs/toolkit";
import users from "./users";
import questions from "./questions";
import authedUser from "./authedUser";
import { loadingBarReducer } from "react-redux-loading-bar";

export default combineReducers({
    users,
    questions,
    authedUser,
    // https://www.npmjs.com/package/react-redux-loading-bar
    loadingBar: loadingBarReducer,
});