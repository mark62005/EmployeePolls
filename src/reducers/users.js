import { RECEIVIE_USERS, SAVE_QUESTION, SAVE_ANSWER } from "../actions/users";

export default function users(state = {}, action) {
    switch (action.type) {
        case RECEIVIE_USERS:
            return {
                ...state,
                ...action.users,
            };
        case SAVE_QUESTION:
            return {
                ...state,
                [ action.author ]: {
                    ...state[ action.author ],
                    questions: state[ action.author ].questions.concat(action.qid),
                },
            };
        case SAVE_ANSWER:
            return {
                ...state,
                [ action.authedUser ]: {
                    ...state[ action.authedUser ],
                    answers: {
                        ...state[ action.authedUser ].answers,
                        [ action.qid ]: action.answer,
                    },
                },
            };
        default:
            return state;
    }
}