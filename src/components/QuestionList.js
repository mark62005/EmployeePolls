import PropTypes from "prop-types";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import Container from "react-bootstrap/Container";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

const QuestionList = ({ category, questionIds }) => {
    return (
        <Container className="my-4">
            <Row className="border border-2">
                <Col>
                    <h2 className="display-6 p-2">
                        { category === "new" ? "New Questions" : "Done" }
                    </h2>
                </Col>
            </Row>
            <Row className="border border-2 border-top-0">
                <Col className="">
                    <Row md={ 2 } lg={ 3 } className="g-4 p-3">
                        {
                            questionIds.map((id) => (
                                <Col key={ id } md={ 4 } className="">
                                    <QuestionCard id={ id } />
                                </Col>
                            ))
                        }
                    </Row>
                </Col>
            </Row>
        </Container>
    );
};

QuestionList.propTypes = {
    category: PropTypes.string.isRequired,
    questionIds: PropTypes.array.isRequired,
};

export default connect()(QuestionList);