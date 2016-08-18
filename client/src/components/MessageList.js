import React, { Component, PropTypes } from 'react';
import { Message } from 'components';
import { Scrollbars } from 'react-custom-scrollbars';

const propTypes = {

};

const defaultProps = {

};

class MessageList extends React.Component {

    constructor(props) {
        super(props);
    }

    renderThumb() {
        const thumbStyle = {
            backgroundColor: "white"
        };

        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );




    }

    render() {
        return(
            <div className="message-list">
                <Scrollbars style={{width: '100%', height: '100%'}}>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                    <Message/>
                </Scrollbars>
            </div>
        );
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;
