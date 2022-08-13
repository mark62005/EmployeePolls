import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "../utils/helpers";
import { setAuthedUser } from "../actions/authedUser";

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

        localStorage.clear();
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
                            <Nav.Link href="/">Home</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/leaderboard">Leaderboard</Nav.Link>
                        </Nav.Item>
                        <Nav.Item>
                            <Nav.Link href="/new">New</Nav.Link>
                        </Nav.Item>
                    </Nav>
                    <Nav className="align-items-center">
                        { loading === true ? null : <Avatar avatarURL={ avatarURL } name={ name } /> }
                        <Navbar.Text className="fw-bold ms-2">{ name }</Navbar.Text>
                        <Nav.Item>
                            {/* TODO: redirect to logout page */ }
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