import PropTypes from "prop-types";
import { connect } from "react-redux";
import QuestionCard from "./QuestionCard";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";

const QuestionList = ({ questionIds }) => {
    return (
        <Container>
            <Row className="border border-1 border-top-0 px-3 py-4">
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
    questionIds: PropTypes.array.isRequired,
};

export default connect()(QuestionList);