export const RECEIVIE_USERS = "RECEIVIE_USERS";

export function receiveUsers(users) {
    return {
        type: RECEIVIE_USERS,
        users,
    };
}