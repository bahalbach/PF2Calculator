import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import {
    selectLevel,
    setItemBonus,
    selectItemBonus,
  } from '../effectSlice';
import Modifier from '../Model/Modifier';

function ItemBonusPresets(props) {
    const dispatch = useDispatch();
    const action = props.action;
    return (
        <div className="Presets ItemBonusPresets">
            <CheckboxInput className="PresetItem"
                checked={Modifier.isNone(props.itemBonus)}
                onChange={() => dispatch(action({key: "None"}))}
                label={"None"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.isABPWeaponBonus(props.itemBonus)}
                onChange={() => dispatch(action({key: "ABPWeaponBonus"}))}  
                label={"ABP Weapon"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.isABPSkill1(props.itemBonus)}
                onChange={() => dispatch(action({key: "ABPSkill1"}))}
                label={"ABP Skill Item 1"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.isABPSkill2(props.itemBonus)}
                onChange={() => dispatch(action({key: "ABPSkill2"}))}
                label={"ABP Skill Item 2"}
            />
        </div>
    );
}

function ItemBonusInput() {
    const level = useSelector(selectLevel);
    const itemBonus = useSelector(selectItemBonus);

    return (
        <div className="InputGroup ItemBonusInput">
            <ItemBonusPresets
                itemBonus={itemBonus}
                action={setItemBonus}
            />
            <CollapsableInput
                description={"Item Bonus: " + Modifier.getDescription(itemBonus, level)}
                listInput={
                    <ByLevelInput2
                        modifier={itemBonus}
                        action={setItemBonus}
                    />
                }
            />
        </div >
    );
}

export default ItemBonusInput