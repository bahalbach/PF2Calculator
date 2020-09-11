import React from 'react';
import Proficiency from '../Model/Proficiency';
import { CheckboxInput, CollapsableInput, LevelSelection } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import { selectLevel, selectProficiency, setProficiency } from '../effectSlice';

function ProficiencyPresets(props) {
    const dispatch = useDispatch();
    const prof = props.proficiency;
    const action = props.action;

    return (
        <div className="Presets ProficiencyPresets">
            <CheckboxInput className="PresetItem"
                checked={Proficiency.isFighter(prof)}
                onChange={() => dispatch(action({key: "fighter"}))}
                label={"Fighter"}
            />
            <CheckboxInput className="PresetItem"
                checked={Proficiency.isMartial(prof)}
                onChange={() => dispatch(action({key: "martial"}))}
                label={"Martial"}
            />
            <CheckboxInput className="PresetItem"
                checked={Proficiency.isCaster(prof)}
                onChange={() => dispatch(action({key: "caster"}))}
                label={"Caster"}
            />
            <CheckboxInput className="PresetItem"
                checked={Proficiency.isAlchemist(prof)}
                onChange={() => dispatch(action({key: "alchemist"}))}
                label={"Alchemist/Warpriest"}
            />
        </div>
    );
}

function ProficiencyInputList(props) {
    const dispatch = useDispatch();
    const prof = props.proficiency;
    const action = props.action;

    let profList = Proficiency.getProficiencies(prof).map(
        (profValue, index) => {
            if (index === 0) {
                return (
                    <div key="initial">
                        <label> Initial: {}
                            <select
                                value={Proficiency.getInitial(prof)}
                                onChange={event => dispatch(action({ key: "initial", event: event.target.value }))}
                            >
                                <option value="0">
                                    Untrained
                                </option>
                                <option value="1">
                                    Trained
                                </option>
                                <option value="2">
                                    Expert
                                </option>
                                <option value="3">
                                    Master
                                </option>
                                <option value="4">
                                    Legendary
                                </option>
                            </select>
                        </label>
                    </div>
                );
            } else {
                let value = Proficiency.getLevelAcquired(prof, profValue);
                if (value === null) value = "never";
                return (
                    <LevelSelection key={profValue} name={Proficiency.toName(profValue)}
                        value={value} onChange={event => dispatch(action({ key: profValue, event: event.target.value }))}
                    />
                );
            }
        }
    );
    const profMax = Proficiency.getMax(prof);
    if (profMax < 4) {
        profList.push(<LevelSelection key={profMax + 1} name={Proficiency.toName(profMax + 1)}
            value="never" onChange={event => dispatch(action({ key: profMax + 1, event: event.target.value }))}
        />);
    }

    return (
        <div className="ProficiencyInputList">
            {profList}
        </div>
    );

}

function WeaponProficiencyInput() {
    const level = useSelector(selectLevel);
    const proficiency = useSelector(selectProficiency);

    return (
        <div className="InputGroup WeaponProficiencyInput">
            <ProficiencyPresets
                proficiency={proficiency}
                action={setProficiency}
            />
            <CollapsableInput
                description={"Proficiency: " + Proficiency.getDescription(proficiency, level)}
                listInput={
                    <ProficiencyInputList
                        proficiency={proficiency}
                        action={setProficiency}
                    />
                }
            />
        </div>
    );
}

export { WeaponProficiencyInput }