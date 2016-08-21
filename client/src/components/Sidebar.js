import React, { PureComponent, PropTypes } from 'react';

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


export default Sidebar;
