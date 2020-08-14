import React from 'react';
import update from 'immutability-helper';

import { CheckboxInput, CollapsableInput, ByLevelInput } from './Inputs/CommonInputs.js'

import Flag from './Model/Flag.js';
import MAP from './Model/MAP.js';
import Proficiency from './Model/Proficiency.js';
import AbilityScore from './Model/AbilityScore.js';
import Modifier from './Model/Modifier.js';
import ItemBonus from './Model/ItemBonus.js';
import DiceNumber from './Model/DiceNumber.js';
import DieSize from './Model/DieSize.js';

import MAPInput from './Inputs/MAPInput.js';
import OverrideInput from './Inputs/OverrideInput.js';
import { WeaponProficiencyInput } from './Inputs/ProficiencyInput.js';
import { AttackAbilityScoreInput, DamageAbilityScoreInput } from './Inputs/AbilityScoreInput.js';
import ItemBonusInput from './Inputs/ItemBonusInput.js';
import ModifierInput from './Inputs/ModifierInput.js';
import { WeaponDiceNumInput } from './Inputs/NumberDiceInput.js';
import { DieSizeInput } from './Inputs/DieSizeInput.js';


import './PF2App.css';
import WeaponSpecInput from './Inputs/WeaponSpecInput.js';






const DEFAULT_PROF = [1, 1, 5, 13];
const DEFAULT_ABSCORE = [18, [true, true, true, true], 17];
const DEFAULT_ITEMB = new Array(20).fill(0);
for (let i = 0; i < 20; i++) {
    if (i + 1 >= 16) { DEFAULT_ITEMB[i] = 3; continue; }
    if (i + 1 >= 10) { DEFAULT_ITEMB[i] = 2; continue; }
    if (i + 1 >= 2) { DEFAULT_ITEMB[i] = 1; continue; }
}
const DEFAULT_WS = new Array(20).fill(0);
for (let level = 7; level <= 20; level++) {
    if (level < 15) {
        DEFAULT_WS[level - 1] = 1;
    }
    if (level >= 15) {
        DEFAULT_WS[level - 1] = 2;
    }
}



// function CheckInput(props) {
//     return (

//     );
// }
function totalBonusDescription(effect, level) {
    let desc = "";
    if (level) {
        desc += "(" + getAttackBonus(effect, level) + ") ";
    }
    desc += getAttackBonus(effect, 1) + " to " + getAttackBonus(effect, 20);
    return desc;
}

function totalDamageDescription(effect, level) {
    // damageAbilityScore: new AbilityScore(),
    // weaponDiceNum: new DiceNumber(),
    // dieSize: new DieSize(),
    // weaponSpec
    if (level) {
        const dice = "" + effect.weaponDiceNum.get(level) + "d" + effect.dieSize.get(level);
        const staticDamage = (effect.damageAbilityScore.getMod(level) + (effect.weaponSpec.get(level) * effect.proficiency.getProf(level)));
        const average = effect.weaponDiceNum.get(level) * (effect.dieSize.get(level) + 1) / 2 + staticDamage;
        return "(" + average + ") " + dice + " + " + staticDamage;
    }
    return "";
}

function getAttackBonus(effect, level) {
    let total;

    if (effect.useOverride.isTrue()) {
        total = effect.override.get(level);
    }
    else {
        total = effect.attackAbilityScore.getMod(level) + effect.proficiency.get(level) + effect.itemBonus.get(level);
    }
    total += effect.MAP.get(level);

    if (effect.useMiscModifiers.isTrue()) {

        total += (
            effect.circumstanceBonus.get(level) +
            effect.statusBonus.get(level) +
            -effect.circumstancePenalty.get(level) +
            -effect.statusPenalty.get(level) +
            -effect.itemPenalty.get(level) +
            -effect.untypedPenalty.get(level)
        );
    }

    return total;
}

function getCritSuccessPercent(bonus, DC, keen=false) {
    const dif = bonus-DC;
    let chance;
    if (dif < -20) {
        chance = 0;
    } else if (dif < -9) {
        chance = keen?10:5;
    } else if (dif < 8) {
        chance = (11 + dif) * 5;
    } else {
        chance = 95;
    }
      
    return chance;
}

function getSuccessPercent(bonus, DC, keen=false) {
    const dif = bonus-DC;
    let chance;
    if (dif < -29) {
        chance = 0;
    } else if (dif < -20) {
        chance = 5;
    } else if (dif < -9) {
        chance = (keen?19:20 + dif) *5;
    } else if (dif < -1) {
        chance = 50;
    } else if (dif < 9) {
        chance = (8 - dif) * 5;
    } else {
        chance = 5;
    }
      
    return chance;
}

