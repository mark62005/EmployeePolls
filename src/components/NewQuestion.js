import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { useNavigate } from "react-router-dom";
import { OPTION_ONE, OPTION_TWO } from "../utils/helpers";
import { handleAddQuestion } from "../actions/shared";

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
        <div>
            <h2>Would You Rather</h2>
            <h3>Create Your Own Poll</h3>
            <form onSubmit={ handleSubmit }>
                <label id={ OPTION_ONE }>First Option</label>
                <input name={ OPTION_ONE } value={ optionOneText } placeholder="Option One" onChange={ handleInputChange } />
                <label id={ OPTION_TWO }>Second Option</label>
                <input name={ OPTION_TWO } value={ optionTwoText } placeholder="Option Two" onChange={ handleInputChange } />

                <button type="submit" disabled={ optionOneText === "" || optionTwoText === "" }>Create</button>
            </form>
        </div>
    );
};

NewQuestion.propTypes = {
    dispatch: PropTypes.func.isRequired,
};

export default connect()(NewQuestion);