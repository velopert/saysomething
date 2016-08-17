import React, { Component, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {

};

class MessageList extends React.Component {

    constructor(props) {
        super(props);
    }

    render() {
        return(
            <div className="message-list custom-scrollbar">

            </div>
        );
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;
