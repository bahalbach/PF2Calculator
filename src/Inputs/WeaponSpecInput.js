import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput } from './CommonInputs'

function WeaponSpecPresets(props) {
    // props: diceNum, onChange
    return (
        <div className="Presets WeaponSpecPresets">
            <CheckboxInput className="PresetItem"
                checked={props.weaponSpec.isWSMartial()}
                onChange={props.onChange.bind(null, "WSMartial")}
                label={"Martial"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.weaponSpec.isWSCaster()}
                onChange={props.onChange.bind(null, "WSCaster")}
                label={"Caster"}
            />
        </div>
    );
}

function WeaponSpecInput(props) {
    // props: effect, onChange
    return (
        <div className="InputGroup WeaponSpecInput" >
            <WeaponSpecPresets 
                weaponSpec={props.effect.weaponSpec}
                onChange={props.onChange}
            />
        
        <CollapsableInput
                description={"Weapon Specialization: " + props.effect.weaponSpec.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.weaponSpec}
                        onChange={props.onChange}
                    />
                }
            />
        </div>
    );
}

export default WeaponSpecInput