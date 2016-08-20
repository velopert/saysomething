import React, { PureComponent, PropTypes } from 'react';
import { Message, Spinner } from 'components';
import { Scrollbars } from 'react-custom-scrollbars';

const propTypes = {
    data: PropTypes.array,
    tempData: PropTypes.array,
    loadingHistory: PropTypes.bool,
    toggleLoading: PropTypes.func,
    isAtTop: PropTypes.bool,
    fetchHistory: PropTypes.func
};

const defaultProps = {
    data: [],
    tempData: [],
    loadingHistory: false,
    toggleLoading: () => { console.error('toggleLoading not defined'); },
    isAtTop: false,
    fetchHistory: () => { console.error('fetchHistory not defined');}
};

class MessageList extends PureComponent {

    constructor(props) {
        super(props);
        this.handleScroll = this.handleScroll.bind(this);
        this.scrollToBottom = this.scrollToBottom.bind(this);
        this.state = {
            initScrolled: false,
            previousHeight: 0
        };
    }

    componentDidUpdate(prevProps, prevState) {
        if(prevProps.data.length !== this.props.data.length) {
            if(this.props.fetchedHistory) {
                this.element.scrollTop(this.element.getScrollHeight() - this.state.previousHeight);
            }



            // scroll to bottom
            if(this.element.getScrollHeight() - this.element.refs.view.clientHeight - this.element.getScrollTop() < 200 || !this.state.initScrolled) {
                this.scrollToBottom();
                if(!this.state.initScrolled) {
                    this.setState({
                        initScrolled: true
                    });
                }
            }

            if(this.state.previousHeight !== this.element.getScrollHeight()) {
                this.setState({previousHeight: this.element.getScrollHeight()});
            }


        }

        if(prevProps.tempData.length < this.props.tempData.length) {
            this.scrollToBottom();
        };
    }

    handleScroll(e) {
        //this.props.data.length >= 25 && !this.props.isAtTop
        if(this.element.getScrollTop() <= 60 && !this.props.loadingHistory
            && this.props.data.length >= 25 && !this.props.isAtTop) {
            this.props.fetchHistory();
            this.props.toggleLoading();
        }
    }

    renderThumb({ style, ...props }) {
        const thumbStyle = {
            backgroundColor: 'rgba(255,255, 255, 0.8)',
            borderRadius: '3px'
        };

        return (
            <div
                style={{ ...style, ...thumbStyle }}
                {...props}/>
        );
    }

    scrollToBottom() {
        this.element.scrollTop(this.element.getScrollHeight());
    }

    mapDataToMessages(data) {
        return data.map(
            (message) => {
                return (
                    <Message data={message} key={message.uid}/>
                );
            }
        )
    }

    render() {

        const spinnerVisibility = (this.props.data.length >= 25 && !this.props.isAtTop);

        return(
            <div className="message-list" >
                <Scrollbars style={{width: '100%', height: '100%'}}
                    renderThumbVertical={this.renderThumb}
                    ref={(ref)=>{this.element = ref}}
                    onScroll={this.handleScroll}>
                    <Spinner visible={spinnerVisibility}/>
                    {this.mapDataToMessages(this.props.data)}
                    {this.mapDataToMessages(this.props.tempData)}
                </Scrollbars>
            </div>
        );
    }
}

MessageList.propTypes = propTypes;
MessageList.defaultProps = defaultProps;

export default MessageList;
