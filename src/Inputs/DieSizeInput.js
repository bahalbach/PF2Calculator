import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'

function DieSizePresets(props) {
    // props: diceNum, onChange
    return (
        <div className="Presets DieSizePresets">
            <CheckboxInput className="PresetItem"
                checked={props.dieSize.isd4()}
                onChange={props.onChange.bind(null, "d4")}
                label={"d4"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.dieSize.isd6()}
                onChange={props.onChange.bind(null, "d6")}
                label={"d6"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.dieSize.isd8()}
                onChange={props.onChange.bind(null, "d8")}
                label={"d8"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.dieSize.isd10()}
                onChange={props.onChange.bind(null, "d10")}
                label={"d10"}
            />
            <CheckboxInput className="PresetItem"
                checked={props.dieSize.isd12()}
                onChange={props.onChange.bind(null, "d12")}
                label={"d12"}
            />
        </div>
    );
}

function DieSizeInput(props) {
    // props: effect, onChange
    return (
        <div className="InputGroup DieSizeInput" >
            <DieSizePresets 
                dieSize={props.effect.dieSize}
                onChange={props.onChange.bind(null,null)}
            />
        
        <CollapsableInput
                description={"Die Size: " + props.effect.dieSize.getDieSizeDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput2
                        modifier={props.effect.dieSize}
                        onChange={props.onChange}
                    />
                }
            />
        </div>
    );
}

export { DieSizeInput }