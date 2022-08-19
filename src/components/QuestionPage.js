import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { handleVoteQuestion } from "../actions/shared";
import {
    OPTION_ONE,
    OPTION_TWO,
    withRouter,
    formatQuestion,
    getPercentage,
} from "../utils/helpers";
import Card from "react-bootstrap/Card";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";
import Avatar from "./Avatar";
import NotFound from "./NotFound";

const QuestionPage = ({ authedUser, question, dispatch }) => {
    const {
        qid,
        author,
        avatar,
        optionOne,
        optionTwo,
        userCount,
        hasVoted,
    } = question;

    const [ selected, setSelected ] = useState(
        optionOne.votes.includes(authedUser)
            ? OPTION_ONE
            : optionTwo.votes.includes(authedUser)
                ? OPTION_TWO
                : ""
    );

    if (question === null) {
        return <NotFound className="display-1 text-center mt-3" />;
    }

    const handlePoll = (e) => {
        e.preventDefault();

        dispatch(handleVoteQuestion({
            authedUser,
            qid,
            answer: e.target.value,
        }));
        setSelected(e.target.value);
    };

    const renderPollOptions = (option) => {
        if (hasVoted === false) {
            return (
                <Card.Body>
                    <Button
                        className="px-3"
                        type="submit"
                        variant="primary"
                        onClick={ handlePoll }
                        value={ option }
                    >
                        Vote
                    </Button>
                </Card.Body>
            );
        }

        const optionOneVoteCount = optionOne.votes.length;
        const optionTwoVoteCount = optionTwo.votes.length;
        const optionOneVotePercentage = getPercentage(optionOneVoteCount, userCount);
        const optionTwoVotePercentage = getPercentage(optionTwoVoteCount, userCount);

        return (
            <Card.Body className="d-flex justify-content-between">
                <Card.Text className="mb-0">
                    { option === OPTION_ONE
                        ? `${optionOneVoteCount}/${userCount} users ${optionOneVoteCount > 1 ? "have" : "has"} voted for this option.`
                        : `${optionTwoVoteCount}/${userCount} users ${optionTwoVoteCount > 1 ? "have" : "has"} voted for this option.`
                    }
                </Card.Text>
                <Card.Text className={ { "mb-0": true } }>
                    { option === OPTION_ONE
                        ? `${optionOneVotePercentage} %`
                        : `${optionTwoVotePercentage} %`
                    }
                </Card.Text>
            </Card.Body>
        );
    };

    return (
        <Card border="dark" className="text-center py-3 m-5">
            <Card.Body>
                <Card.Title className="fs-2">{ `Poll by ${author}` }</Card.Title>
                <Avatar avatarURL={ avatar } name={ author } />
                {
                    hasVoted === false
                        ? null
                        : <Card.Subtitle className="pt-4 fs-3 text-success">Thank you for voting!</Card.Subtitle>
                }
                <Card.Subtitle className="mt-4 mb-3 fs-4">Would You Rather</Card.Subtitle>
                <Row md={ 2 }>
                    <Col>
                        <Card
                            bg={ selected === OPTION_ONE ? "success" : null }
                            text={ selected === OPTION_ONE ? "light" : null }
                        >
                            <Card.Header>{ optionOne.text }</Card.Header>
                            { renderPollOptions(OPTION_ONE) }
                        </Card>
                    </Col>
                    <Col>
                        <Card
                            bg={ selected === OPTION_TWO ? "success" : null }
                            text={ selected === OPTION_TWO ? "light" : null }
                        >
                            <Card.Header>{ optionTwo.text }</Card.Header>
                            { renderPollOptions(OPTION_TWO) }
                        </Card>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    );
};

QuestionPage.propTypes = {
    authedUser: PropTypes.string,
    question: PropTypes.object,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authedUser, questions, users }, { router }) => {
    const { id } = router.params;
    const question = questions[ id ];

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[ question.author ], authedUser, users)
            : null,
    };
};

export default withRouter(connect(mapStateToProps)(QuestionPage));