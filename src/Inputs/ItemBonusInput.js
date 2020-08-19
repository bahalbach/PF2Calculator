import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'

function ItemBonusPresets(props) {
    return (
        <div className="Presets ItemBonusPresets">
            <CheckboxInput className="PresetItem"
                checked={props.itemBonus.isNone()}
                onChange={props.onChange.bind(null, "None")}
                label={"None"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.itemBonus.isABPWeaponBonus()}
                onChange={props.onChange.bind(null, "ABPWeaponBonus")}
                label={"ABP Weapon"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.itemBonus.isABPSkill1()}
                onChange={props.onChange.bind(null, "ABPSkill1")}
                label={"ABP Skill Item 1"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.itemBonus.isABPSkill2()}
                onChange={props.onChange.bind(null, "ABPSkill2")}
                label={"ABP Skill Item 2"}
            />
        </div>
    );
}

function ItemBonusInput(props) {
    return (
        <div className="InputGroup ItemBonusInput">
            <ItemBonusPresets
                itemBonus={props.effect.itemBonus}
                onChange={props.onChange.bind(null,null)}
            />
            <CollapsableInput
                description={"Item Bonus: " + props.effect.itemBonus.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput2
                        modifier={props.effect.itemBonus}
                        onChange={props.onChange}
                    />
                }
            />
        </div >
    );
}

export default ItemBonusInput