import {
    RECEIVIE_USERS,
    SAVE_QUESTION,
    SAVE_ANSWER,
} from "../../actions/users";
import users from "../users";

const mockState = {
    sarahedo: {
        id: 'sarahedo',
        password: 'password123',
        name: 'Sarah Edo',
        avatarURL: null,
        answers: {
            "8xf0y6ziyjabvozdd253nd": 'optionOne',
            "6ni6ok3ym7mf1p33lnez": 'optionOne',
            "am8ehyc8byjqgar0jgpub9": 'optionTwo',
            "loxhs1bqm25b708cmbf3g": 'optionTwo'
        },
        questions: [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9' ]
    },
};

describe("users", () => {
    it(`will return users if the action type is ${RECEIVIE_USERS}`, () => {
        var receiveUsersAction = {
            type: RECEIVIE_USERS,
            users: {
                tylermcginnis: {
                    id: 'tylermcginnis',
                    password: 'abc321',
                    name: 'Tyler McGinnis',
                    avatarURL: null,
                    answers: {
                        "vthrdm985a262al8qx3do": 'optionOne',
                        "xj352vofupe1dqz9emx13r": 'optionTwo',
                    },
                    questions: [ 'loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do' ],
                },
            }
        };

        var expectedUsers = {
            sarahedo: {
                id: 'sarahedo',
                password: 'password123',
                name: 'Sarah Edo',
                avatarURL: null,
                answers: {
                    "8xf0y6ziyjabvozdd253nd": 'optionOne',
                    "6ni6ok3ym7mf1p33lnez": 'optionOne',
                    "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                    "loxhs1bqm25b708cmbf3g": 'optionTwo'
                },
                questions: [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9' ]
            },
            tylermcginnis: {
                id: 'tylermcginnis',
                password: 'abc321',
                name: 'Tyler McGinnis',
                avatarURL: null,
                answers: {
                    "vthrdm985a262al8qx3do": 'optionOne',
                    "xj352vofupe1dqz9emx13r": 'optionTwo',
                },
                questions: [ 'loxhs1bqm25b708cmbf3g', 'vthrdm985a262al8qx3do' ],
            },
        };
        expect(users(mockState, receiveUsersAction)).toEqual(expectedUsers);
    });

    it(`will return the new state of users with the voted question added to that user if the action type is ${SAVE_QUESTION}`, () => {
        var saveQuestionToUsersAction = {
            type: SAVE_QUESTION,
            qid: "loxhs1bqm25b708cmbf3g",
            author: "sarahedo",
        };

        var expectedUsers = {
            sarahedo: {
                id: 'sarahedo',
                password: 'password123',
                name: 'Sarah Edo',
                avatarURL: null,
                answers: {
                    "8xf0y6ziyjabvozdd253nd": 'optionOne',
                    "6ni6ok3ym7mf1p33lnez": 'optionOne',
                    "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                    "loxhs1bqm25b708cmbf3g": 'optionTwo'
                },
                questions: [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9', 'loxhs1bqm25b708cmbf3g' ]
            },
        };
        expect(users(mockState, saveQuestionToUsersAction)).toEqual(expectedUsers);
    });

    it(`will return the new state of users with the answer added to that user if the action type is ${SAVE_ANSWER}`, () => {
        var saveAnswerAction = {
            type: SAVE_ANSWER,
            authedUser: "sarahedo",
            qid: "vthrdm985a262al8qx3do",
            answer: "optionOne",
        };

        var expectedUsers = {
            sarahedo: {
                id: 'sarahedo',
                password: 'password123',
                name: 'Sarah Edo',
                avatarURL: null,
                answers: {
                    "8xf0y6ziyjabvozdd253nd": 'optionOne',
                    "6ni6ok3ym7mf1p33lnez": 'optionOne',
                    "am8ehyc8byjqgar0jgpub9": 'optionTwo',
                    "loxhs1bqm25b708cmbf3g": 'optionTwo',
                    "vthrdm985a262al8qx3do": 'optionOne',
                },
                questions: [ '8xf0y6ziyjabvozdd253nd', 'am8ehyc8byjqgar0jgpub9' ]
            },
        };
        expect(users(mockState, saveAnswerAction)).toEqual(expectedUsers);
    });
});