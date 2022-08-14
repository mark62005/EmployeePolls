import {
    _getQuestions,
    _getUsers,
    _saveQuestion,
    _saveQuestionAnswer,
} from "./_DATA";

describe("_getQuestions", () => {
    it("will return an object of questions", async () => {
        var mockQuestions = {
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
            "am8ehyc8byjqgar0jgpub9": {
                id: 'am8ehyc8byjqgar0jgpub9',
                author: 'sarahedo',
                timestamp: 1488579767190,
                optionOne: {
                    votes: [],
                    text: 'conduct a release retrospective 1 week after a release',
                },
                optionTwo: {
                    votes: [ 'sarahedo' ],
                    text: 'conduct release retrospectives quarterly'
                }
            },
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
                    text: 'have code reviews conducted by managers'
                }
            },
            "vthrdm985a262al8qx3do": {
                id: 'vthrdm985a262al8qx3do',
                author: 'tylermcginnis',
                timestamp: 1489579767190,
                optionOne: {
                    votes: [ 'tylermcginnis' ],
                    text: 'take a course on ReactJS',
                },
                optionTwo: {
                    votes: [ 'mtsamis' ],
                    text: 'take a course on unit testing with Jest'
                }
            },
            "xj352vofupe1dqz9emx13r": {
                id: 'xj352vofupe1dqz9emx13r',
                author: 'mtsamis',
                timestamp: 1493579767190,
                optionOne: {
                    votes: [ 'mtsamis', 'zoshikanlu' ],
                    text: 'deploy to production once every two weeks',
                },
                optionTwo: {
                    votes: [ 'tylermcginnis' ],
                    text: 'deploy to production once every month'
                }
            },
        };
        var results = await _getQuestions();

        expect(Object.keys(results).length).toEqual(Object.keys(mockQuestions).length);
        expect(results[ "xj352vofupe1dqz9emx13r" ].id).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].id);
        expect(results[ "xj352vofupe1dqz9emx13r" ].author).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].author);
        expect(results[ "xj352vofupe1dqz9emx13r" ].timestamp).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].timestamp);
        expect(results[ "xj352vofupe1dqz9emx13r" ].optionOne.votes.length).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].optionOne.votes.length);
        expect(results[ "xj352vofupe1dqz9emx13r" ].optionOne.votes.text).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].optionOne.votes.text);
        expect(results[ "xj352vofupe1dqz9emx13r" ].optionTwo.votes.length).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].optionTwo.votes.length);
        expect(results[ "xj352vofupe1dqz9emx13r" ].optionTwo.votes.text).toEqual(mockQuestions[ "xj352vofupe1dqz9emx13r" ].optionTwo.votes.text);
    });
});

describe("_getUsers", () => {
    it("will return an object of users", async () => {
        var mockUsers = {
            sarahedo: {
                id: 'sarahedo',
                password: 'password123',
                name: 'Sarah Edo',
                avatarURL: "https://xsgames.co/randomusers/assets/avatars/female/7.jpg",
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
            mtsamis: {
                id: 'mtsamis',
                password: 'xyz123',
                name: 'Mike Tsamis',
                avatarURL: null,
                answers: {
                    "xj352vofupe1dqz9emx13r": 'optionOne',
                    "vthrdm985a262al8qx3do": 'optionTwo',
                    "6ni6ok3ym7mf1p33lnez": 'optionOne'
                },
                questions: [ '6ni6ok3ym7mf1p33lnez', 'xj352vofupe1dqz9emx13r' ],
            },
            zoshikanlu: {
                id: 'zoshikanlu',
                password: 'pass246',
                name: 'Zenobia Oshikanlu',
                avatarURL: null,
                answers: {
                    "xj352vofupe1dqz9emx13r": 'optionOne',
                },
                questions: [],
            }
        };
        var results = await _getUsers();

        expect(Object.keys(results).length).toEqual(Object.keys(mockUsers).length);
        expect(results[ "sarahedo" ].id).toEqual(mockUsers[ "sarahedo" ].id);
        expect(results[ "sarahedo" ].password).toEqual(mockUsers[ "sarahedo" ].password);
        expect(results[ "sarahedo" ].name).toEqual(mockUsers[ "sarahedo" ].name);
        expect(results[ "sarahedo" ].avatarURL).toEqual(mockUsers[ "sarahedo" ].avatarURL);
        expect(Object.keys(results[ "sarahedo" ].answers).length).toEqual(Object.keys(mockUsers[ "sarahedo" ].answers).length);
        expect(results[ "sarahedo" ].questions.length).toEqual(mockUsers[ "sarahedo" ].questions.length);
    });
});

describe("_saveQuestion", () => {

    it("will return the saved question if it is saved successfully", async () => {
        var author = "sarahedo";
        var optionOneText = "Sample option one";
        var optionTwoText = "Sample option two";
        var expectedQuestion = {
            author,
            optionOne: {
                text: optionOneText,
            },
            optionTwo: {
                text: optionTwoText,
            }
        };

        await expect(_saveQuestion({ author, optionOneText, optionTwoText })).resolves.toMatchObject(expectedQuestion);
    });

    it("will return error if the question to add is missing the author", async () => {
        var optionOneText = "Sample option one";
        var optionTwoText = "Sample option two";

        await expect(_saveQuestion({ optionOneText, optionTwoText })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });

    it("will return error if the question to add is missing the text for option one", async () => {
        var author = "sarahedo";
        var optionTwoText = "Sample option two";

        await expect(_saveQuestion({ author, optionTwoText })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });

    it("will return error if the question to add is missing the text for option two", async () => {
        var author = "sarahedo";
        var optionOneText = "Sample option one";

        await expect(_saveQuestion({ author, optionOneText })).rejects.toEqual("Please provide optionOneText, optionTwoText, and author");
    });
});

describe("_saveQuestionAnswer", () => {

    it("will return true if the answer is saved successfully", async () => {
        var authedUser = "sarahedo";
        var qid = "xj352vofupe1dqz9emx13r";
        var answer = "optionTwo";

        await expect(_saveQuestionAnswer({ authedUser, qid, answer })).resolves.toBeTruthy();
    });

    it("will return an error if the authedUser is missing", async () => {
        var qid = "xj352vofupe1dqz9emx13r";
        var answer = "optionTwo";

        await expect(_saveQuestionAnswer({ qid, answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
    });

    it("will return an error if the qid is missing", async () => {
        var authedUser = "sarahedo";
        var answer = "optionTwo";

        await expect(_saveQuestionAnswer({ authedUser, answer })).rejects.toEqual("Please provide authedUser, qid, and answer");
    });


    it("will return an error if the answer is missing", async () => {
        var authedUser = "sarahedo";
        var qid = "xj352vofupe1dqz9emx13r";

        await expect(_saveQuestionAnswer({ authedUser, qid })).rejects.toEqual("Please provide authedUser, qid, and answer");
    });
});