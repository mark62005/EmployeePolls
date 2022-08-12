import { connect } from "react-redux";
import PropTypes from "prop-types";
import { withRouter } from "../utils/helpers";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Image from "react-bootstrap/Image";
import { PersonCircle } from "react-bootstrap-icons";
import Avatar from "./Avatar";

const NavBar = ({ authedUser, loading, router }) => {
    const { location } = router;
    const { name, avatarURL } = authedUser;

    const renderAvatar = () => {
        if (loading === true) {
            return;
        }

        if (avatarURL !== null) {
            return <Image
                src={ avatarURL }
                alt={ `Avatar of ${name}` }
                roundedCircle={ true }
                className="me-2"
            />;
        }

        return <PersonCircle size={ 24 } className="me-2" />;
    };

    return (
        <Navbar bg="light" expand="md" variant="light">
            <Container>
                <Navbar.Toggle aria-controls="user-info-nav" />
                <Navbar.Collapse id="user-info-nav">
                    <Nav className="me-auto" variant="tabs" activeKey={ location.pathname }>
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
                            <Nav.Link href="#logout">Logout</Nav.Link>
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
};

const mapStateToProps = ({ authedUser, users }) => ({
    loading: authedUser === null,
    authedUser: { ...users[ authedUser ] },
});

export default withRouter(connect(mapStateToProps)(NavBar));