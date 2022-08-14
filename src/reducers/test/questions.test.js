import {
    RECEIVE_QUESTIONS,
    ADD_QUESTION,
    SAVE_VOTE,
} from "../../actions/questions";
import questions from "../questions";

const mockState = {
    "8xf0y6ziyjabvozdd253nd": {
        id: '8xf0y6ziyjabvozdd253nd',
        author: 'sarahedo',
        timestamp: 1467166872634,
        optionOne: {
            votes: [ 'sarahedo' ],
            text: 'Build our new application with Javascript',
        },
        optionTwo: {
            votes: [],
            text: 'Build our new application with Typescript'
        }
    },
};

describe("questions", () => {
    it(`will return questions if the action type is ${RECEIVE_QUESTIONS}`, () => {
        var receiveQuestionsAction = {
            type: RECEIVE_QUESTIONS,
        };

        expect(questions(mockState, receiveQuestionsAction)).toEqual(mockState);
    });

    it(`will return the new state of questions with the new question added if the action type is ${ADD_QUESTION}`, () => {
        var addQuestionAction = {
            type: ADD_QUESTION,
            question: {
                id: '6ni6ok3ym7mf1p33lnez',
                author: 'mtsamis',
                timestamp: 1468479767190,
                optionOne: {
                    votes: [],
                    text: 'hire more frontend developers',
                },
                optionTwo: {
                    votes: [ 'mtsamis', 'sarahedo' ],
                    text: 'hire more backend developers'
                }
            }
        };

        var expectedQuestions = {
            "8xf0y6ziyjabvozdd253nd": {
                id: '8xf0y6ziyjabvozdd253nd',
                author: 'sarahedo',
                timestamp: 1467166872634,
                optionOne: {
                    votes: [ 'sarahedo' ],
                    text: 'Build our new application with Javascript',
                },
                optionTwo: {
                    votes: [],
                    text: 'Build our new application with Typescript'
                }
            },
            "6ni6ok3ym7mf1p33lnez": {
                id: '6ni6ok3ym7mf1p33lnez',
                author: 'mtsamis',
                timestamp: 1468479767190,
                optionOne: {
                    votes: [],
                    text: 'hire more frontend developers',
                },
                optionTwo: {
                    votes: [ 'mtsamis', 'sarahedo' ],
                    text: 'hire more backend developers'
                }
            },
        };
        expect(questions(mockState, addQuestionAction)).toEqual(expectedQuestions);
    });

    it(`will return the new state of questions with the answer added to that question if the action type is ${SAVE_VOTE}`, () => {
        var saveVoteAction = {
            type: SAVE_VOTE,
            authedUser: "mtsamis",
            qid: "8xf0y6ziyjabvozdd253nd",
            answer: "optionTwo",
        };

        var expectedQuestions = {
            "8xf0y6ziyjabvozdd253nd": {
                id: '8xf0y6ziyjabvozdd253nd',
                author: 'sarahedo',
                timestamp: 1467166872634,
                optionOne: {
                    votes: [ 'sarahedo' ],
                    text: 'Build our new application with Javascript',
                },
                optionTwo: {
                    votes: [ "mtsamis" ],
                    text: 'Build our new application with Typescript'
                }
            },
        };
        expect(questions(mockState, saveVoteAction)).toEqual(expectedQuestions);
    });

    it("will return an empty state if it's in initial state", () => {
        expect(questions({}, { type: RECEIVE_QUESTIONS })).toEqual({});
    });
});