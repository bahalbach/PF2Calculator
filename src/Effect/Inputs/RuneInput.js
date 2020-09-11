import React from 'react';
import { CheckboxInput, CollapsableInput, SelectLevel } from './CommonInputs.js';
import { runeNames } from '../Model/Features.js';
import { useSelector, useDispatch } from 'react-redux';
import { setRunes, selectRunes } from '../effectSlice.js';
import AdditionalEffectArray from '../Model/AdditionalEffectArray.js';


function SelectRuneName(props) {
    let optionList = [];
    for (let i = 0; i < runeNames.length; i++) {
        optionList.push(
            <option value={runeNames[i]}>
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

function RuneTable(props) {
    const dispatch = useDispatch();
    const runes = props.runes;
    const action = props.action;
    
    let rows = [];
    for (let index = 0; index <= runes.length; index++) {
        rows.push(
            <tr key={index}>
                <td>
                    <SelectRuneName
                        value={AdditionalEffectArray.getName(runes, index)}
                        onChange={event => dispatch(action({key: "EntryName", index, event: event.target.value}))} 
                    />
                </td>
                <td>
                    <SelectLevel value={AdditionalEffectArray.getLevelAdded(runes, index)}
                        onChange={event => dispatch(action({key: "LevelAdded", index, event: event.target.value}))} 
                    />
                </td>
                <td>
                    <SelectLevel value={AdditionalEffectArray.getLevelRemoved(runes, index)}
                        onChange={event => dispatch(action({key: "LevelRemoved", index, event: event.target.value}))} 
                    />
                </td>
            </tr>
        );
    }
    // rows.push(
    //     <div key={runes.length}>
    //         <SelectRuneName 
    //                 value={runes.getName(runes.length)}
    //                 onChange={props.onChange.bind(null, runes.length, "EntryName")}
    //             />
    //         <SelectLevel value={runes.getLevelAdded(runes.length)}
    //             onChange={props.onChange.bind(null, runes.length, "LevelAdded")}
    //         />
    //         <SelectLevel value={runes.getLevelRemoved(runes.length)}
    //             onChange={props.onChange.bind(null, runes.length, "LevelRemoved")}
    //         />
    //     </div>
    // );

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

function RuneInput() {
    // props: effect, onChange, selectedLevel
    const runes = useSelector(selectRunes); // props.effect.runes;

    return (
        <div className="RuneInput">
            <CollapsableInput
                description={AdditionalEffectArray.getDescription(runes)}
                listInput={
                    <RuneTable
                        runes={runes}
                        action={setRunes}
                    />
                }

            />
        </div>

    );
}

export default RuneInput