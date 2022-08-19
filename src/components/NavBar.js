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
    const { name, avatarURL } = authedUser;

    const handleOnClick = (e) => {
        e.preventDefault();

        dispatch(setAuthedUser(null));
        navigate("/");
    };

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
                        { loading === true
                            ? null
                            : <Avatar
                                avatarURL={ avatarURL }
                                name={ name }
                                isOnNavBar={ true }
                            />
                        }
                        <Navbar.Text className="fw-bold ms-2">{ name }</Navbar.Text>
                        <Nav.Item>
                            <Button variant="light" onClick={ handleOnClick }>Logout</Button>
                        </Nav.Item>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

NavBar.propTypes = {
    authedUser: PropTypes.object.isRequired,
    loading: PropTypes.bool.isRequired,
    router: PropTypes.object.isRequired,
    dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = ({ authedUser, users }) => ({
    loading: authedUser === null,
    authedUser: { ...users[ authedUser ] },
});

export default withRouter(connect(mapStateToProps)(NavBar));