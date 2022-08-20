import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { sortQuestionsIdByTimestamp } from "../../utils/helpers";
import QuestionList from "../QuestionList";
import Container from "react-bootstrap/Container";
import Tabs from "react-bootstrap/Tabs";
import Tab from "react-bootstrap/Tab";

const Dashboard = ({ allQuestionIds, newQuestionIds, doneQuestionIds }) => {
    const [ tabKey, setTabKey ] = useState("new");

    const CATEGORIES = [ "new", "done", "all" ];

    const handleSelect = (eventKey) => {
        setTabKey(eventKey);
    };

    const getListTitle = (category) => {
        switch (category) {
            case "new":
                return "Unanswered Questions";
            case "done":
                return "Answered Questions";
            case "all":
                return "All";
            default:
                return "";
        }
    };

    const renderQuestionList = (category) => {
        switch (category) {
            case "new":
                return <QuestionList
                    key={ category }
                    category={ category }
                    questionIds={ newQuestionIds }
                />;
            case "done":
                return <QuestionList
                    key={ category }
                    category={ category }
                    questionIds={ doneQuestionIds }
                />;
            case "all":
                return <QuestionList
                    key={ category }
                    category={ category }
                    questionIds={ allQuestionIds }
                />;
            default:
                return null;
        }
    };

    return (
        <Container className="p-3">
            <Tabs
                activeKey={ tabKey }
                onSelect={ handleSelect }
            >
                {
                    CATEGORIES.map((category) => (
                        <Tab
                            key={ category }
                            eventKey={ category }
                            title={ getListTitle(category) }
                        >
                            { renderQuestionList(category) }
                        </Tab>
                    ))
                }
            </Tabs>
        </Container>
    );
};

Dashboard.propTypes = {
    allQuestionIds: PropTypes.array.isRequired,
    newQuestionIds: PropTypes.array.isRequired,
    doneQuestionIds: PropTypes.array.isRequired,
};

function getFilteredQuestions(questions, authedUser, category) {
    switch (category) {
        case "new":
            return Object.values(questions).filter(
                (q) => !q.optionOne.votes.includes(authedUser) && !q.optionTwo.votes.includes(authedUser)
            );
        case "done":
            return Object.values(questions).filter(
                (q) => q.optionOne.votes.includes(authedUser) || q.optionTwo.votes.includes(authedUser)
            );
        case "all":
            return Object.values(questions);
        default:
            return [];
    }
}

const mapStateToProps = ({ authedUser, questions }) => {
    const newQuestions = getFilteredQuestions(questions, authedUser, "new");
    const doneQuestions = getFilteredQuestions(questions, authedUser, "done");

    return {
        authedUser,
        allQuestionIds: sortQuestionsIdByTimestamp(Object.values(questions)),
        newQuestionIds: sortQuestionsIdByTimestamp(newQuestions),
        doneQuestionIds: sortQuestionsIdByTimestamp(doneQuestions),
    };
};

export default connect(mapStateToProps)(Dashboard);