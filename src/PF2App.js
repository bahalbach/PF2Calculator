import React from 'react';
import update from 'immutability-helper';

import { CheckboxInput, CollapsableInput, ByLevelInput } from './Inputs/CommonInputs.js'

import Flag from './Model/Flag.js';
import MAP from './Model/MAP.js';
import Proficiency from './Model/Proficiency.js';
import AbilityScore from './Model/AbilityScore.js';
import Modifier from './Model/Modifier.js';
import ItemBonus from './Model/ItemBonus.js';

import MAPInput from './Inputs/MAPInput.js';
import OverrideInput from './Inputs/OverrideInput.js';
import { WeaponProficiencyInput } from './Inputs/ProficiencyInput.js';
import { AttackAbilityScoreInput, DamageAbilityScoreInput } from './Inputs/AbilityScoreInput.js';
import ItemBonusInput from './Inputs/ItemBonusInput.js';
import ModifierInput from './Inputs/ModifierInput.js';


import './PF2App.css';










// function CheckInput(props) {
//     return (

//     );
// }
function totalBonusDescription(effect, level) {
    let desc = "";
    let levelTotal;
    let initial;
    let final;

    if (effect.useOverride.isTrue()) {
        if (level) {
            levelTotal = effect.override.get(level);
        }
        initial = effect.override.get(1);
        final = effect.override.get(20);
    }
    else {
        if (level) {
            levelTotal = effect.attackAbilityScore.getMod(level) + effect.proficiency.get(level) + effect.itemBonus.get(level);
        }
        initial = effect.attackAbilityScore.getMod(1) + effect.proficiency.get(1) + effect.itemBonus.get(1);
        final = effect.attackAbilityScore.getMod(20) + effect.proficiency.get(20) + effect.itemBonus.get(20);
    }
    if (level) {
        levelTotal += effect.MAP.get(level);
    }
    initial += effect.MAP.get(1);
    final  += effect.MAP.get(20);

    if (effect.useMiscModifiers.isTrue()) {
        if (level) {
            levelTotal += (
                effect.circumstanceBonus.get(level) +
                effect.statusBonus.get(level) +
                -effect.circumstancePenalty.get(level) +
                -effect.statusPenalty.get(level) +
                -effect.itemPenalty.get(level) +
                -effect.untypedPenalty.get(level)
            );
        }
        initial += (
            effect.circumstanceBonus.get(1) +
            effect.statusBonus.get(1) +
            -effect.circumstancePenalty.get(1) +
            -effect.statusPenalty.get(1) +
            -effect.itemPenalty.get(1) +
            -effect.untypedPenalty.get(1)
        );
        final += (
            effect.circumstanceBonus.get(20) +
            effect.statusBonus.get(20) +
            -effect.circumstancePenalty.get(20) +
            -effect.statusPenalty.get(20) +
            -effect.itemPenalty.get(20) +
            -effect.untypedPenalty.get(20)
        );
    }

    if (level) {
        desc += "(" + levelTotal + ") ";
    }
    desc += initial + " to " + final;
    return desc;
}

function StrikeInput(props) {
    /*
        Proficiency, Primary Ability Scor
    */

    return (
        <div className="StrikeInput" >
            <CollapsableInput
                description={"Total Bonus: " + totalBonusDescription(props.effect, props.selectedLevel)}
                listInput={
                    <div className="CheckInput">
                        <OverrideInput
                            effect={props.effect}
                            onEffectChange={props.onEffectChange}
                            selectedLevel={props.selectedLevel}
                        />
                        <WeaponProficiencyInput
                            effect={props.effect}
                            onEffectChange={props.onEffectChange}
                            selectedLevel={props.selectedLevel}
                        />

                        <AttackAbilityScoreInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "attackAbilityScore")}
                            selectedLevel={props.selectedLevel}
                        />

                        <ItemBonusInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "itemBonus")}
                            selectedLevel={props.selectedLevel}
                        />

                        <ModifierInput
                            effect={props.effect}
                            onEffectChange={props.onEffectChange}
                            selectedLevel={props.selectedLevel}
                        />


                    </div>
                }
                after={
                    <MAPInput
                        effect={props.effect}
                        onChange={props.onEffectChange.bind(null, "MAP")}
                        selectedLevel={props.selectedLevel}

                    />
                }
            />



            <DamageAbilityScoreInput
                effect={props.effect}
                onChange={props.onEffectChange.bind(null, "damageAbilityScore")}
            />
        </div>
    );
}

