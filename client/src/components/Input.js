import React, { PureComponent, PropTypes } from 'react';

const propTypes = {
    value: PropTypes.string,
    change: PropTypes.func,
    onWrite: PropTypes.func
};

const defaultProps = {
    value: '',
    change: () => { console.error('onChange not defined'); },
    onWrite: () => { console.error('onWrite not defined'); }
};

class Input extends PureComponent {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleKeyPress = this.handleKeyPress.bind(this);
    }

    componentDidMount() {
        this.input.focus();
    }

    handleChange(e) {
        if(e.target.value.length < 50)
            this.props.change(e.target.value);
    }

    handleKeyPress(e) {
        if(e.charCode === 13) {
            this.props.onWrite();
            this.props.change('');
        }
    }

    render() {
        return(
            <div className="input-container">
                <input
                    type="text"
                    name="message"
                    value={this.props.value}
                    onChange={this.handleChange}
                    onKeyPress={this.handleKeyPress}
                    ref={(ref) => {this.input = ref}}/>
            </div>
        );
    }
}

Input.propTypes = propTypes;
Input.defaultProps = defaultProps;

export default Input;
