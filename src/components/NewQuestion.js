import PropTypes from "prop-types";
import { connect } from "react-redux";

const NewQuestion = () => {
    return (
        <div>
            New Question
        </div>
    );
};

NewQuestion.propTypes = {

};

export default connect()(NewQuestion);