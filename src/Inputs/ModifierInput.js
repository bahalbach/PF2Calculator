import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput } from './CommonInputs'

function BonusPresets(props) {
    return (
        <div className="Presets BonusPresets">
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(0)}
                onChange={props.onChange.bind(null, "0")}
                label={"+0"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(1)}
                onChange={props.onChange.bind(null, "+1")}
                label={"+1"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(2)}
                onChange={props.onChange.bind(null, "+2")}
                label={"+2"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(3)}
                onChange={props.onChange.bind(null, "+3")}
                label={"+3"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(4)}
                onChange={props.onChange.bind(null, "+4")}
                label={"+4"}
            />
        </div>
    );
}

function PenaltyPresets(props) {
    return (
        <div className="Presets PenaltyPresets">
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(0)}
                onChange={props.onChange.bind(null, "0")}
                label={"-0"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(1)}
                onChange={props.onChange.bind(null, "+1")}
                label={"-1"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(2)}
                onChange={props.onChange.bind(null, "+2")}
                label={"-2"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(3)}
                onChange={props.onChange.bind(null, "+3")}
                label={"-3"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.modifier.is(4)}
                onChange={props.onChange.bind(null, "+4")}
                label={"-4"}
            />
        </div>
    );
}

/* <CheckboxInput
                checked={props.effect.useMiscModifiers.isTrue()}
                onChange={props.onEffectChange.bind(null, "useMiscModifiers")}
                label="Add Circumstance/Status Bonuses/Penalties"
            /> */

function ModifierInput(props) {
    // props: effect, onEffectChange
    return (
        <div className="InputGroup ModifierInput" >
            <CollapsableInput 
            description="Add Circumstance/Status Bonuses/Penalties"
            listInput={
                <div className="ModifierInputList">
            <BonusPresets
                modifier={props.effect.statusBonus}
                onChange={props.onEffectChange.bind(null, "statusBonus")}
            />
            <CollapsableInput
                description={"Status Bonus: " + props.effect.statusBonus.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.statusBonus}
                        onChange={props.onEffectChange.bind(null, "statusBonus")}
                    />
                }
            />

            <BonusPresets
                modifier={props.effect.circumstanceBonus}
                onChange={props.onEffectChange.bind(null, "circumstanceBonus")}
            />
            <CollapsableInput
                description={"Cicumstance Bonus: " + props.effect.circumstanceBonus.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.circumstanceBonus}
                        onChange={props.onEffectChange.bind(null, "circumstanceBonus")}
                    />
                }
            />

            <PenaltyPresets
                modifier={props.effect.statusPenalty}
                onChange={props.onEffectChange.bind(null, "statusPenalty")}
            />
            <CollapsableInput
                description={"Status Penalty: " + props.effect.statusPenalty.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.statusPenalty}
                        onChange={props.onEffectChange.bind(null, "statusPenalty")}
                    />
                }
            />

            <PenaltyPresets
                modifier={props.effect.circumstancePenalty}
                onChange={props.onEffectChange.bind(null, "circumstancePenalty")}
            />
            <CollapsableInput
                description={"Cicumstance Penalty: " + props.effect.circumstancePenalty.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.circumstancePenalty}
                        onChange={props.onEffectChange.bind(null, "circumstancePenalty")}
                    />
                }
            />

            <PenaltyPresets
                modifier={props.effect.itemPenalty}
                onChange={props.onEffectChange.bind(null, "itemPenalty")}
            />
            <CollapsableInput
                description={"Item Penalty: " + props.effect.itemPenalty.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.itemPenalty}
                        onChange={props.onEffectChange.bind(null, "itemPenalty")}
                    />
                }
            />

            <PenaltyPresets
                modifier={props.effect.untypedPenalty}
                onChange={props.onEffectChange.bind(null, "untypedPenalty")}
            />
            <CollapsableInput
                description={"Untyped Penalty: " + props.effect.untypedPenalty.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.untypedPenalty}
                        onChange={props.onEffectChange.bind(null, "untypedPenalty")}
                    />
                }
            />
            </div>
            }
            />
        </div>
    );
}

export default ModifierInput