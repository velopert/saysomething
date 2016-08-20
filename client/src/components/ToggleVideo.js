import React, { PureComponent, PropTypes } from 'react';

const propTypes = {
    value: PropTypes.bool,
    onToggle: PropTypes.func
};

const defaultProps = {
    value: true,
    onToggle: () => { console.error('onToggle not defined'); }
};

class ToggleVideo extends PureComponent {

    render() {
        const text = this.props.value ? "HIDE VIDEO" : "SHOW VIDEO";

        return(
            <div className="toggle-video"
                onClick={this.props.onToggle}>{text}</div>
        );
    }
}

ToggleVideo.propTypes = propTypes;
ToggleVideo.defaultProps = defaultProps;

export default ToggleVideo;
