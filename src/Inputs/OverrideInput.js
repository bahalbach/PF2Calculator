import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput } from './CommonInputs'


export function OverrideInput(props) {
    // props: effect, onEffectChange
    return (
        <div className="InputGroup OverrideInput">
            <CheckboxInput
                checked={props.effect.useOverride.isTrue()}
                onChange={props.onEffectChange.bind(null, "useOverride", null)}
                label="Override Attack Bonus?"
            />
            <CollapsableInput
                description={"Override: " + props.effect.override.getDescription(props.selectedLevel)}
                listInput={
                    <ByLevelInput
                        modifier={props.effect.override}
                        onChange={props.onEffectChange.bind(null, "override", null)}
                    />
                }
            />
        </div>
    );
}

export default OverrideInput


