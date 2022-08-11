import PropTypes from "prop-types";
import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
    return (
        <div>
            Leaderboard
            <ul>
                {
                    users.map((user) => {
                        const answeredCount = Object.keys(user.answers).length;

                        return (
                            <li key={ user.id }>
                                <p>{ `${user.name} (${user.id}), Answerd: ${answeredCount}, Created: ${user.questions.length}` }</p>
                            </li>
                        );
                    })
                }
            </ul>
        </div>
    );
};

Leaderboard.propTypes = {

};

const mapStateToProps = ({ users }) => {
    const sortedUsers = Object.values(users).sort((a, b) => {
        const answersCountOfA = Object.keys(a.answers).length;
        const answersCountOfB = Object.keys(b.answers).length;

        return (answersCountOfB + b.questions.length) - (answersCountOfA + a.questions.length);
    });

    return {
        users: sortedUsers,
    };
};

export default connect(mapStateToProps)(Leaderboard);