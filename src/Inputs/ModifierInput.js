import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'

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
function totalModDescription(effect, level) {
    if (level) {
        let total = (effect.circumstanceBonus.get(level) +
            effect.statusBonus.get(level) +
            -effect.circumstancePenalty.get(level) +
            -effect.statusPenalty.get(level) +
            -effect.itemPenalty.get(level) +
            -effect.untypedPenalty.get(level))

        return "(" + total + ")";
    }
}

function ModifierInput(props) {
    // props: effect, onEffectChange
    return (
        <div className="ModifierInput" >
            <CollapsableInput
                description={"Circumstance/Status Bonuses/Penalties: " + totalModDescription(props.effect, props.selectedLevel)}
                listInput={
                    <div className="ModifierInputList">
                        <div className="InputGroup">
                            <BonusPresets
                                modifier={props.effect.statusBonus}
                                onChange={props.onEffectChange.bind(null, "statusBonus", null)}
                            />
                            <CollapsableInput
                                description={"Status Bonus: " + props.effect.statusBonus.getDescription(props.selectedLevel)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={props.effect.statusBonus}
                                        onChange={props.onEffectChange.bind(null, "statusBonus")}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <BonusPresets
                                modifier={props.effect.circumstanceBonus}
                                onChange={props.onEffectChange.bind(null, "circumstanceBonus", null)}
                            />
                            <CollapsableInput
                                description={"Cicumstance Bonus: " + props.effect.circumstanceBonus.getDescription(props.selectedLevel)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={props.effect.circumstanceBonus}
                                        onChange={props.onEffectChange.bind(null, "circumstanceBonus")}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={props.effect.statusPenalty}
                                onChange={props.onEffectChange.bind(null, "statusPenalty", null)}
                            />
                            <CollapsableInput
                                description={"Status Penalty: " + props.effect.statusPenalty.getDescription(props.selectedLevel)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={props.effect.statusPenalty}
                                        onChange={props.onEffectChange.bind(null, "statusPenalty")}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={props.effect.circumstancePenalty}
                                onChange={props.onEffectChange.bind(null, "circumstancePenalty", null)}
                            />
                            <CollapsableInput
                                description={"Cicumstance Penalty: " + props.effect.circumstancePenalty.getDescription(props.selectedLevel)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={props.effect.circumstancePenalty}
                                        onChange={props.onEffectChange.bind(null, "circumstancePenalty")}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={props.effect.itemPenalty}
                                onChange={props.onEffectChange.bind(null, "itemPenalty", null)}
                            />
                            <CollapsableInput
                                description={"Item Penalty: " + props.effect.itemPenalty.getDescription(props.selectedLevel)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={props.effect.itemPenalty}
                                        onChange={props.onEffectChange.bind(null, "itemPenalty")}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={props.effect.untypedPenalty}
                                onChange={props.onEffectChange.bind(null, "untypedPenalty", null)}
                            />
                            <CollapsableInput
                                description={"Untyped Penalty: " + props.effect.untypedPenalty.getDescription(props.selectedLevel)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={props.effect.untypedPenalty}
                                        onChange={props.onEffectChange.bind(null, "untypedPenalty")}
                                    />
                                }
                            />
                        </div>
                    </div>
                }
            />
        </div>
    );
}

export default ModifierInput