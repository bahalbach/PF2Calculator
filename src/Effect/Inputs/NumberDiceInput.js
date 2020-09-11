import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs';
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLevel,
  setWeaponDiceNum,
  selectWeaponDiceNum,
} from '../effectSlice';
import Modifier from '../Model/Modifier';

function WeaponDiceNumPresets(props) {
    const dispatch = useDispatch();
    const action = props.action;
    return (
        <div className="Presets WeaponDiceNumPresets">
            <CheckboxInput className="PresetItem"
                checked={Modifier.isABPWeaponDiceNum(props.diceNum)}
                onChange={() => dispatch(action({key: "ABPWeaponDiceNum"}))}
                label={"ABP Weapon"}
            />
        </div>
    );
}

function WeaponDiceNumInput(props) {
    const weaponDiceNum = useSelector(selectWeaponDiceNum);
    const level = useSelector(selectLevel);
    return (
        <div className="InputGroup WeaponDiceNumInput" >
            <WeaponDiceNumPresets 
                diceNum={weaponDiceNum}
                action={setWeaponDiceNum}
            />
        
        <CollapsableInput
                description={"Weapon Dice: " + Modifier.getDescription(weaponDiceNum, level)}
                listInput={
                    <ByLevelInput2
                        modifier={weaponDiceNum}
                        action={setWeaponDiceNum}
                    />
                }
            />
        </div>
    );
}

export { WeaponDiceNumInput }