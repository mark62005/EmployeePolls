import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OPTION_ONE, OPTION_TWO } from "../utils/helpers";
import { handleAddQuestion } from "../actions/shared";
import Card from "react-bootstrap/Card";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const NewQuestion = ({ dispatch }) => {
    const navigate = useNavigate();

    const [ optionOneText, setOptionOneText ] = useState("");
    const [ optionTwoText, setOptionTwoText ] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();

        if (e.target.name === OPTION_ONE) {
            setOptionOneText(e.target.value);
        }
        else if (e.target.name === OPTION_TWO) {
            setOptionTwoText(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        dispatch(handleAddQuestion(optionOneText, optionTwoText));
        setOptionOneText("");
        setOptionTwoText("");

        navigate("/");
    };

    return (
        <Card className="text-center m-4">
            <Card.Header>Would You Rather</Card.Header>
            <Card.Body>
                <Card.Title>Create Your Own Poll</Card.Title>
                <Form onSubmit={ handleSubmit } className="m-3">
                    <Row className="mb-3">
                        <Form.Group as={ Col } controlId={ OPTION_ONE }>
                            <Form.Label>Option One</Form.Label>
                            <Form.Control
                                type="text"
                                name={ OPTION_ONE }
                                placeholder="Enter Option One"
                                value={ optionOneText }
                                onChange={ handleInputChange }
                            />
                        </Form.Group>

                        <Form.Group as={ Col } controlId={ OPTION_TWO }>
                            <Form.Label>Option Two</Form.Label>
                            <Form.Control
                                type="text"
                                name={ OPTION_TWO }
                                placeholder="Enter Option Two"
                                value={ optionTwoText }
                                onChange={ handleInputChange }
                            />
                        </Form.Group>
                    </Row>
                    <Button
                        variant="primary"
                        type="submit"
                        disabled={ optionOneText === "" || optionTwoText === "" }
                    >
                        Submit
                    </Button>
                </Form>

            </Card.Body>
        </Card>
    );
};

NewQuestion.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(NewQuestion);