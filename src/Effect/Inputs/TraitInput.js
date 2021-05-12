import React from 'react';
import { CollapsableInput, SelectLevel } from './CommonInputs.js';
import { runeNames, weaponTraitNames } from '../Model/Features.js';
import { useSelector, useDispatch } from 'react-redux';
import { setRunes, selectRunes, selectWeaponTraits, setWeaponTraits } from '../effectSlice.js';
import AdditionalEffectArray from '../Model/AdditionalEffectArray.js';

function SelectWeaponTraitName(props) {
    let optionList = [];
    for (let i = 0; i < weaponTraitNames.length; i++) {
        optionList.push(
            <option key={weaponTraitNames[i]}
                value={weaponTraitNames[i]}>
                {weaponTraitNames[i]}
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

function WeaponTraitTable(props) {
    const dispatch = useDispatch();
    const traits = props.traits;
    const action = props.action;
    
    let rows = [];
    for (let index = 0; index <= traits.length; index++) {
        rows.push(
            <tr key={index}>
                <td>
                    <SelectWeaponTraitName
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

function WeaponTraitInput() {
    // props: effect, onChange, selectedLevel
    const traits = useSelector(selectWeaponTraits); // props.effect.runes;

    return (
        <div className="TraitInput">
            <CollapsableInput
                description={"Weapon Traits: " + AdditionalEffectArray.getDescription(traits)}
                listInput={
                    <WeaponTraitTable
                        traits={traits}
                        action={setWeaponTraits}
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

export { WeaponTraitInput, RuneInput } 