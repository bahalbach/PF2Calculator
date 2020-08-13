import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput } from './CommonInputs'

function WeaponDiceNumPresets(props) {
    // props: diceNum, onChange
    return (
        <div className="Presets WeaponDiceNumPresets">
            <CheckboxInput className="PresetItem"
                checked={props.diceNum.isABPWeapon()}
                onChange={props.onChange.bind(null, "ABPWeapon")}
                label={"ABP Weapon"}
            />
        </div>
    );
}

function WeaponDiceNumInput(props) {
    // props: effect, onChange
    return (
        <div className="InputGroup WeaponDiceNumInput" >
            <WeaponDiceNumPresets 
                diceNum={props.effect.weaponDiceNum}
                onChange={props.onChange}
            />
        
        <CollapsableInput
                description={"Weapon Dice: " + props.effect.weaponDiceNum.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.weaponDiceNum}
                        onChange={props.onChange}
                    />
                }
            />
        </div>
    );
}

export { WeaponDiceNumInput }