import { saveQuestionAnswer } from "../utils/api";

export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const VOTE_QUESTION = "VOTE_QUESTION";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

function voteQuestion({ authedUser, qid, answer }) {
    return {
        type: VOTE_QUESTION,
        authedUser,
        qid,
        answer,
    };
}

export function handleVoteQuestion(props) {
    return (dispatch) => {
        // optimistic update
        dispatch(voteQuestion(props));

        return saveQuestionAnswer(props)
            .catch((err) => {
                console.warn("Error in handleVoteQuestion: ", err);
                dispatch(voteQuestion(props));

                alert("There was an error voting this question. Try again.");
            });
    };
}