function calculateExpectedDamage(effect, target) {
    const level = target.selectedLevel;
    if (!level) return;
    const attackBonus = getAttackBonus(effect, level);
    const diceNum = effect.weaponDiceNum.get(level);
    const dieSize = effect.dieSize.get(level);
    const staticDamage = (effect.damageAbilityScore.getMod(level) + (effect.weaponSpec.get(level) * effect.proficiency.getProf(level)));
    const average = diceNum * (dieSize+1)/2 + staticDamage;
    const AC = target.AC;
    const critPercent = getCritSuccessPercent(attackBonus,AC);
    const hitPercent = getSuccessPercent(attackBonus,AC);
    return (hitPercent * average + critPercent * average * 2) / 100;
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

            <CollapsableInput
                description={"Total Damage: " + totalDamageDescription(props.effect, props.selectedLevel)}
                listInput={
                    <div className="DamageInput">
                        <DamageAbilityScoreInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "damageAbilityScore")}
                            selectedLevel={props.selectedLevel}
                        />
                        <WeaponDiceNumInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "weaponDiceNum")}
                            selectedLevel={props.selectedLevel}
                        />
                        <DieSizeInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "dieSize")}
                            selectedLevel={props.selectedLevel}
                        />
                        <WeaponSpecInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "weaponSpec")}
                            selectedLevel={props.selectedLevel}
                        />
                    </div>
                }
            />
        </div>
    );
}

function EffectInput(props) {
    // props: effect, selectedLevel, onEffectChange
    return (
        <StrikeInput
            effect={props.effect}
            selectedLevel={props.selectedLevel}
            onEffectChange={props.onEffectChange}
        />
    );
}

function DisplayOutput(props) {
    // props: effect, target
    return (
        <div className="Display">
            <CollapsableInput
                description={"Expected Damage: " + calculateExpectedDamage(props.effect, props.target)}
                listInput=""
            />
        </div>
    );
}

function TargetInput(props) {
    return (
        <div className="TargetInput">
            <div>
                <label>Target Level:
                <input type="number"
                        min="1"
                        max="20"
                        step="1"
                        value={props.target.selectedLevel}
                        onChange={props.onTargetChange.bind(null, "selectedLevel")}
                    />
                1
                <input type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={props.target.selectedLevel}
                        onChange={props.onTargetChange.bind(null, "selectedLevel")}
                    />
                20
            </label>
            </div>
            <div>
                <label>Target AC: {}
                    <input type="number"
                        value={props.target.AC}
                        onChange={props.onTargetChange.bind(null, "AC")}
                    />

                </label>
            </div>

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
        this.state = {
            target: {
                selectedLevel: 3,
                AC: 15
            },
            routines: [
                [
                    {
                        MAP: new MAP(),

                        useOverride: new Flag(),
                        override: new Modifier(),

                        proficiency: new Proficiency(...DEFAULT_PROF),
                        attackAbilityScore: new AbilityScore(...DEFAULT_ABSCORE),
                        itemBonus: new ItemBonus(DEFAULT_ITEMB),

                        useMiscModifiers: new Flag(true),
                        circumstanceBonus: new Modifier(),
                        statusBonus: new Modifier(),
                        circumstancePenalty: new Modifier(),
                        statusPenalty: new Modifier(),
                        itemPenalty: new Modifier(),
                        untypedPenalty: new Modifier(),

                        damageAbilityScore: new AbilityScore(...DEFAULT_ABSCORE),
                        weaponDiceNum: new DiceNumber(),
                        dieSize: new DieSize(),
                        weaponSpec: new Modifier(DEFAULT_WS),
                    }
                ]
            ],
            selectedRoutine: 0,
            selectedEffect: 0,
        };
        // this.handleProficiencyChange = this.handleProficiencyChange.bind(this);
        // this.handleAbilityScoreChange = this.handleAbilityScoreChange.bind(this);
        this.handleEffectChange = this.handleEffectChange.bind(this);
        this.handleTargetChange = this.handleTargetChange.bind(this);
    }
    handleTargetChange(propertyName, event) {
        let newPropertyValue;
        switch (propertyName) {
            case "selectedLevel":
                newPropertyValue = event.target.value;
                break;
            case "AC":
                newPropertyValue = event.target.value;
                break;
            default:
                newPropertyValue = event.target.value;
        }
        const newTarget = update(this.state.target, { [propertyName]: { $set: newPropertyValue } });

        this.setState({ target: newTarget });
    }

    handleEffectChange(propertyName, key, event) {
        const currentEffect = this.state.routines[this.state.selectedRoutine][this.state.selectedEffect];
        const currentPropertyValue = currentEffect[propertyName];
        const newPropertyValue = currentPropertyValue.createUpdated(key, event);

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
                <TargetInput
                    target={this.state.target}
                    onTargetChange={this.handleTargetChange}
                />
                <DisplayOutput
                    target={this.state.target}
                    effect={this.state.routines[this.state.selectedRoutine][this.state.selectedEffect]}
                />
                <EffectInput
                    effect={this.state.routines[this.state.selectedRoutine][this.state.selectedEffect]}
                    selectedLevel={this.state.target.selectedLevel}
                    onEffectChange={this.handleEffectChange}
                />
            </div>
        );
    }
}

export default PF2App