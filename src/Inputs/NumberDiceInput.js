import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput, ByLevelInput2 } from './CommonInputs'

function WeaponDiceNumPresets(props) {
    // props: diceNum, onChange
    return (
        <div className="Presets WeaponDiceNumPresets">
            <CheckboxInput className="PresetItem"
                checked={props.diceNum.isABPWeaponDiceNum()}
                onChange={props.onChange.bind(null, "ABPWeaponDiceNum")}
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
                onChange={props.onChange.bind(null,null)}
            />
        
        <CollapsableInput
                description={"Weapon Dice: " + props.effect.weaponDiceNum.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput2
                        modifier={props.effect.weaponDiceNum}
                        onChange={props.onChange}
                    />
                }
            />
        </div>
    );
}

export { WeaponDiceNumInput }