function EffectInput(props) {
    return (
        <StrikeInput
            effect={props.effect}
            selectedLevel={props.selectedLevel}
            onEffectChange={props.onEffectChange}
        />
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
        this.state = {
            targetInfo: {
                selectedLevel: 3
            },
            routines: [
                [
                    {
                        MAP: new MAP(),

                        useOverride: new Flag(),
                        override: new Modifier(),

                        proficiency: new Proficiency(1, 1, 5, 13),
                        attackAbilityScore: new AbilityScore(18, [true, true, true, true], 17),
                        itemBonus: new ItemBonus(),

                        useMiscModifiers: new Flag(),
                        circumstanceBonus: new Modifier(),
                        statusBonus: new Modifier(),
                        circumstancePenalty: new Modifier(),
                        statusPenalty: new Modifier(),
                        itemPenalty: new Modifier(),
                        untypedPenalty: new Modifier(),

                        damageAbilityScore: new AbilityScore(),
                    }
                ]
            ],
            selectedRoutine: 0,
            selectedEffect: 0,
        };
        // this.handleProficiencyChange = this.handleProficiencyChange.bind(this);
        // this.handleAbilityScoreChange = this.handleAbilityScoreChange.bind(this);
        this.handleEffectChange = this.handleEffectChange.bind(this);
    }



    // handleProficiencyChange(key, event) {
    //     const currentProf = this.state.routines[this.state.selectedRoutine][this.state.selectedEffect].proficiency;
    //     const newProf = currentProf.createUpdated(key, event);
    //     const selected = this.state.selectedEffect;
    //     const newEffects = update(this.state.effects, {
    //         [selected]: { proficiency: { $set: newProf } }
    //     });
    //     this.setState({ effects: newEffects });
    // }

    // handleAbilityScoreChange(isAttack, key, event) {
    //     const currentEffect = this.state.effects[this.state.selectedEffect];
    //     const currentScore = (isAttack ? currentEffect.attackAbilityScore : currentEffect.damageAbilityScore);
    //     const effectProperty = (isAttack ? "attackAbilityScore" : "damageAbilityScore");
    //     let newScore = currentScore.createUpdated(key, event);

    //     const newEffects = update(this.state.effects, {
    //         [this.state.selectedEffect]: { [effectProperty]: { $set: newScore } }
    //     });

    //     this.setState({ effects: newEffects });
    // }

    handleEffectChange(propertyName, key, event) {
        const currentEffect = this.state.routines[this.state.selectedRoutine][this.state.selectedEffect];
        const currentPropertyValue = currentEffect[propertyName];
        const newPropertyValue = currentPropertyValue.createUpdated(key, event);

        // switch(propertyName) {
        //     case "proficiency":
        //         break;
        //     case "attackAbilityScore":
        //         break;
        //     case "damageAbilityScore":
        //         break;
        // }

        const newRoutines = update(this.state.routines, {
            [this.state.selectedRoutine]: {
                [this.state.selectedEffect]: {
                    [propertyName]: { $set: newPropertyValue }
                }
            }
        });

        this.setState({ routines: newRoutines });
    }

    render() {
        return (
            <div className="PF2App">
                <EffectInput
                    effect={this.state.routines[this.state.selectedRoutine][this.state.selectedEffect]}
                    selectedLevel={this.state.targetInfo.selectedLevel}
                    onEffectChange={this.handleEffectChange}
                />
            </div>
        );
    }
}

export default PF2App