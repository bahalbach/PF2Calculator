import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLevel,
  selectUseOverride,
  selectOverride,
  setUseOverride,
  setOverride,
} from '../effectSlice';
import Modifier from '../Model/Modifier';

export function OverrideInput(props) {
    const useOverride = useSelector(selectUseOverride);
    const override = useSelector(selectOverride);
    const level = useSelector(selectLevel);
    const dispatch = useDispatch();

    return (
        <div className="InputGroup OverrideInput">
            <CheckboxInput
                checked={useOverride}
                onChange={(event) => dispatch(setUseOverride(event.target.checked))}
                label="Override Attack Bonus?"
            />
            <CollapsableInput
                description={"Override: " + Modifier.getDescription(override, level)}
                listInput={
                    <ByLevelInput
                        modifier={override}
                        action={setOverride}
                    />
                }
            />
        </div>
    );
}

export default OverrideInput


