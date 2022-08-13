import PropTypes from "prop-types";
import { connect } from "react-redux";
import { sortQuestionsIdByTimestamp } from "../utils/helpers";
import QuestionList from "./QuestionList";
import Container from "react-bootstrap/Container";

const Dashboard = ({ authedUser, newQuestionIds, doneQuestionIds }) => {
    const categories = [ "new", "done" ];

    return (
        <Container className="p-3">
            {
                categories.map((category) => (
                    category === "new"
                        ? <QuestionList
                            key={ category }
                            category={ category }
                            questionIds={ newQuestionIds }
                        />
                        : <QuestionList
                            key={ category }
                            category={ category }
                            questionIds={ doneQuestionIds }
                        />
                ))
            }
        </Container>
    );
};

Dashboard.propTypes = {
    authedUser: PropTypes.string.isRequired,
    newQuestionIds: PropTypes.array.isRequired,
    doneQuestionIds: PropTypes.array.isRequired,
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