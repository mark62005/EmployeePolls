import PropTypes from "prop-types";
import { connect } from "react-redux";

const Leaderboard = ({ users }) => {
    return (
        <div>
            Leaderboard
            <ul>
                {
                    Object.values(users).map((user) => {
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

const mapStateToProps = ({ users }) => ({
    users,
});

export default connect(mapStateToProps)(Leaderboard);