import React from 'react';

class CollapsableInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseView: false,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({collapseView: !this.state.collapseView});
    }

    render() {
        if (this.state.collapseView) {
            return (
                <div className="CollapsableInput">
                    <div onClick={this.handleClick}>
                        {this.props.description}
                    </div>
                </div>
            );
        } else {
            return (
                <div className="CollapsableInput">
                    <div onClick={this.handleClick}>
                        {this.props.description}
                    </div>
                    {this.props.listInput}
                </div>
            );
        }
    }
}

export default CollapsableInput