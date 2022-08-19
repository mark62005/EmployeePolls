import PropTypes from "prop-types";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import { PAGE_NOT_FOUND, POLL_NOT_FOUND } from "../utils/helpers";
import Container from "react-bootstrap/Container";

const NotFound = ({ type = PAGE_NOT_FOUND }) => {
    return (
        <Container
            className={
                "d-flex flex-column align-items-center justify-content-center"
            }
            style={ { height: "80vh", width: "75vw" } }
        >
            <p className="h2 display-2">404</p>
            <h1 className="h1 display-1 m-4">
                Sorry. {
                    type === PAGE_NOT_FOUND
                        ? PAGE_NOT_FOUND
                        : POLL_NOT_FOUND
                }
            </h1>
            <Link to="/" className="display-3">Back to Home</Link>
        </Container>
    );
};

NotFound.propTypes = {
    type: PropTypes.string.isRequired,
};

export default connect()(NotFound);