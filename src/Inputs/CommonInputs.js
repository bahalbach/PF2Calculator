import React from 'react';

function CheckboxInput(props) {
    // props: checked, onChange, label
    return (
        <label className="CheckboxInput">
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.label}
        </label>
    );
}


class CollapsableInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            collapseView: true,
        };
        this.handleClick = this.handleClick.bind(this);
    }

    handleClick(event) {
        this.setState({ collapseView: !this.state.collapseView });
    }

    render() {
        // if (this.state.collapseView) {
        return (
            <div className="CollapsableInput">
                <div
                    className="Description CollapsableInputDescription"
                    onClick={this.handleClick}
                >
                    {this.props.description}
                </div>
                {this.state.collapseView ? "" : this.props.listInput}
                {this.props.after}
            </div>
        );
    }
}

function ByLevelInput(props) {
    // level: value
    let levelList = [];
    for (let i = 1; i <= 20; i++) {
        levelList.push(
            <div key={i}>
                <label> Level {i}: {}
                    <input
                        type="number"
                        value={props.modifier.get(i)}
                        onChange={props.onChange.bind(null, i)}
                    />
                </label>
            </div>
        );
    }
    return levelList;
}

// name, value, onChange
function LevelSelection(props) {
    return (
        <div >
            <label> {props.name + ": "}
                <select value={props.value}
                    onChange={props.onChange}
                >
                    <option value="never">
                        Never
                                </option>
                    <option value="1">
                        1
                                </option>
                    <option value="2">
                        2
                                </option>
                    <option value="3">
                        3
                                </option>
                    <option value="4">
                        4
                                </option>
                    <option value="5">
                        5
                                </option>
                    <option value="6">
                        6
                                </option>
                    <option value="7">
                        7
                                </option>
                    <option value="8">
                        8
                                </option>
                    <option value="9">
                        9
                                </option>
                    <option value="10">
                        10
                                </option>
                    <option value="11">
                        11
                                </option>
                    <option value="12">
                        12
                                </option>
                    <option value="13">
                        13
                                </option>
                    <option value="14">
                        14
                                </option>
                    <option value="15">
                        15
                                </option>
                    <option value="16">
                        16
                                </option>
                    <option value="17">
                        17
                                </option>
                    <option value="18">
                        18
                                </option>
                    <option value="19">
                        19
                                </option>
                    <option value="20">
                        20
                                </option>
                </select>
            </label>
        </div>
    );
}


export { CheckboxInput, CollapsableInput, ByLevelInput, LevelSelection }