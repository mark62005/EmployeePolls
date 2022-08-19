import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setAuthedUser } from "../actions/authedUser";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Alert from "react-bootstrap/Alert";

const Login = ({ dispatch, users }) => {
    const navigate = useNavigate();

    const [ userId, setUserId ] = useState("sarahedo");
    const [ password, setPassword ] = useState("");
    const [ isValidated, setIsValidated ] = useState(true);
    const [ errorMessage, setErrorMessage ] = useState("");

    const handleValueChange = (e) => {
        e.preventDefault();
        setUserId(e.target.value);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(setAuthedUser(userId));
        navigate("/");
    };

    // const handleInputChange = (e, field) => {
    //     e.preventDefault();

    //     if (field === "uid") {
    //         setUserId(e.target.value);
    //     } else {
    //         setPassword(e.target.value);
    //     }
    // };

    // const validateLoginInfo = (uid, password) => {
    //     const user = Object.values(users).filter((u) => u.id === uid);

    //     if (user.length !== 1 || user[ 0 ] === undefined) {
    //         setErrorMessage("Error. User ID doesn't exist.");
    //         setIsValidated(false);
    //         return false;
    //     } else if (user[ 0 ].password !== password) {
    //         setErrorMessage("Error. Password is not correct.");
    //         setIsValidated(false);
    //         return false;
    //     }

    //     setIsValidated(true);
    //     return true;
    // };

    // const handleSubmit = (e) => {
    //     const form = e.currentTarget;

    //     if (
    //         validateLoginInfo(userId, password) === true
    //         && form.checkValidity() === true
    //         && isValidated === true
    //     ) {
    //         e.preventDefault();
    //         dispatch(setAuthedUser(userId));
    //         localStorage.setItem("authedId", JSON.stringify(userId));
    //         console.log(localStorage.getItem("authedId"));
    //     } else {
    //         e.stopPropagation();
    //     }
    //     setUserId("");
    //     setPassword("");
    // };

    return (
        <Container
            className={
                "d-flex flex-column align-items-center justify-content-center"
            }
            style={ { height: "80vh", width: "100vw" } }
        >
            <Container fluid className="text-center w-50">
                <h1>Login</h1>
                <Form.Select
                    defaultValue={ userId }
                    onChange={ handleValueChange }
                    data-testid="user-id-select"
                    className="my-4"
                >
                    {
                        Object.values(users).map((user) => (
                            <option key={ user.id } value={ user.id }>{ user.name }</option>
                        ))
                    }
                </Form.Select>
                <Button
                    variant="primary"
                    onClick={ handleSubmit }
                    data-testid="sign-in-button"
                >
                    SIGN IN
                </Button>
            </Container>


            {/* <Form noValidate >
                <Row className="text-start">
                    <Form.Group
                        as={ Col }
                        className="mb-3"
                        controlId="userId"
                    >
                        <Form.Label>ID</Form.Label>
                        <Form.Control
                            type="text"
                            placeholder="Enter Your ID"
                            value={ userId }
                            onChange={ (e) => handleInputChange(e, "uid") }
                            required
                            data-testid="id-input"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid User ID.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                <Row className="text-start">
                    <Form.Group as={ Col } className="mb-3" controlId="password">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type="password"
                            placeholder="Enter Your Password"
                            value={ password }
                            onChange={ (e) => handleInputChange(e, "password") }
                            required
                            data-testid="password-input"
                        />
                        <Form.Control.Feedback type="invalid">
                            Please provide a valid password.
                        </Form.Control.Feedback>
                    </Form.Group>
                </Row>
                {
                    isValidated === true ? null : <Alert variant="danger"> { errorMessage } </Alert>
                }
                <Button
                    variant="primary"
                    onClick={ handleSubmit }
                    disabled={ userId === "" || password === "" }
                    data-testid="sign-in-button"
                >
                    SIGN IN
                </Button>
            </Form> */}
        </Container>
    );
};

Login.propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired,
};

const mapStateToProps = ({ users, authedUser }) => ({
    users,
    authedUser,
});

export default connect(mapStateToProps)(Login);