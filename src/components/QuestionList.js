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
                    <h2 className="display-6">
                        { category === "new" ? "New Questions" : "Done" }
                    </h2>
                </Col>
            </Row>
            <Row className="border border-2 border-top-0">
                <Col className="">
                    <Container fluid>
                        <Row>
                            {
                                questionIds.map((id) => (
                                    <Col key={ id } md={ 4 } className="p-1 my-3 bg-primary">
                                        <QuestionCard id={ id } />
                                    </Col>
                                ))
                            }
                        </Row>
                    </Container>
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