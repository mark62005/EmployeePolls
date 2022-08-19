import { connect } from "react-redux";
import { Link } from "react-router-dom";
import Container from "react-bootstrap/Container";

const NotFound = () => {
    return (
        <Container className="text-center py-4 px-2">
            <p className="h2 display-2">404</p>
            <h1 className="h1 display-1 m-4">Sorry. Page Not Found</h1>
            <Link to="/" className="display-3">Back to Home</Link>
        </Container>
    );
};

export default connect()(NotFound);