import React from 'react';
import update from 'immutability-helper';
import CollapsableInput from './CollapsableInput';
import Proficiency from './Proficiency';
import ProficiencyInput from './ProficiencyInput';
import AbilityScore from './AbilityScore';
import AbilityScoreInput from './AbilityScoreInput';
import './PF2App.css';


function StrikeInput(props) {
    /*
        Proficiency, Primary Ability Scor
    */

    return (
        <div className="StrikeInput" >
            <CollapsableInput
                description={"Proficiency: " + props.proficiency.getDescription(props.selectedLevel)}
                listInput={
                    <ProficiencyInput
                        proficiency={props.proficiency}
                        onChange={props.onEffectChange.bind(null, "proficiency")}
                    />
                }
            />
            <CollapsableInput
                description={"Attack Ability Score: " + props.attackAbilityScore.getDescription(props.selectedLevel)}
                listInput={
                    <AbilityScoreInput
                        score={props.attackAbilityScore}
                        onChange={props.onEffectChange.bind(null, "attackAbilityScore")}
                    />
                }
            />
            <CollapsableInput
                description={"Damage Ability Score: " + props.damageAbilityScore.getDescription(props.selectedLevel)}
                listInput={
                    <AbilityScoreInput
                        score={props.damageAbilityScore}
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
            proficiency={props.effect.proficiency}
            attackAbilityScore={props.effect.attackAbilityScore}
            damageAbilityScore={props.effect.damageAbilityScore}
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
                        proficiency: new Proficiency(1, 1, 5, 13),
                        attackAbilityScore: new AbilityScore(18, [true, true, true, true], 17),
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