import React, { PureComponent, PropTypes } from 'react';

const propTypes = {

};

const defaultProps = {

};

class Sidebar extends PureComponent {


    render() {
        return(
            <div className="sidebar">
                <div className="logo">SaySomething.</div>
                {this.props.children}
            </div>
        );
    }


}

Sidebar.propTypes = propTypes;
Sidebar.defaultProps = defaultProps;

export default Sidebar;
