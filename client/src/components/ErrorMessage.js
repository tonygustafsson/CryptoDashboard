import React from 'react';
import PropTypes from 'prop-types';

const ErrorMessage = ({ connectedToServer }) => {
    if (connectedToServer) {
        return false;
    }

    return (
        <div>
            <h1>Not connected to the server.</h1>
        </div>
    );
}

ErrorMessage.propTypes = {
    connectedToServer: PropTypes.bool,
};

export default ErrorMessage;
