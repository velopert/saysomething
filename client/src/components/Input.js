import React, { Component, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {

};

class Input extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="input-container">
                <input type="text" name="message" autofocus="autofocus"/>
            </div>
        );
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
