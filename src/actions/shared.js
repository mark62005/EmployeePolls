import { showLoading, hideLoading } from "react-redux-loading-bar";
import { getInitialData, saveQuestion, saveQuestionAnswer } from "../utils/api";
import { receiveUsers, saveQuestionToUsers, saveAnswer } from "./users";
import { receiveQuestions, addQuestion, saveVote } from "./questions";
import { setAuthedUser } from "./authedUser";

export function handleInitialData(isValidated, authedId) {
    return (dispatch) => {
        dispatch(showLoading());

        return getInitialData()
            .then(({ users, questions }) => {
                dispatch(receiveUsers(users));
                dispatch(receiveQuestions(questions));

                if (isValidated === true) {
                    dispatch(setAuthedUser(authedId));
                }
                dispatch(hideLoading());
            });
    };
}

export function handleAddQuestion(optionOneText, optionTwoText) {
    return (dispatch, getState) => {
        const { authedUser } = getState();

        dispatch(showLoading());
        return saveQuestion({
            optionOneText,
            optionTwoText,
            author: authedUser,
        })
            .then((question) => {
                dispatch(addQuestion(question));
                dispatch(saveQuestionToUsers({
                    qid: question.id,
                    author: authedUser,
                }));
            })
            .then(() => dispatch(hideLoading()));
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