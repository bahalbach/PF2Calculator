import React from 'react';
import { CheckboxInput, CollapsableInput, SelectLevel } from './CommonInputs'
let runeNames = ["Fire", "Ice", "Shock", "Keen"];

function SelectRuneName(props) {
    let optionList = [];
    for (let i=0; i<runeNames.length; i++) {
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
    // props: runes, onChange

    const runes = props.runes;
    let rows = [];
    for (let i = 0; i < runes.length; i++) {
        rows.push(
            <div key={i}>
                <SelectRuneName 
                    value={runes.getName(i)}
                    onChange={props.onChange.bind(null, i, "EntryName")}
                />
                <SelectLevel value={runes.getLevelAdded(i)}
                    onChange={props.onChange.bind(null, i, "LevelAdded")}
                />
                <SelectLevel value={runes.getLevelRemoved(i)}
                    onChange={props.onChange.bind(null, i, "LevelRemoved")}
                />
            </div>
        );
    }
    rows.push(
        <div key={runes.length}>
            <SelectRuneName 
                    value={runes.getName(runes.length)}
                    onChange={props.onChange.bind(null, runes.length, "EntryName")}
                />
            <SelectLevel value={runes.getLevelAdded(runes.length)}
                onChange={props.onChange.bind(null, runes.length, "LevelAdded")}
            />
            <SelectLevel value={runes.getLevelRemoved(runes.length)}
                onChange={props.onChange.bind(null, runes.length, "LevelRemoved")}
            />
        </div>
    );

    return (
        <div className="Runes">
            {rows}
        </div>
    );
}

function RuneInput(props) {
    // props: effect, onChange, selectedLevel
    const runes = props.effect.runes;


    return (
        <div className="RuneInput">
            <CollapsableInput
                description={runes.getDescription()}
                listInput={
                    <RuneTable
                        runes={runes}
                        onChange={props.onChange}
                    />
                }

            />
        </div>

    );
}

export default RuneInput