export const RECEIVIE_USERS = "RECEIVIE_USERS";
export const SAVE_QUESTION = "SAVE_QUESTION";
export const SAVE_ANSWER = "SAVE_ANSWER";

export function receiveUsers(users) {
    return {
        type: RECEIVIE_USERS,
        users,
    };
}

export function saveQuestionToUsers({ qid, author }) {
    return {
        type: SAVE_QUESTION,
        qid,
        author,
    };
}

export function saveAnswer({ authedUser, qid, answer }) {
    return {
        type: SAVE_ANSWER,
        authedUser,
        qid,
        answer,
    };
}