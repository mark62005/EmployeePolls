import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sortQuestionsIdByTimestamp } from "../utils/helpers";
import QuestionCard from "./QuestionCard";

const Dashboard = ({ authedUser, newQuestionIds, doneQuestionIds, dispatch }) => {
    return (
        <div className="dashboard">
            <div>
                <h2>New Questions</h2>
                <ul className="new-questions-list">
                    { newQuestionIds.map((id) => (
                        <li key={ id }>
                            <QuestionCard id={ id } />
                        </li>
                    )) }
                </ul>
            </div>
            <div>
                <h2>Done</h2>
                <ul className="done-questions-list">
                    { doneQuestionIds.map((id) => (
                        <li key={ id }>
                            <QuestionCard id={ id } />
                        </li>
                    )) }
                </ul>
            </div>
        </div>
    );
};

Dashboard.propTypes = {
    dispatch: PropTypes.func.isRequired,

};

function getFilteredQuestions(questions, authedUser, type) {
    if (type === "new") {
        return Object.values(questions).filter(
            (q) => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser)
        );
    }

    // case "done"
    return Object.values(questions).filter(
        (q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)
    );
}

const mapStateToProps = ({ authedUser, questions }) => {
    const newQuestions = getFilteredQuestions(questions, authedUser, "new");
    const doneQuestions = getFilteredQuestions(questions, authedUser, "done");

    return {
        authedUser,
        newQuestionIds: sortQuestionsIdByTimestamp(newQuestions),
        doneQuestionIds: sortQuestionsIdByTimestamp(doneQuestions),
    };
};

export default connect(mapStateToProps)(Dashboard);