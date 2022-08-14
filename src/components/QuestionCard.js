import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatDate, formatQuestion } from "../utils/helpers";

import Card from "react-bootstrap/Card";
import Button from "react-bootstrap/Button";
import Avatar from "./Avatar";

const QuestionCard = ({ question, authedUser }) => {
    const {
        qid,
        timestamp,
        author,
        avatar,
    } = question;
    const { name } = authedUser;

    return (
        <Card border="dark" className="text-center">
            <Card.Body>
                <Avatar avatarURL={ avatar } name={ name } />
                <Card.Subtitle className="mt-2 fs-4">{ author }</Card.Subtitle>
                <Card.Text className="mb-3 fs-6 text-black-50">{ formatDate(timestamp) }</Card.Text>
                <Button variant="primary" href={ `/question/${qid}` }>Show</Button>
            </Card.Body>
        </Card>
    );
};

QuestionCard.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[ id ];

    return {
        authedUser: { ...users[ authedUser ] },
        question: question
            ? formatQuestion(question, users[ question.author ], authedUser, users)
            : null,
    };
};

export default connect(mapStateToProps)(QuestionCard);