import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import { selectWeaponSpec, selectLevel, setWeaponSpec } from '../effectSlice';
import Modifier from '../Model/Modifier';

function WeaponSpecPresets(props) {
    const dispatch = useDispatch();

    return (
        <div className="Presets WeaponSpecPresets">
            <CheckboxInput className="PresetItem"
                checked={Modifier.isWSMartial(props.weaponSpec)}
                onChange={() => dispatch(props.action({key: "WSMartial"}))}
                label={"Martial"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.isWSCaster(props.weaponSpec)}
                onChange={() => dispatch(props.action({key: "WSCaster"}))}
                label={"Caster"}
            />
        </div>
    );
}

function WeaponSpecInput() {
    const weaponSpec = useSelector(selectWeaponSpec);
    const level = useSelector(selectLevel);

    return (
        <div className="InputGroup WeaponSpecInput" >
            <WeaponSpecPresets 
                weaponSpec={weaponSpec}
                action={setWeaponSpec}
            />
        
        <CollapsableInput
                description={"Weapon Specialization: " + Modifier.getDescription(weaponSpec, level)}
                listInput={
                    <ByLevelInput2
                        modifier={weaponSpec}
                        action={setWeaponSpec}
                    />
                }
            />
        </div>
    );
}

export default WeaponSpecInput