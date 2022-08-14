import {
    RECEIVIE_USERS,
    SAVE_QUESTION,
    SAVE_ANSWER,
    receiveUsers,
    saveQuestionToUsers,
    saveAnswer,
} from "../users";

describe("receiveUsers", () => {
    it(`will return an object with action type of ${RECEIVIE_USERS} and a users object`, () => {
        var users = {
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

        expect(receiveUsers(users)).toEqual({
            type: RECEIVIE_USERS,
            users,
        });
    });
});

describe("saveQuestionToUsers", () => {
    it(`will return an object with action type of ${SAVE_QUESTION} and the question`, () => {
        var qid = "newID";
        var author = "tylermcginnis";

        expect(saveQuestionToUsers({ qid, author })).toEqual({
            type: SAVE_QUESTION,
            qid,
            author,
        });
    });
});

describe("saveAnswer", () => {
    it(`will return an object with action type of ${SAVE_ANSWER} and the question`, () => {
        var qid = "6ni6ok3ym7mf1p33lnez";
        var authedUser = "tylermcginnis";
        var answer = "optionOne";

        expect(saveAnswer({ authedUser, qid, answer })).toEqual({
            type: SAVE_ANSWER,
            authedUser,
            qid,
            answer,
        });
    });
});