import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatDate, formatQuestion } from "../utils/helpers";

const QuestionCard = ({ authedUser, question, dispatch }) => {
    const {
        id,
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
                {/* TODO: redirect to poll page */ }
                <button className="show-btn">Show</button>
            </div>


        </div>
    );
};

QuestionCard.propTypes = {
    authedUser: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    question: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
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