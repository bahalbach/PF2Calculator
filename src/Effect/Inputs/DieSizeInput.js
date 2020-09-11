import React from 'react';
import { CheckboxInput, CollapsableInput, ByLevelInput2 } from './CommonInputs'
import { useSelector, useDispatch } from 'react-redux';
import {
  selectLevel,
  setDieSize,
  selectDieSize,
} from '../effectSlice';
import Modifier from '../Model/Modifier';

function DieSizePresets(props) {
    const dispatch = useDispatch();
    const action = props.action;

    return (
        <div className="Presets DieSizePresets">
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(props.dieSize, 4)}
                onChange={() => dispatch(action({key: "d4"}))}
                label={"d4"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(props.dieSize, 6)}
                onChange={() => dispatch(action({key: "d6", }))}
                label={"d6"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(props.dieSize, 8)}
                onChange={() => dispatch(action({key: "d8", }))}
                label={"d8"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(props.dieSize, 10)}
                onChange={() => dispatch(action({key: "d10", }))}
                label={"d10"}
            />
            <CheckboxInput className="PresetItem"
                checked={Modifier.is(props.dieSize, 12)}
                onChange={() => dispatch(action({key: "d12", }))}
                label={"d12"}
            />
        </div>
    );
}

function DieSizeInput() {
    const level = useSelector(selectLevel);
    const dieSize = useSelector(selectDieSize);

    return (
        <div className="InputGroup DieSizeInput" >
            <DieSizePresets 
                dieSize={dieSize}
                action={setDieSize}
            />
        
        <CollapsableInput
                description={"Die Size: " + Modifier.getDieSizeDescription(dieSize, level)}
                listInput={
                    <ByLevelInput2
                        modifier={dieSize}
                        action={setDieSize}
                    />
                }
            />
        </div>
    );
}

export { DieSizeInput }