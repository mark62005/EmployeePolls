import PropTypes from "prop-types";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";

const QuestionList = ({ category, questionIds }) => {
    return (
        <div>
            <h2>{ category === "new" ? "New Questions" : "Done" }</h2>
            <ul className="question-list">
                { questionIds.map((id) => (
                    <li key={ id }>
                        <QuestionCard id={ id } />
                    </li>
                )) }
            </ul>
        </div>
    );
};

QuestionList.propTypes = {
    category: PropTypes.string.isRequired,
    questionIds: PropTypes.array.isRequired,
};

export default connect()(QuestionList);