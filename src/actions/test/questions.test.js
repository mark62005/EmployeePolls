import {
    addQuestion,
    ADD_QUESTION,
    receiveQuestions,
    RECEIVE_QUESTIONS,
    saveVote,
    SAVE_VOTE,
} from "../questions";

describe("receiveQuestions", () => {
    it(`will return an object with action type of ${RECEIVE_QUESTIONS} and a questions object`, () => {
        const questions = {
            "loxhs1bqm25b708cmbf3g": {
                id: 'loxhs1bqm25b708cmbf3g',
                author: 'tylermcginnis',
                timestamp: 1482579767190,
                optionOne: {
                    votes: [],
                    text: 'have code reviews conducted by peers',
                },
                optionTwo: {
                    votes: [ 'sarahedo' ],
                    text: 'have code reviews conducted by managers',
                },
            },
        };

        expect(receiveQuestions(questions)).toEqual({
            type: RECEIVE_QUESTIONS,
            questions,
        });
    });
});

describe("addQuestion", () => {
    it(`will return an object with action type of ${ADD_QUESTION} and the question`, () => {
        const question = { question: "some_question" };

        expect(addQuestion(question)).toEqual({
            type: ADD_QUESTION,
            question,
        });
    });
});

describe("saveVote", () => {
    it(`will return an object with action type of ${SAVE_VOTE}, the authedUser's id, the question id and the answer`, () => {
        const authedUser = "tylermcginnis";
        const qid = "xj352vofupe1dqz9emx13r";
        const answer = "optionOne";

        expect(saveVote({ authedUser, qid, answer })).toEqual({
            type: SAVE_VOTE,
            authedUser,
            qid,
            answer,
        });
    });
});