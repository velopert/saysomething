import React, { Component, PropTypes } from 'react';

const propTypes = {
    data: PropTypes.object
};

const defaultProps = {
    data: {
        "_id": "57b5c1ab163a036808503c78",
        "message": "Lorem ipsum dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam",
        "randomKey": 10,
        "__v": 0,
        "color": [
            3,
            121,
            236
        ],
        "date": "2016-08-18T14:09:47.299Z"
    }
};

class Message extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        // style='background-color: rgba(123,32, 60, 0.15);'
        return(
            <div className="message">
                {this.props.data.message}
            </div>
        );
    }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
