import PropTypes from "prop-types";
import { useState } from "react";
import { connect } from "react-redux";
import { OPTION_ONE, OPTION_TWO } from "../utils/helpers";

const NewQuestion = () => {
    const [ optionOne, setOptionOne ] = useState("");
    const [ optionTwo, setOptionTwo ] = useState("");

    const handleInputChange = (e) => {
        e.preventDefault();

        if (e.target.name === OPTION_ONE) {
            setOptionOne(e.target.value);
        }
        else if (e.target.name === OPTION_TWO) {
            setOptionTwo(e.target.value);
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: add new question to database
        console.log(optionOne);
        console.log(optionTwo);

        // TODO: redirect to "/"
        setOptionOne("");
        setOptionTwo("");
    };

    return (
        <div>
            <h2>Would You Rather</h2>
            <h3>Create Your Own Poll</h3>
            <form onSubmit={ handleSubmit }>
                <label id={ OPTION_ONE }>First Option</label>
                <input name={ OPTION_ONE } value={ optionOne } placeholder="Option One" onChange={ handleInputChange } />
                <label id={ OPTION_TWO }>Second Option</label>
                <input name={ OPTION_TWO } value={ optionTwo } placeholder="Option Two" onChange={ handleInputChange } />

                <button type="submit" disabled={ optionOne === "" || optionTwo === "" }>Create</button>
            </form>
        </div>
    );
};

NewQuestion.propTypes = {

};

export default connect()(NewQuestion);