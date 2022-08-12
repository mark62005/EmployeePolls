import {
    useLocation,
    useNavigate,
    useParams,
} from "react-router-dom";

export const OPTION_ONE = "optionOne";
export const OPTION_TWO = "optionTwo";

export function formatDate(timestamp) {
    const d = new Date(timestamp);
    const time = d.toLocaleTimeString('en-US');
    return time.substr(0, 5) + time.slice(-2) + ' | ' + d.toLocaleDateString();
}

export function formatQuestion(question, author, authedUser, users) {
    const { id, timestamp, optionOne, optionTwo } = question;

    return {
        qid: id,
        timestamp,
        author: author.id,
        avatar: author.avatarURL,
        optionOne,
        optionTwo,
        voteCount: optionOne.votes.length + optionTwo.votes.length,
        userCount: Object.keys(users).length,
        hasVoted: optionOne.votes.includes(authedUser) || optionTwo.votes.includes(authedUser),
    };
}

export function sortQuestionsIdByTimestamp(questions) {
    return questions
        .map((q) => q.id)
        .sort((a, b) => b.timestamp - a.timestamp);
}

// https://reactrouter.com/docs/en/v6/getting-started/faq
export function withRouter(Component) {
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