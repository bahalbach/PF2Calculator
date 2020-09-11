import React from 'react';
import { SelectLevel, CollapsableInput } from './CommonInputs';
import { useSelector, useDispatch } from 'react-redux';
import {
    selectLevel,
    setMAP,
    selectMAP,
} from '../effectSlice';
import MAP from '../Model/MAP';

function MAPInput() {
    // props: effect, onChange, selectedLevel
    const dispatch = useDispatch();
    const map = useSelector(selectMAP);
    const level = useSelector(selectLevel);
    let levelChange = map.levelChange;
    if (levelChange === null) {
        levelChange = "never"
    }

    return (
        <CollapsableInput
            description={"Multiple Attack Penalty: " + MAP.getDescription(map, level)}
            listInput={<div className="MAPInput" >
                <div>
                    Number of Previous Attacks: {}
                    <select
                        value={MAP.getPrevAttacks(map)}
                        onChange={(event) => dispatch(setMAP({ key: "prevAttacks", event: event.target.value }))}
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
                        value={MAP.getInitial(map)}
                        onChange={(event) => dispatch(setMAP({ key: "initial", event: event.target.value  }))}
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
                            -0
                        </option>
                    </select>
                </div>
                <div>
                    (At level: {}
                    <SelectLevel value={levelChange}
                        onChange={(event) => dispatch(setMAP({ key: "changeLevel", event: event.target.value  }))}
                    />
                    , Change to: {}
                    <select
                        value={MAP.getChanged(map)}
                        onChange={(event) => dispatch(setMAP({ key: "changed", event: event.target.value  }))}
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