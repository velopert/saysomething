import React, { Component } from 'react';
import { VideoScreen, Sidebar, Input, MessageList, ToggleVideo } from 'components';
import { connect } from 'react-redux';
import { fetchMessage, writeMessage, toggleLoading } from 'actions/message';
import { getSession } from 'actions/session';
import * as uiActions from 'actions/ui';

class App extends Component {

    componentDidMount() {
        
        // GET THE SESSION
        this.props.sessionEvents.get();
        // FETCH THE INTIAL DATA
        this.props.msgEvents.fetch({initial: true });
        
        // BIND THE METHODS
        this.handleWrite = this.handleWrite.bind(this);
        this.fetchHistory = this.fetchHistory.bind(this);

    }

    handleWrite() {
        if(this.props.ui.Input.value.length === 0) return;

        function generateUID() {
            return (new Date().valueOf()).toString(36)
                + ("000" + (Math.random() * Math.pow(36,3) << 0).toString(36)).slice(-3);
        }

        this.props.msgEvents.write({message: this.props.ui.Input.value, uid: generateUID(), session: this.props.session, scroll: this.MessageList.scrollToBottom});
    }
    
    
    fetchHistory() {
        // WHEN LOADING OLDER DATA, THE PIVOT IS THE FIRST ITEM SHOWN IN THE LIST
        this.props.msgEvents.fetch({initial: false, latest: false, pivot: this.props.message.data[0]._id});
    }

    render(){
        return (
            <div>
                <VideoScreen videoUrl="https://www.youtube.com/embed/-2U0Ivkn2Ds?controls=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=-2U0Ivkn2Ds"
                    visibility={this.props.ui.Video.visibility}/>
                <ToggleVideo onToggle={this.props.uiEvents.Video.toggle}
                    value={this.props.ui.Video.visibility}/>
                <Sidebar>
                    <MessageList data={this.props.message.data}
                        tempData={this.props.message.tempData}
                        ref={(ref) => {this.MessageList = ref;}}
                        isAtTop={this.props.message.isAtTop}
                        toggleLoading={this.props.msgEvents.toggleLoading}
                        loadingHistory={this.props.message.loadingHistory}
                        fetchHistory={this.fetchHistory}
                        fetchedHistory={this.props.message.fetchedHistory}/>
                    <Input
                        change={this.props.uiEvents.Input.change}
                        value={this.props.ui.Input.value}
                        onWrite={this.handleWrite}/>
                </Sidebar>
            </div>
        );
    }
}

function mapStateToProps(state) {
    return {
        ui: state.ui,
        message: state.message,
        session: state.session.session
    };
}

function mapDispatchToProps(dispatch) {
    return {
        uiEvents: {
            Input: {
                change: (payload) => dispatch(uiActions.changeMessageInput(payload))
            },
            Video: {
                toggle: () => dispatch(uiActions.toggleVideo())
            }
        },
        sessionEvents: {
            get: () => dispatch(getSession())
        },
        msgEvents: {
            fetch: (payload) => dispatch(fetchMessage(payload)),
            write: (payload) => dispatch(writeMessage(payload)),
            toggleLoading: () => dispatch(toggleLoading())
        }
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
