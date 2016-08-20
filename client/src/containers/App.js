import React, { Component } from 'react';
import { VideoScreen, Sidebar, Input, MessageList } from 'components';

class App extends Component {
    render(){

        return (
            <div>
                {/*<VideoScreen videoUrl="https://www.youtube.com/embed/-2U0Ivkn2Ds?controls=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=-2U0Ivkn2Ds"/>*/}
                <VideoScreen videoUrl={null}/>
                <Sidebar>
                    <MessageList/>
                    <Input/>
                </Sidebar>
            </div>
        );
    }
}

export default App;
