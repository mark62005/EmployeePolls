export const RECEIVIE_USERS = "RECEIVIE_USERS";
export const SAVE_ANSWER = "SAVE_ANSWER";

export function receiveUsers(users) {
    return {
        type: RECEIVIE_USERS,
        users,
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