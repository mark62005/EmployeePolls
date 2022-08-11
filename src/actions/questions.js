export const RECEIVE_QUESTIONS = "RECEIVE_QUESTIONS";
export const SAVE_VOTE = "SAVE_VOTE";

export function receiveQuestions(questions) {
    return {
        type: RECEIVE_QUESTIONS,
        questions,
    };
}

export function saveVote({ authedUser, qid, answer }) {
    return {
        type: SAVE_VOTE,
        authedUser,
        qid,
        answer,
    };
}