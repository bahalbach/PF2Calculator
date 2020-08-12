import React from 'react';
import Proficiency from '../Model/Proficiency';
import { CheckboxInput, CollapsableInput, LevelSelection } from './CommonInputs'

function ProficiencyPresets(props) {
    return (
        <div className="Presets ProficiencyPresets">
            <CheckboxInput className="PresetItem"
                checked={props.proficiency.isFighter()}
                onChange={props.onChange.bind(null, "fighter")}
                label={"Fighter"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.proficiency.isMartial()}
                onChange={props.onChange.bind(null, "martial")}
                label={"Martial"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.proficiency.isCaster()}
                onChange={props.onChange.bind(null, "caster")}
                label={"Caster"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.proficiency.isAlchemist()}
                onChange={props.onChange.bind(null, "alchemist")}
                label={"Alchemist/Warpriest"}
            />
        </div>
    );
}

function ProficiencyInputList(props) {
    // props: proficiency, onChange
    
    let prof = props.proficiency;

    let profList = prof.getProficiencies().map(
        (profValue, index) => {
            if (index === 0) {
                return (
                    <div key="initial">
                        <label> Initial: {}
                            <select
                                value={prof.getInitial()}
                                onChange={props.onChange.bind(null,"initial")}
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
                let value = prof.getLevelAcquired(profValue);
                if (value === null) value = "never";
                return (
                    <LevelSelection key={profValue} name={Proficiency.toName(profValue)}
                        value={value} onChange={props.onChange.bind(null, profValue)}
                    />
                );
            }
        }
    );
    if (prof.getMax() < 4) {
        profList.push(<LevelSelection key={prof.getMax() + 1} name={Proficiency.toName(prof.getMax() + 1)}
            value="never" onChange={props.onChange.bind(null, prof.getMax() + 1)}
        />);
    }

    return (
        <div className="ProficiencyInput">
            {profList}
        </div>
    );

}

function WeaponProficiencyInput(props) {
    // props: effect, onEffectChange, selectedLevel
    return (
        <div className="InputGroup WeaponProficiencyInput">
            <ProficiencyPresets
                proficiency={props.effect.proficiency}
                onChange={props.onEffectChange.bind(null, "proficiency")}
            />
            <CollapsableInput
                description={"Proficiency: " + props.effect.proficiency.getDescription(props.selectedLevel)}
                listInput={
                    <ProficiencyInputList
                        proficiency={props.effect.proficiency}
                        onChange={props.onEffectChange.bind(null, "proficiency")}
                    />
                }
            />
        </div>
    );
}

export { WeaponProficiencyInput }