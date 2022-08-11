import PropTypes from "prop-types";
import { connect } from "react-redux";
import { formatQuestion } from "../utils/helpers";
import { handleVoteQuestion } from "../actions/shared";
import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";
import { OPTION_ONE, OPTION_TWO } from "../utils/helpers";

// https://reactrouter.com/docs/en/v6/getting-started/faq
function withRouter(Component) {
    function ComponentWithRouterProp(props) {
        let location = useLocation();
        let navigate = useNavigate();
        let params = useParams();
        return (
            <Component
                { ...props }
                router={ { location, navigate, params } }
            />
        );
    }

    return ComponentWithRouterProp;
}

const QuestionPage = ({ authedUser, question, dispatch }) => {
    const {
        qid,
        author,
        avatar,
        optionOne,
        optionTwo,
        voteCount,
        userCount,
        hasVoted,
    } = question;

    const handlePoll = (e) => {
        e.preventDefault();

        dispatch(handleVoteQuestion({
            authedUser,
            qid,
            answer: e.target.value,
        }));
    };

    const renderPollOptions = () => {
        if (hasVoted === false) {
            return (
                <div className="poll-options">
                    <div className="poll-option">
                        <p>{ optionOne.text }</p>
                        <button className="poll-btn" onClick={ handlePoll } value={ OPTION_ONE }>Click</button>
                    </div>
                    <div className="poll-option">
                        <p>{ optionTwo.text }</p>
                        <button className="poll-btn" onClick={ handlePoll } value={ OPTION_TWO }>Click</button>
                    </div>
                </div>
            );
        }

        return (
            <div>
                <h4>Thank you for voting!</h4>
                <p>{ `${voteCount}/${userCount} users ${voteCount > 1 ? "have" : "has"} voted.` }</p>
            </div>
        );
    };

    return (
        <div>
            <h3>Poll by { author }</h3>
            <img src={ avatar !== null ? avatar : null } alt={ `The avatar of ${author}` } />
            <h3>Would You Rather</h3>
            { renderPollOptions() }
        </div>
    );
};

QuestionPage.propTypes = {
    authedUser: PropTypes.string.isRequired,
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