import React from 'react';
import { useDispatch } from 'react-redux';
import Modifier from '../Model/Modifier';

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
                    className={this.state.collapseView ? "Description CollapsableInputDescription Collapsed" : "Description CollapsableInputDescription Open"}
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
    const dispatch = useDispatch();
    const action = props.action;

    let levelList = [];
    for (let i = 1; i <= 20; i++) {
        levelList.push(
            <div key={i}>
                <label> Level {i}: {}
                    <input
                        type="number"
                        value={Modifier.get(props.modifier, i)}
                        onChange={event => dispatch(action({ key: i, event: event.target.value }))}
                    />
                </label>
            </div>
        );
    }
    return levelList;
}

function ByLevelInput2(props) {
    // get actionCreator from props, call dispatch with key and index in onChange
    const dispatch = useDispatch();
    const entries = Modifier.getByLevelEntries(props.modifier);
    const action = props.action;

    let levelList = [];
    for (let i = 0; i < entries.length; i++) {
        levelList.push(
            <div key={i}>
                <SelectLevel value={entries[i][0]}
                    onChange={event => dispatch(action({ key: "EntryLevel", event: event.target.value, index: i }))}
                />
                <input
                    type="number"
                    value={entries[i][1]}
                    onChange={event => dispatch(action({ key: "EntryValue", event: event.target.value, index: i }))}
                />
            </div>
        );
    }
    levelList.push(
        <div key={entries.length}>
            <SelectLevel value={"never"}
                onChange={event => dispatch(action({ key: "EntryLevel", event: event.target.value, index: entries.length }))}
            />
            <input
                type="number"
                value={props.modifier.extra}
                onChange={event => dispatch(action({ key: "EntryValue", event: event.target.value, index: entries.length }))}
            />
        </div>
    );
    return levelList;
}

// name, value, onChange
function LevelSelection(props) {
    return (
        <div >
            <label> {props.name + ": "}
                <SelectLevel value={props.value}
                    onChange={props.onChange}
                />
            </label>
        </div>
    );
}

function SelectLevel(props) {
    // const dispatch = useDispatch();
    // const action = props.action;
    // const key = props.key;

    return (
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

    );
}

function SelectDiceNum(props) {
    return (
        <select value={props.value}
            onChange={props.onChange}
        >
            <option value="0">
                0
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
            {/* <option value="11">
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
            </option> */}
        </select>
    );
}

function SelectDieSize(props) {
    return (
        <select value={props.value}
            onChange={props.onChange}
        >
            <option value="4">
                d4
            </option>
            <option value="6">
                d6
            </option>
            <option value="8">
                d8
            </option>
            <option value="10">
                d10
            </option>
            <option value="12">
                d12
            </option>
            <option value="20">
                d20
            </option>
        </select>
    );
}

function SelectStaticDam(props) {
    return (
        <select value={props.value}
            onChange={props.onChange}
        >
            <option value="0">
                0
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
    );
}


export { CheckboxInput, CollapsableInput, ByLevelInput, ByLevelInput2, SelectLevel, SelectDiceNum, SelectDieSize, SelectStaticDam, LevelSelection }