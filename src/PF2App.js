import React from 'react';
import update from 'immutability-helper';
import CollapsableInput from './CollapsableInput';
import Proficiency from './Proficiency';
import ProficiencyInput from './ProficiencyInput';
import AbilityScore from './AbilityScore';
import AbilityScoreInput from './AbilityScoreInput';
import ByLevelInput from './ByLevelInput';
import './PF2App.css';
import Modifier from './Modifier';
import ItemBonus from './ItemBonus';

class Flag {
    constructor(value = false) {
        this.value = value;
    }

    isTrue() {
        return this.value;
    }

    createUpdated(event) {
        return new Flag(event.target.checked);
    }
}

function ProficiencyPresets(props) {
    return (
        <div className="ProficiencyPresets">
            <CheckboxInput
                checked={props.proficiency.isFighter()}
                onChange={props.onChange.bind(null, "fighter")}
                label={"Fighter"}
            />
            <CheckboxInput
                checked={props.proficiency.isMartial()}
                onChange={props.onChange.bind(null, "martial")}
                label={"Martial"}
            />
            <CheckboxInput
                checked={props.proficiency.isCaster()}
                onChange={props.onChange.bind(null, "caster")}
                label={"Caster"}
            />
            <CheckboxInput
                checked={props.proficiency.isAlchemist()}
                onChange={props.onChange.bind(null, "alchemist")}
                label={"Alchemist/Warpriest"}
            />
        </div>
    );
}

function AbilityScorePresets(props) {
    return (
        <div className="AbilityScorePresets">
            <CheckboxInput
                checked={props.score.is18a()}
                onChange={props.onChange.bind(null, "18a")}
                label={"18a"}
            />
            <CheckboxInput
                checked={props.score.is16a()}
                onChange={props.onChange.bind(null, "16a")}
                label={"16a"}
            />
            <CheckboxInput
                checked={props.score.is16pp()}
                onChange={props.onChange.bind(null, "16++")}
                label={"16++"}
            />
            <CheckboxInput
                checked={props.score.is14p()}
                onChange={props.onChange.bind(null, "14+")}
                label={"14+"}
            />
            <CheckboxInput
                checked={props.score.is10()}
                onChange={props.onChange.bind(null, "10")}
                label={"10"}
            />
        </div>
    );
}

function ItemBonusPresets(props) {
    return (
        <div className="ItemBonusPresets">
            <CheckboxInput
                checked={props.itemBonus.isNone()}
                onChange={props.onChange.bind(null, "None")}
                label={"None"}
            />
            <CheckboxInput
                checked={props.itemBonus.isABPWeapon()}
                onChange={props.onChange.bind(null, "ABPWeapon")}
                label={"ABP Weapon"}
            />
            <CheckboxInput
                checked={props.itemBonus.isABPSkill1()}
                onChange={props.onChange.bind(null, "ABPSkill1")}
                label={"ABP Skill Item 1"}
            />
            <CheckboxInput
                checked={props.itemBonus.isABPSkill2()}
                onChange={props.onChange.bind(null, "ABPSkill2")}
                label={"ABP Skill Item 2"}
            />
        </div>
    );
}

function CheckboxInput(props) {
    // props: checked, onChange, label
    return (
        <label className="CheckboxInput">
            <input
                type="checkbox"
                checked={props.checked}
                onChange={props.onChange}
            />
            {props.label}
        </label>
    );
}

// function CheckInput(props) {
//     return (

//     );
// }
function totalBonusDescription(effect, level) {
    if (effect.useOverride.isTrue()) {
        return effect.override.getDescription(level);
    }
    else {
        let desc = " ";
        if (level) {
            let levelTotal = effect.attackAbilityScore.getMod(level) + effect.proficiency.get(level) + effect.itemBonus.get(level);
            desc += "(" + levelTotal + ") ";
        }
        let initial = effect.attackAbilityScore.getMod(1) + effect.proficiency.get(1) + effect.itemBonus.get(1);
        let final = effect.attackAbilityScore.getMod(20) + effect.proficiency.get(20) + effect.itemBonus.get(20);
        desc += initial + " to " + final;

        return desc;
    }
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
                        <CheckboxInput
                            checked={props.effect.useOverride.isTrue()}
                            onChange={props.onEffectChange.bind(null, "useOverride")}
                            label="Override Attack Bonus?"
                        />
                        <CollapsableInput
                            description={"Override: " + props.effect.override.getDescription(props.selectedLevel)}
                            listInput={
                                <ByLevelInput
                                    modifier={props.effect.override}
                                    onChange={props.onEffectChange.bind(null, "override")}
                                />
                            }
                        />
                        <ProficiencyPresets
                            proficiency={props.effect.proficiency}
                            onChange={props.onEffectChange.bind(null, "proficiency")}
                        />
                        <CollapsableInput
                            description={"Proficiency: " + props.effect.proficiency.getDescription(props.selectedLevel)}
                            listInput={
                                <ProficiencyInput
                                    proficiency={props.effect.proficiency}
                                    onChange={props.onEffectChange.bind(null, "proficiency")}
                                />
                            }
                        />
                        <AbilityScorePresets
                            score={props.effect.attackAbilityScore}
                            onChange={props.onEffectChange.bind(null, "attackAbilityScore")}
                        />
                        <CollapsableInput
                            description={"Attack Ability Score: " + props.effect.attackAbilityScore.getDescription(props.selectedLevel)}
                            listInput={
                                <AbilityScoreInput
                                    score={props.effect.attackAbilityScore}
                                    onChange={props.onEffectChange.bind(null, "attackAbilityScore")}
                                />
                            }
                        />
                        <ItemBonusPresets
                            itemBonus={props.effect.itemBonus}
                            onChange={props.onEffectChange.bind(null, "itemBonus")}
                        />
                        <CollapsableInput
                            description={"Item Bonus: " + props.effect.itemBonus.getDescription(props.selectedLevel)}
                            listInput={
                                <ByLevelInput
                                    modifier={props.effect.itemBonus}
                                    onChange={props.onEffectChange.bind(null, "itemBonus")}
                                />
                            }
                        />
                        <CheckboxInput
                            checked={props.effect.useMiscModifiers.isTrue()}
                            onChange={props.onEffectChange.bind(null, "useMiscModifiers")}
                            label="Add Circumstance/Status Bonuses/Penalties"
                        />
                    </div>
                }
            />
            {/* <MAPInput /> */}
            <CollapsableInput
                description={"Damage Ability Score: " + props.effect.damageAbilityScore.getDescription(props.selectedLevel)}
                listInput={
                    <AbilityScoreInput
                        score={props.effect.damageAbilityScore}
                        onChange={props.onEffectChange.bind(null, "damageAbilityScore")}
                    />
                }
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