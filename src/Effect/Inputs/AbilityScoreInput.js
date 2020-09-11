import React from 'react';
import { CheckboxInput, CollapsableInput, LevelSelection } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLevel,
  selectAttackAbilityScore,
  selectDamageAbilityScore,
  setAttackAbilityScore,
  setDamageAbilityScore,
} from '../effectSlice';
import AbilityScore from '../Model/AbilityScore';

function AbilityScoreInputList(props) {
    const dispatch = useDispatch();

    const score = props.score;
    let scoreList = [];
    scoreList.push(
        <div key="initial">
            <label> Initial: {}
                <select
                    value={AbilityScore.getInitial(score)}
                    onChange={(event)=>dispatch(props.action({key: "initial", eventValue: event.target.value}))}
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
    const boosts = AbilityScore.getBoosts(score);
    for (let i = 0; i < boosts.length; i++) {
        scoreList.push(
            <div key={i}>
                <label> Boost {(1 + i) * 5}: {}
                    <input
                        type="checkbox"
                        checked={boosts[i]}
                        onChange={(event)=>dispatch(props.action({key: i, eventChecked: event.target.checked}))}
                    />
                </label>
            </div>
        );
    }
    let apexLevel = AbilityScore.getApexLevel(score);
    if (apexLevel === null) apexLevel = "never";
    scoreList.push(
        <LevelSelection key="apex" name="Apex Level"
            value={apexLevel} onChange={(event)=>dispatch(props.action({key: "apex", eventValue: event.target.value}))}
        />
    );

    return (
        <div className="AbilityScoreInput">
            {scoreList}
        </div>
    );

}

function AbilityScorePresets(props) {
    const dispatch = useDispatch();
    const score = props.score;

    return (
        <div className="Presets AbilityScorePresets">
            <CheckboxInput className="PresetItem"
                checked={AbilityScore.is18a(score)}
                onChange={()=>dispatch(props.action({key: "18a"}))}
                label={"18a"}
            />
            <CheckboxInput className="PresetItem"
                checked={AbilityScore.is16a(score)}
                onChange={()=>dispatch(props.action({key: "16a"}))}
                label={"16a"}
            />
            <CheckboxInput className="PresetItem"
                checked={AbilityScore.is16pp(score)}
                onChange={()=>dispatch(props.action({key: "16++"}))}
                label={"16++"}
            />
            <CheckboxInput className="PresetItem"
                checked={AbilityScore.is14p(score)}
                onChange={()=>dispatch(props.action({key: "14+"}))}
                label={"14+"}
            />
            <CheckboxInput className="PresetItem"
                checked={AbilityScore.is10(score)}
                onChange={()=>dispatch(props.action({key: "10"}))}
                label={"10"}
            />
        </div>
    );
}

function AttackAbilityScoreInput() {
    const level = useSelector(selectLevel);
    const attackAbilityScore = useSelector(selectAttackAbilityScore);

    return (
        <div className="InputGroup AbilityScoreInput">
            <AbilityScorePresets
                score={attackAbilityScore}
                action={setAttackAbilityScore}
            />
            <CollapsableInput
                description={"Attack Ability Score: " + AbilityScore.getDescription(attackAbilityScore,level)}
                listInput={
                    <AbilityScoreInputList
                        score={attackAbilityScore}
                        action={setAttackAbilityScore}
                    />
                }
            />
        </div>
    );
}

function DamageAbilityScoreInput() {
    const level = useSelector(selectLevel);
    const damageAbilityScore = useSelector(selectDamageAbilityScore);

    return (
        <div className="InputGroup AbilityScoreInput">
            <AbilityScorePresets
                score={damageAbilityScore}
                action={setDamageAbilityScore}
            />
            <CollapsableInput
                description={"Damage Ability Score: " + AbilityScore.getDescription(damageAbilityScore,level)}
                listInput={
                    <AbilityScoreInputList
                        score={damageAbilityScore}
                        action={setDamageAbilityScore}
                    />
                }
            />
        </div>
    );
}

export { AttackAbilityScoreInput, DamageAbilityScoreInput }