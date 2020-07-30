import React from 'react';
import AbilityScore from './AbilityScore';
import LevelSelection from './LevelSelection';

function AbilityScoreInput(props) {
    // props: score, onChange

    const score = props.score;
    let scoreList = [];
    scoreList.push(
        <div key="initial">
            <label> Initial: { } 
                <select 
                    value={score.getInitial()}
                    onChange={props.onChange.bind(null,"initial")}
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
    for(let i=0; i<boosts.length; i++) {
        scoreList.push(
            <div key={i}>
                <label> Boost {(1+i)*5}: { }
                    <input 
                        type="checkbox" 
                        checked={boosts[i]} 
                        onChange={props.onChange.bind(null,i)}
                    />
                </label>
            </div>
        );
    }
    let apexLevel = score.getApexLevel();
    if (apexLevel === null) apexLevel = "never";
    scoreList.push(
        <LevelSelection key="apex" name="Apex Level" 
            value={apexLevel} onChange={props.onChange.bind(null,"apex")}
        />
    );
    

    return (
        <div className="AbilityScoreInput">
            {scoreList}
        </div>
    );

}

export default AbilityScoreInput