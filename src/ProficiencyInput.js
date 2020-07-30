import React from 'react';
import Proficiency from './Proficiency';
import LevelSelection from './LevelSelection';

function ProficiencyInput(props) {
    // props: proficiency, onChange
    
    let prof = props.proficiency;

    let profList = prof.getProficiencies().map(
        (profValue, index) => {
            if (index === 0) {
                return (
                    <div key="initial">
                        <label> Initial: {}
                            <select
                                value={prof.getInitial()}
                                onChange={props.onChange.bind(null,"initial")}
                            >
                                <option value="0">
                                    Untrained
                                </option>
                                <option value="1">
                                    Trained
                                </option>
                                <option value="2">
                                    Expert
                                </option>
                                <option value="3">
                                    Master
                                </option>
                                <option value="4">
                                    Legendary
                                </option>
                            </select>
                        </label>
                    </div>
                );
            } else {
                let value = prof.getLevelAcquired(profValue);
                if (value === null) value = "never";
                return (
                    <LevelSelection key={profValue} name={Proficiency.toName(profValue)}
                        value={value} onChange={props.onChange.bind(null, profValue)}
                    />
                );
            }
        }
    );
    if (prof.getMax() < 4) {
        profList.push(<LevelSelection key={prof.getMax() + 1} name={Proficiency.toName(prof.getMax() + 1)}
            value="never" onChange={props.onChange.bind(null, prof.getMax() + 1)}
        />);
    }


    return (
        <div className="ProficiencyInput">
            {profList}
        </div>
    );

}


export default ProficiencyInput