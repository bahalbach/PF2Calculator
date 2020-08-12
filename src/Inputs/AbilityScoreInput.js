import React from 'react';
import { CheckboxInput, CollapsableInput, LevelSelection } from './CommonInputs'

function AbilityScoreInputList(props) {
    // props: score, onChange

    const score = props.score;
    let scoreList = [];
    scoreList.push(
        <div key="initial">
            <label> Initial: {}
                <select
                    value={score.getInitial()}
                    onChange={props.onChange.bind(null, "initial")}
                >
                    <option value="8">
                        8
                    </option>
                    <option value="10">
                        10
                    </option>
                    <option value="12">
                        12
                    </option>
                    <option value="14">
                        14
                    </option>
                    <option value="16">
                        16
                    </option>
                    <option value="18">
                        18
                    </option>
                </select>
            </label>
        </div>
    );
    const boosts = score.getBoosts();
    for (let i = 0; i < boosts.length; i++) {
        scoreList.push(
            <div key={i}>
                <label> Boost {(1 + i) * 5}: {}
                    <input
                        type="checkbox"
                        checked={boosts[i]}
                        onChange={props.onChange.bind(null, i)}
                    />
                </label>
            </div>
        );
    }
    let apexLevel = score.getApexLevel();
    if (apexLevel === null) apexLevel = "never";
    scoreList.push(
        <LevelSelection key="apex" name="Apex Level"
            value={apexLevel} onChange={props.onChange.bind(null, "apex")}
        />
    );

    return (
        <div className="AbilityScoreInput">
            {scoreList}
        </div>
    );

}

function AbilityScorePresets(props) {
    // props: score, onChange
    return (
        <div className="Presets AbilityScorePresets">
            <CheckboxInput className="PresetItem"
                checked={props.score.is18a()}
                onChange={props.onChange.bind(null, "18a")}
                label={"18a"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.score.is16a()}
                onChange={props.onChange.bind(null, "16a")}
                label={"16a"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.score.is16pp()}
                onChange={props.onChange.bind(null, "16++")}
                label={"16++"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.score.is14p()}
                onChange={props.onChange.bind(null, "14+")}
                label={"14+"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.score.is10()}
                onChange={props.onChange.bind(null, "10")}
                label={"10"}
            />
        </div>
    );
}

function AttackAbilityScoreInput(props) {
    // props: effect, onChange
    return (
        <div className="InputGroup AbilityScoreInput">
            <AbilityScorePresets
                score={props.effect.attackAbilityScore}
                onChange={props.onChange}
            />
            <CollapsableInput
                description={"Attack Ability Score: " + props.effect.attackAbilityScore.getDescription(props.selectedLevel)}
                listInput={
                    <AbilityScoreInputList
                        score={props.effect.attackAbilityScore}
                        onChange={props.onChange}
                    />
                }
            />
        </div>
    );
}

function DamageAbilityScoreInput(props) {
    // props: effect, onChange
    return (
        <div className="InputGroup AbilityScoreInput">
            <AbilityScorePresets
                score={props.effect.damageAbilityScore}
                onChange={props.onChange}
            />
            <CollapsableInput
                description={"Damage Ability Score: " + props.effect.damageAbilityScore.getDescription(props.selectedLevel)}
                listInput={
                    <AbilityScoreInputList
                        score={props.effect.damageAbilityScore}
                        onChange={props.onChange}
                    />
                }
            />
        </div>
    );
}

export { AttackAbilityScoreInput, DamageAbilityScoreInput }