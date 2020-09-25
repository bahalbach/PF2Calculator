import React from 'react';
import { CollapsableInput, SelectDiceNum, SelectDieSize, SelectStaticDam, SelectLevel } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import { selectAdditionalDamage, selectLevel, setAdditionalDamage } from '../effectSlice';
import AdditionalEffect from "../Model/AdditionalEffect";

// presets, barbarian rages, rogue sneak attack, investigator, swashbuckler
// damage, type, condition/s, additional effects

function ByLevelDamageInput(props) {
    // get actionCreator from props, call dispatch with key and index in onChange
    const dispatch = useDispatch();
    const entries = AdditionalEffect.getEntries(props.addDamage);
    const action = props.action;

    let levelList = [];
    for (let i = 0; i < entries.length; i++) {
        levelList.push(
            <div key={i}>
                <SelectLevel value={entries[i][0]}
                    onChange={event => dispatch(action({ key: "EntryLevel", event: event.target.value, index: i }))}
                />
                : { }
                <SelectDiceNum
                    value={entries[i][1]}
                    onChange={event => dispatch(action({ key: "EntryDiceNum", event: event.target.value, index: i }))}
                />
                <SelectDieSize
                    type="number"
                    value={entries[i][2]}
                    onChange={event => dispatch(action({ key: "EntryDieSize", event: event.target.value, index: i }))}
                />
                {" + "} 
                <SelectStaticDam
                    type="number"
                    value={entries[i][3]}
                    onChange={event => dispatch(action({ key: "EntryStaticDam", event: event.target.value, index: i }))}
                />
            </div>
        );
    }
    levelList.push(
        <div key={entries.length}>
            <SelectLevel value={"never"}
                onChange={event => dispatch(action({ key: "EntryLevel", event: event.target.value, index: entries.length }))}
            />
            : { }
            <SelectDiceNum
                value={props.addDamage.extraDiceNum}
                onChange={event => dispatch(action({ key: "EntryDiceNum", event: event.target.value, index: entries.length }))}
            />
            <SelectDieSize
                value={props.addDamage.extraDieSize}
                onChange={event => dispatch(action({ key: "EntryDieSize", event: event.target.value, index: entries.length }))}
            />
            {" + "} 
            <SelectStaticDam
                value={props.addDamage.extraStaticDam}
                onChange={event => dispatch(action({ key: "EntryStaticDam", event: event.target.value, index: entries.length }))}
            />
        </div>
    );
    return levelList;
}



function AdditionalDamageInput() {
    const level = useSelector(selectLevel);
    const addDamage = useSelector(selectAdditionalDamage);

    return (
        <div className="AdditionalDamageInput">
            <CollapsableInput
                description={"AdditionalDamage: " + AdditionalEffect.getDescription(addDamage, level)}
                listInput={
                    <ByLevelDamageInput
                        addDamage={addDamage}
                        action={setAdditionalDamage}
                    />
                }
            />
        </div>
    );
}

export { AdditionalDamageInput }