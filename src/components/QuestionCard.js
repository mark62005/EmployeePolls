import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { formatDate, formatQuestion } from "../utils/helpers";

const QuestionCard = ({ question }) => {
    const {
        qid,
        timestamp,
        author,
        avatar,
        optionOne,
        optionTwo,
        voteCount,
        userCount,
        hasVoted,
    } = question;

    return (
        <div className="question-card">
            <div className="question-info">
                <h3>{ author }</h3>
                <p>{ formatDate(timestamp) }</p>
                <Link to={ `/question/${qid}` }>
                    <button className="show-btn">Show</button>
                </Link>
            </div>
        </div>
    );
};

QuestionCard.propTypes = {
    id: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
};

const mapStateToProps = ({ authedUser, users, questions }, { id }) => {
    const question = questions[ id ];

    return {
        authedUser,
        question: question
            ? formatQuestion(question, users[ question.author ], authedUser, users)
            : null,
    };
};

export default connect(mapStateToProps)(QuestionCard);