import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLevel,
  setDieSize,
  selectDieSize,
  selectCurrentEffect,
  setStatusBonus,
  setCircumstanceBonus,
  setStatusPenalty,
  setCicumstancePenalty,
  setItemPenalty,
  setUntypedPenalty,
} from '../effectSlice';
import Modifier from '../Model/Modifier';

function BonusPresets(props) {
    const dispatch = useDispatch();
    const mod = props.modifier;
    const action = props.action;

    return (
        <div className="Presets BonusPresets">
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 0)}
                onChange={() => dispatch(action({key: "0"}))}
                label={"+0"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 1)}
                onChange={() => dispatch(action({key: "+1"}))}
                label={"+1"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 2)}
                onChange={() => dispatch(action({key: "+2"}))}
                label={"+2"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 3)}
                onChange={() => dispatch(action({key: "+3"}))}
                label={"+3"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 4)}
                onChange={() => dispatch(action({key: "+4"}))}
                label={"+4"}
            />
        </div>
    );
}

function PenaltyPresets(props) {
    const dispatch = useDispatch();
    const mod = props.modifier;
    const action = props.action;

    return (
        <div className="Presets PenaltyPresets">
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 0)}
                onChange={() => dispatch(action({key: "0"}))}
                label={"-0"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 1)}
                onChange={() => dispatch(action({key: "+1"}))}
                label={"-1"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 2)}
                onChange={() => dispatch(action({key: "+2"}))}
                label={"-2"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 3)}
                onChange={() => dispatch(action({key: "+3"}))}
                label={"-3"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(mod, 4)}
                onChange={() => dispatch(action({key: "+4"}))}
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
        let total = (
            Modifier.get(effect.circumstanceBonus, level) +
            Modifier.get(effect.statusBonus, level) +
            -Modifier.get(effect.circumstancePenalty, level) +
            -Modifier.get(effect.statusPenalty, level) +
            -Modifier.get(effect.itemPenalty, level) +
            -Modifier.get(effect.untypedPenalty, level)
        );

        return "(" + total + ")";
    }
}

function ModifierInput() {
    const level = useSelector(selectLevel);
    const effect = useSelector(selectCurrentEffect);

    return (
        <div className="ModifierInput" >
            <CollapsableInput
                description={"Circumstance/Status Bonuses/Penalties: " + totalModDescription(effect, level)}
                listInput={
                    <div className="ModifierInputList">
                        <div className="InputGroup">
                            <BonusPresets
                                modifier={effect.statusBonus}
                                action={setStatusBonus}
                            />
                            <CollapsableInput
                                description={"Status Bonus: " + Modifier.getDescription(effect.statusBonus, level)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={effect.statusBonus}
                                        action={setStatusBonus}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <BonusPresets
                                modifier={effect.circumstanceBonus}
                                action={setCircumstanceBonus}
                            />
                            <CollapsableInput
                                description={"Cicumstance Bonus: " + Modifier.getDescription(effect.circumstanceBonus, level)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={effect.circumstanceBonus}
                                        action={setCircumstanceBonus}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={effect.statusPenalty}
                                action={setStatusPenalty}
                            />
                            <CollapsableInput
                                description={"Status Penalty: " + Modifier.getDescription(effect.statusPenalty, level)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={effect.statusPenalty}
                                        action={setStatusPenalty}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={effect.circumstancePenalty}
                                action={setCicumstancePenalty}
                            />
                            <CollapsableInput
                                description={"Cicumstance Penalty: " + Modifier.getDescription(effect.circumstancePenalty, level)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={effect.circumstancePenalty}
                                        action={setCicumstancePenalty}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={effect.itemPenalty}
                                action={setItemPenalty}
                            />
                            <CollapsableInput
                                description={"Item Penalty: " + Modifier.getDescription(effect.itemPenalty, level)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={effect.itemPenalty}
                                        action={setItemPenalty}
                                    />
                                }
                            />
                        </div>

                        <div className="InputGroup">
                            <PenaltyPresets
                                modifier={effect.untypedPenalty}
                                action={setUntypedPenalty}
                            />
                            <CollapsableInput
                                description={"Untyped Penalty: " + Modifier.getDescription(effect.untypedPenalty, level)}
                                listInput={
                                    <ByLevelInput2
                                        modifier={effect.untypedPenalty}
                                        action={setUntypedPenalty}
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