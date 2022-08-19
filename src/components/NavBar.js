import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "../utils/helpers";
import { setAuthedUser } from "../actions/authedUser";
import { LinkContainer } from "react-router-bootstrap";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Avatar from "./Avatar";
import Button from "react-bootstrap/Button";

const NavBar = ({ authedUser, loading, router, dispatch }) => {
    const { location, navigate } = router;
    // const { name, avatarURL } = authedUser;

    const handleLogIn = (e) => {
        e.preventDefault();

        navigate("/login");
    };

    const handleLogOut = (e) => {
        e.preventDefault();

        dispatch(setAuthedUser(null));
        navigate("/");
    };

    const renderLogInOutButton = () => (
        authedUser === null
            ? location.pathname === "/login"
                ? null
                : (
                    <Button variant="dark" onClick={ handleLogIn }>
                        Login
                    </Button>
                ) : (
                <Button variant="light" onClick={ handleLogOut }>
                    Logout
                </Button>
            )
    );

    return (
        <Navbar bg="light" expand="md" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="user-info-nav" />
                <Navbar.Collapse id="user-info-nav">
                    <Nav className="me-auto" activeKey={ location.pathname }>
                        <Nav.Item>
                            <LinkContainer to="/">
                                <Nav.Link>Home</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/leaderboard">
                                <Nav.Link>Leaderboard</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                        <Nav.Item>
                            <LinkContainer to="/new">
                                <Nav.Link>New</Nav.Link>
                            </LinkContainer>
                        </Nav.Item>
                    </Nav>
                    <Nav className="align-items-center">
                        { authedUser === null
                            ? null
                            : <Avatar
                                avatarURL={ authedUser.avatarURL }
                                name={ authedUser.name }
                                isOnNavBar={ true }
                            />
                        }
                        <Navbar.Text className="fw-bold m-2">
                            { authedUser ? authedUser.name : "Guest" }
                        </Navbar.Text>
                        <Nav.Item>
                            { renderLogInOutButton() }
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavBar.propTypes = {
    authedUser: PropTypes.object,
    loading: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authedUser, users }) => ({
    loading: authedUser === null,
    authedUser: authedUser ? { ...users[ authedUser ] } : null,
});

export default withRouter(connect(mapStateToProps)(NavBar));