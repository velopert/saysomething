import React, { PureComponent, PropTypes } from 'react';

const propTypes = {
    data: PropTypes.object
};

const defaultProps = {
    data:  {
    "_id": "57b827c05b8da9d8388d8ee9",
    "message": "Hi",
    "uid": "is2w2iowjw9",
    "__v": 0,
    "color": [
      0,
      231,
      155
    ],
    "date": "2016-08-20T09:49:52.405Z"
  }
};

class Message extends PureComponent {

    constructor(props) {
        super(props);
    }

    render() {
        const { message, color, _id } = this.props.data;
        const opacity = (_id==="") ? 0.27 : 0.35;

        const style = {
            backgroundColor: `rgba(${color[0]},${color[1]},${color[2]},${opacity})`
        }

        return(
            <div className="message" style={style}>
                {message}
            </div>
        );
    }
}

Message.propTypes = propTypes;
Message.defaultProps = defaultProps;

export default Message;
