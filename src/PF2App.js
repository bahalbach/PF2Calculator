import React from 'react';
import { useSelector } from 'react-redux';
import update from 'immutability-helper';

//import { useSelector, useDispatch } from 'react-redux';
import {
    selectCurrentEffect,
} from './Effect/effectSlice';

import { CheckboxInput, CollapsableInput, ByLevelInput } from './Effect/Inputs/CommonInputs.js'

import MAP from './Effect/Model/MAP.js';
import Proficiency from './Effect/Model/Proficiency.js';
import AbilityScore from './Effect/Model/AbilityScore.js';
import Modifier from './Effect/Model/Modifier.js';
import AdditionalEffectArray from './Effect/Model/AdditionalEffectArray.js';

import { totalBonusDescription, attackBonusDescription, totalDamageDescription, calculateExpectedDamage } from './Calculation.js';

import TargetInput from './Target/TargetInput.js'
import {
    selectTarget,
    selectLevel,
} from './Target/targetSlice';

import MAPInput from './Effect/Inputs/MAPInput.js';
import OverrideInput from './Effect/Inputs/OverrideInput.js';
import { WeaponProficiencyInput } from './Effect/Inputs/ProficiencyInput.js';
import { AttackAbilityScoreInput, DamageAbilityScoreInput } from './Effect/Inputs/AbilityScoreInput.js';
import ItemBonusInput from './Effect/Inputs/ItemBonusInput.js';
import ModifierInput from './Effect/Inputs/ModifierInput.js';
import { WeaponDiceNumInput } from './Effect/Inputs/NumberDiceInput.js';
import { DieSizeInput } from './Effect/Inputs/DieSizeInput.js';
import WeaponSpecInput from './Effect/Inputs/WeaponSpecInput.js';
import { TraitInput, RuneInput } from './Effect/Inputs/TraitInput.js';

import './PF2App.css';
import { AdditionalDamageInput } from './Effect/Inputs/AdditionalEffectInput';
import DamageTypeInput from './Effect/Inputs/DamageTypeInput';


function StrikeInput() {
    /*
        Proficiency, Primary Ability Scor
    */
    const level = useSelector(selectLevel);
    const effect = useSelector(selectCurrentEffect);

    return (
        <div className="StrikeInput" >
            <CollapsableInput
                description={"Total Bonus: " + totalBonusDescription(effect, level)}
                listInput={
                    <div className="CheckInput">
                        <CollapsableInput
                            description={"Attack Bonus: " + attackBonusDescription(effect, level)}
                            listInput={
                                <div>
                                    <OverrideInput />
                                    <WeaponProficiencyInput />
                                    <AttackAbilityScoreInput />
                                    <ItemBonusInput />
                                </div>
                            } />
                        <ModifierInput />
                        <MAPInput />
                    </div>

                }
            />

            <CollapsableInput
                description={"Total Damage: " + totalDamageDescription(effect, level)}
                listInput={
                    <div className="DamageInput">
                        <DamageTypeInput />
                        <DamageAbilityScoreInput />
                        <WeaponDiceNumInput />
                        <DieSizeInput />
                        <WeaponSpecInput />
                        <TraitInput />
                        <RuneInput />
                        <AdditionalDamageInput />
                    </div>
                }
            />
        </div>
    );
}

function EffectInput(props) {
    // props: effect, selectedLevel, onEffectChange
    return (
        <StrikeInput />
    );
}

function DisplayOutput(props) {
    // props: effect, target
    const target = useSelector(selectTarget);
    const effect = useSelector(selectCurrentEffect);
    return (
        <div className="Display">
            <CollapsableInput
                description={"Expected Damage: " + calculateExpectedDamage(effect, target)}
                listInput=""
            />
        </div>
    );
}



class PF2App extends React.Component {
    /*
        Target Selector
        Graph Settings
        Graph
        Edit Current Effect
        Select Effects
    */
    constructor(props) {
        super(props);
        // this.state = {
        //     target: {
        //         selectedLevel: 3,
        //         AC: 15
        //     },
        //     routines: [
        //         [
        //             { // effect
        //                 MAP: new MAP(),

        //                 useOverride: new Flag(),
        //                 override: new Modifier(),

        //                 proficiency: new Proficiency(...DEFAULT_PROF),
        //                 attackAbilityScore: new AbilityScore(...DEFAULT_ABSCORE),
        //                 itemBonus: new Modifier(DEFAULT_ITEMB),

        //                 useMiscModifiers: new Flag(true),
        //                 circumstanceBonus: new Modifier(),
        //                 statusBonus: new Modifier(),
        //                 circumstancePenalty: new Modifier(),
        //                 statusPenalty: new Modifier(),
        //                 itemPenalty: new Modifier(),
        //                 untypedPenalty: new Modifier(),

        //                 damageAbilityScore: new AbilityScore(...DEFAULT_ABSCORE),
        //                 weaponDiceNum: new Modifier(DEFAULT_DICENUMBER),
        //                 dieSize: new Modifier(DEFAULT_DIESIZE),
        //                 weaponSpec: new Modifier(DEFAULT_WS),

        //                 runes: new AdditionalEffectArray(),
        //             }
        //         ]
        //     ],
        //     selectedRoutine: 0,
        //     selectedEffect: 0,
        // };
        // this.handleEffectChange = this.handleEffectChange.bind(this);
        // this.handleTargetChange = this.handleTargetChange.bind(this);
    }

    // handleTargetChange(propertyName, event) {
    //     let newPropertyValue;
    //     switch (propertyName) {
    //         case "selectedLevel":
    //             newPropertyValue = event.target.value;
    //             break;
    //         case "AC":
    //             newPropertyValue = event.target.value;
    //             break;
    //         default:
    //             newPropertyValue = event.target.value;
    //     }
    //     const newTarget = update(this.state.target, { [propertyName]: { $set: newPropertyValue } });

    //     this.setState({ target: newTarget });
    // }

    // handleEffectChange(propertyName, index, key, event) {
    //     const currentEffect = this.state.routines[this.state.selectedRoutine][this.state.selectedEffect];
    //     const currentPropertyValue = currentEffect[propertyName];
    //     const newPropertyValue = currentPropertyValue.createUpdated(key, event, index);

    //     const newRoutines = update(this.state.routines, {
    //         [this.state.selectedRoutine]: {
    //             [this.state.selectedEffect]: {
    //                 [propertyName]: { $set: newPropertyValue }
    //             }
    //         }
    //     });

    //     this.setState({ routines: newRoutines });
    // }

    // handleEffectItemChange(propertyName) {

    // }

    render() {
        return (
            <div className="PF2App">
                <TargetInput />
                <DisplayOutput />
                <EffectInput />
            </div>
        );
    }
}

export default PF2App