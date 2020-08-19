import React from 'react';
import { SelectLevel, CollapsableInput } from './CommonInputs'

function MAPInput(props) {
    // props: effect, onChange, selectedLevel
    let MAP = props.effect.MAP;
    let levelChange = MAP.levelChange;
    if (levelChange === null) {
        levelChange = "never"
    }

    return (
        <CollapsableInput
            description={"Multiple Attack Penalty: " + MAP.getDescription(props.selectedLevel)}
            listInput={<div className="MAPInput" >
                <div>
                    Number of Previous Attacks: {}
                    <select
                        value={MAP.getPrevAttacks()}
                        onChange={props.onChange.bind(null, "prevAttacks")}
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
                    {} x {}
                    <select
                        value={MAP.getInitial()}
                        onChange={props.onChange.bind(null, "initial")}
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
                </div>
                <div>
                    (At level: {}
                    <SelectLevel value={levelChange}
                        onChange={props.onChange.bind(null, "changeLevel")}
                    />
                         , Change to: {}
                    <select
                        value={MAP.getChanged()}
                        onChange={props.onChange.bind(null, "changed")}
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


            </div>}
        />

    );
}

export default MAPInput