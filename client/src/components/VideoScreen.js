import React, { Component, PropTypes } from 'react';

const propTypes = {
    videoUrl: PropTypes.string
};

const defaultProps = {
    videoUrl: "https://www.youtube.com/embed/njCDZWTI-xg?controls=1&showinfo=0&rel=0&autoplay=1&loop=1&playlist=njCDZWTI-xg"
};

class VideoScreen extends Component {
    render() {
        return (
            <div className="video-background">
                <div className="video-foreground">
                    <iframe src={this.props.videoUrl}></iframe>
                </div>
            </div>
        );
    }
}

VideoScreen.propTypes = propTypes;
VideoScreen.defaultProps = defaultProps;

export default VideoScreen;
