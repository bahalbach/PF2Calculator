import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput } from './CommonInputs'

function MAPInput(props) {
    // props: effect, onChange
    return (
        <div className="MAPInput" >
            <div key="initial">
                        <label> Initial: {}
                            <select
                                value={props.effect.MAP.getInitial()}
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
        </div>
    );
}

export default MAPInput