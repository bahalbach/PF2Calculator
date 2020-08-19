import React from 'react';
import update from 'immutability-helper';

import { CheckboxInput, CollapsableInput, ByLevelInput } from './Inputs/CommonInputs.js'

import Flag from './Model/Flag.js';
import MAP from './Model/MAP.js';
import Proficiency from './Model/Proficiency.js';
import AbilityScore from './Model/AbilityScore.js';
import Modifier from './Model/Modifier.js';
import AdditionalEffectArray from './Model/AdditionalEffectArray.js';

import { totalBonusDescription, attackBonusDescription, totalDamageDescription, calculateExpectedDamage } from './Calculation.js';

import MAPInput from './Inputs/MAPInput.js';
import OverrideInput from './Inputs/OverrideInput.js';
import { WeaponProficiencyInput } from './Inputs/ProficiencyInput.js';
import { AttackAbilityScoreInput, DamageAbilityScoreInput } from './Inputs/AbilityScoreInput.js';
import ItemBonusInput from './Inputs/ItemBonusInput.js';
import ModifierInput from './Inputs/ModifierInput.js';
import { WeaponDiceNumInput } from './Inputs/NumberDiceInput.js';
import { DieSizeInput } from './Inputs/DieSizeInput.js';
import WeaponSpecInput from './Inputs/WeaponSpecInput.js';
import RuneInput from './Inputs/RuneInput.js';

import './PF2App.css';







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
const DEFAULT_DICENUMBER = new Array(20).fill(1);
for (let i = 0; i < 20; i++) {
    if (i + 1 >= 19) { DEFAULT_DICENUMBER[i] = 4; continue; }
    if (i + 1 >= 12) { DEFAULT_DICENUMBER[i] = 3; continue; }
    if (i + 1 >= 4) { DEFAULT_DICENUMBER[i] = 2; continue; }
}
const DEFAULT_DIESIZE = new Array(20).fill(8);


// function CheckInput(props) {
//     return (

//     );
// }


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
                        <CollapsableInput
                            description={"Attack Bonus: " + attackBonusDescription(props.effect, props.selectedLevel)}
                            listInput={
                                <div>
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
                                        onChange={props.onEffectChange.bind(null, "attackAbilityScore", null)}
                                        selectedLevel={props.selectedLevel}
                                    />

                                    <ItemBonusInput
                                        effect={props.effect}
                                        onChange={props.onEffectChange.bind(null, "itemBonus")}
                                        selectedLevel={props.selectedLevel}
                                    />
                                </div>
                            } />
                        <ModifierInput
                            effect={props.effect}
                            onEffectChange={props.onEffectChange}
                            selectedLevel={props.selectedLevel}
                        />
                        <MAPInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "MAP", null)}
                            selectedLevel={props.selectedLevel}

                        />
                    </div>

                }
            />

            <CollapsableInput
                description={"Total Damage: " + totalDamageDescription(props.effect, props.selectedLevel)}
                listInput={
                    <div className="DamageInput">
                        <DamageAbilityScoreInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "damageAbilityScore", null)}
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
                            onChange={props.onEffectChange.bind(null, "weaponSpec", null)}
                            selectedLevel={props.selectedLevel}
                        />
                        <RuneInput
                            effect={props.effect}
                            onChange={props.onEffectChange.bind(null, "runes")}
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
                    /><br />
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
                    { // effect
                        MAP: new MAP(),

                        useOverride: new Flag(),
                        override: new Modifier(),

                        proficiency: new Proficiency(...DEFAULT_PROF),
                        attackAbilityScore: new AbilityScore(...DEFAULT_ABSCORE),
                        itemBonus: new Modifier(DEFAULT_ITEMB),

                        useMiscModifiers: new Flag(true),
                        circumstanceBonus: new Modifier(),
                        statusBonus: new Modifier(),
                        circumstancePenalty: new Modifier(),
                        statusPenalty: new Modifier(),
                        itemPenalty: new Modifier(),
                        untypedPenalty: new Modifier(),

                        damageAbilityScore: new AbilityScore(...DEFAULT_ABSCORE),
                        weaponDiceNum: new Modifier(DEFAULT_DICENUMBER),
                        dieSize: new Modifier(DEFAULT_DIESIZE),
                        weaponSpec: new Modifier(DEFAULT_WS),

                        runes: new AdditionalEffectArray(),
                    }
                ]
            ],
            selectedRoutine: 0,
            selectedEffect: 0,
        };
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

    handleEffectChange(propertyName, index, key, event) {
        const currentEffect = this.state.routines[this.state.selectedRoutine][this.state.selectedEffect];
        const currentPropertyValue = currentEffect[propertyName];
        const newPropertyValue = currentPropertyValue.createUpdated(key, event, index);

        const newRoutines = update(this.state.routines, {
            [this.state.selectedRoutine]: {
                [this.state.selectedEffect]: {
                    [propertyName]: { $set: newPropertyValue }
                }
            }
        });

        this.setState({ routines: newRoutines });
    }

    handleEffectItemChange(propertyName) {
        
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