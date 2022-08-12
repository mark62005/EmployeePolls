import PropTypes from "prop-types";
import { connect } from "react-redux";
import Image from "react-bootstrap/Image";
import { PersonCircle } from "react-bootstrap-icons";

const Avatar = ({ avatarURL, name }) => {
    if (avatarURL !== null) {
        return <Image
            src={ avatarURL }
            alt={ `Avatar of ${name}` }
            roundedCircle={ true }
        />;
    }

    return <PersonCircle size={ 24 } />;
};

Avatar.propTypes = {
    avatarURL: PropTypes.string,
    name: PropTypes.string.isRequired,
};

export default connect()(Avatar);
