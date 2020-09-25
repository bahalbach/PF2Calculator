import React from 'react';
import { CollapsableInput, SelectLevel } from './CommonInputs.js';
import { runeNames, traitNames } from '../Model/Features.js';
import { useSelector, useDispatch } from 'react-redux';
import { setRunes, selectRunes, selectTraits, setTraits } from '../effectSlice.js';
import AdditionalEffectArray from '../Model/AdditionalEffectArray.js';

function SelectTraitName(props) {
    let optionList = [];
    for (let i = 0; i < traitNames.length; i++) {
        optionList.push(
            <option key={traitNames[i]}
                value={traitNames[i]}>
                {traitNames[i]}
            </option>
        );
    }
    return (

        <select
            value={props.value}
            onChange={props.onChange}
        >
            <option value="None">
                None
            </option>
            {optionList}
        </select>

    );
}

function SelectRuneName(props) {
    let optionList = [];
    for (let i = 0; i < runeNames.length; i++) {
        optionList.push(
            <option key={runeNames[i]}
                value={runeNames[i]}>
                {runeNames[i]}
            </option>
        );
    }
    return (

        <select
            value={props.value}
            onChange={props.onChange}
        >
            <option value="None">
                None
            </option>
            {optionList}
        </select>

    );
}

function TraitTable(props) {
    const dispatch = useDispatch();
    const traits = props.traits;
    const action = props.action;
    
    let rows = [];
    for (let index = 0; index <= traits.length; index++) {
        rows.push(
            <tr key={index}>
                <td>
                    <SelectTraitName
                        value={AdditionalEffectArray.getName(traits, index)}
                        onChange={event => dispatch(action({key: "EntryName", index, event: event.target.value}))} 
                    />
                </td>
                <td>
                    <SelectLevel value={AdditionalEffectArray.getLevelAdded(traits, index)}
                        onChange={event => dispatch(action({key: "LevelAdded", index, event: event.target.value}))} 
                    />
                </td>
                <td>
                    <SelectLevel value={AdditionalEffectArray.getLevelRemoved(traits, index)}
                        onChange={event => dispatch(action({key: "LevelRemoved", index, event: event.target.value}))} 
                    />
                </td>
            </tr>
        );
    }

    return (
        <div className="Traits">
            <table>
                <thead>
                    <tr>
                        <th>Trait Name</th>
                        <th>Level Added</th>
                        <th>Level Removed</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

function RuneTable(props) {
    const dispatch = useDispatch();
    const traits = props.traits;
    const action = props.action;
    
    let rows = [];
    for (let index = 0; index <= traits.length; index++) {
        rows.push(
            <tr key={index}>
                <td>
                    <SelectRuneName
                        value={AdditionalEffectArray.getName(traits, index)}
                        onChange={event => dispatch(action({key: "EntryName", index, event: event.target.value}))} 
                    />
                </td>
                <td>
                    <SelectLevel value={AdditionalEffectArray.getLevelAdded(traits, index)}
                        onChange={event => dispatch(action({key: "LevelAdded", index, event: event.target.value}))} 
                    />
                </td>
                <td>
                    <SelectLevel value={AdditionalEffectArray.getLevelRemoved(traits, index)}
                        onChange={event => dispatch(action({key: "LevelRemoved", index, event: event.target.value}))} 
                    />
                </td>
            </tr>
        );
    }

    return (
        <div className="Runes">
            <table>
                <thead>
                    <tr>
                        <th>Rune Name</th>
                        <th>Level Added</th>
                        <th>Level Removed</th>
                    </tr>
                </thead>
                <tbody>
                    {rows}
                </tbody>
            </table>
        </div>
    );
}

function TraitInput() {
    // props: effect, onChange, selectedLevel
    const traits = useSelector(selectTraits); // props.effect.runes;

    return (
        <div className="TraitInput">
            <CollapsableInput
                description={"Traits: " + AdditionalEffectArray.getDescription(traits)}
                listInput={
                    <TraitTable
                        traits={traits}
                        action={setTraits}
                    />
                }

            />
        </div>

    );
}

function RuneInput() {
    // props: effect, onChange, selectedLevel
    const traits = useSelector(selectRunes); // props.effect.runes;

    return (
        <div className="TraitInput">
            <CollapsableInput
                description={"Runes: " + AdditionalEffectArray.getDescription(traits)}
                listInput={
                    <RuneTable
                        traits={traits}
                        action={setRunes}
                    />
                }

            />
        </div>

    );
}

export { TraitInput, RuneInput } 