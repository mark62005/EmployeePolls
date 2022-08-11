import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, saveAnswer } from "./users";
import { receiveQuestions, saveVote } from "./questions";
import { setAuthedUser } from "./authedUser";

const AUTHED_ID = "mtsamis";
export const VOTE_QUESTION = "VOTE_QUESTION";

export function handleInitialData() {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));
                dispatch(setAuthedUser(AUTHED_ID));
                dispatch(hideLoading());
            });
    };
}

export function handleVoteQuestion(props) {
    return (dispatch) => {
        // optimistic update
        dispatch(saveAnswer(props));
        dispatch(saveVote(props));

        return saveQuestionAnswer(props)
            .catch((err) => {
                console.warn("Error in handleVoteQuestion: ", err);
                dispatch(saveAnswer(props));
                dispatch(saveVote(props));

                alert("There was an error voting this question. Try again.");
            });
    };
}