import React from 'react';

function MAPInput(props) {
    // props: effect, onChange, selectedLevel
    let MAP = props.effect.MAP;
    let levelChange = MAP.levelChange;
    if (levelChange === null) {
        levelChange = "never"
    }

    return (
        <div className="MAPInput" >
            <div className="Description">
                MAP: {MAP.getDescription(props.selectedLevel)}
            </div>
            <select
                                value={MAP.getPrevAttacks()}
                                onChange={props.onChange.bind(null,"prevAttacks")}
                            >
                                <option value="0">
                                    0
                                </option>
                                <option value="1">
                                    1
                                </option>
                                <option value="2">
                                    2+
                                </option>
                                
                            </select>
                            x
                            <select
                                value={MAP.getInitial()}
                                onChange={props.onChange.bind(null,"initial")}
                            >
                                <option value="-5">
                                    -5
                                </option>
                                <option value="-4">
                                    -4
                                </option>
                                <option value="-3">
                                    -3
                                </option>
                                <option value="-2">
                                    -2
                                </option>
                                <option value="-1">
                                    -1
                                </option>
                            </select>
                            
                    (@
                        <select value={levelChange} 
                                onChange={props.onChange.bind(null, "changeLevel")}
                            >
                                <option value="never">
                                    Never
                                </option>
                                <option value="1">
                                    1
                                </option>
                                <option value="2">
                                    2
                                </option>
                                <option value="3">
                                    3
                                </option>
                                <option value="4">
                                    4
                                </option>
                                <option value="5">
                                    5
                                </option>
                                <option value="6">
                                    6
                                </option>
                                <option value="7">
                                    7
                                </option>
                                <option value="8">
                                    8
                                </option>
                                <option value="9">
                                    9
                                </option>
                                <option value="10">
                                    10
                                </option>
                                <option value="11">
                                    11
                                </option>
                                <option value="12">
                                    12
                                </option>
                                <option value="13">
                                    13
                                </option>
                                <option value="14">
                                    14
                                </option>
                                <option value="15">
                                    15
                                </option>
                                <option value="16">
                                    16
                                </option>
                                <option value="17">
                                    17
                                </option>
                                <option value="18">
                                    18
                                </option>
                                <option value="19">
                                    19
                                </option>
                                <option value="20">
                                    20
                                </option>
                            </select>
                        =
                        <select
                                value={MAP.getChanged()}
                                onChange={props.onChange.bind(null,"changed")}
                            >
                                <option value="-5">
                                    -5
                                </option>
                                <option value="-4">
                                    -4
                                </option>
                                <option value="-3">
                                    -3
                                </option>
                                <option value="-2">
                                    -2
                                </option>
                                <option value="-1">
                                    -1
                                </option>
                                <option value="0">
                                    0
                                </option>
                            </select>
                    )
                
                        
                   
        </div>
    );
}

export default MAPInput