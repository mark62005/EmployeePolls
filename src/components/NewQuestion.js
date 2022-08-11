import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { OPTION_ONE, OPTION_TWO } from "../utils/helpers";
import { handleAddQuestion } from "../actions/shared";

const NewQuestion = ({ dispatch }) => {
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

        // TODO: add new question to database
        console.log(optionOneText);
        console.log(optionTwoText);

        dispatch(handleAddQuestion(optionOneText, optionTwoText));

        // TODO: redirect to "/"
        setOptionOneText("");
        setOptionTwoText("");
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

};

export default connect()(NewQuestion);