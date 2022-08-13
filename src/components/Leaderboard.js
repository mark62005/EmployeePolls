import PropTypes from "prop-types";
import { connect } from "react-redux";
import Table from "react-bootstrap/Table";
import Container from "react-bootstrap/Container";
import Avatar from "./Avatar";

const Leaderboard = ({ users }) => {
    return (
        <Container className="p-4">
            <Table
                striped
                bordered
                hover
                className="align-middle"
            >
                <thead>
                    <tr>
                        <th colSpan={ 2 }>User</th>
                        <th>Answerd</th>
                        <th>Created</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        users.map((user) => {
                            const answeredCount = Object.keys(user.answers).length;

                            return (
                                <tr key={ user.id }>
                                    <td className="text-center">
                                        <Avatar avatarURL={ user.avatarURL } name={ user.name } />
                                    </td>
                                    <td>
                                        <Container className="d-flex flex-column">
                                            <p className="mb-auto mt-3 fs-4">
                                                { user.name }
                                            </p>
                                            <p className="mt-auto mb-3 fs-6 fw-light">
                                                @{ user.id }
                                            </p>
                                        </Container>
                                    </td>
                                    <td className="text-end">{ answeredCount }</td>
                                    <td className="text-end">{ user.questions.length }</td>
                                </tr>
                            );
                        })
                    }
                </tbody>
            </Table>
        </Container>
    );
};

Leaderboard.propTypes = {
    users: PropTypes.array.isRequired,
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