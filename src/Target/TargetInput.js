import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
  setLevel,
  setAC,
  selectLevel,
  selectAC,
} from './targetSlice';

function TargetInput() {
    const level = useSelector(selectLevel);
    const AC = useSelector(selectAC);
    const dispatch = useDispatch();
    const [tempLevel, setTempLevel] = useState('1');
    return (
        <div className="TargetInput">
            <div>
                <label>Target Level:
                <input type="number"
                        min="1"
                        max="20"
                        step="1"
                        value={tempLevel}
                        onChange={e => setTempLevel(e.target.value)}
                        onBlur={() => dispatch(setLevel(Number(tempLevel) || 0))}
                    /><br />
                1
                <input type="range"
                        min="1"
                        max="20"
                        step="1"
                        value={level}
                        onChange={e => {
                            setTempLevel(e.target.value)
                            dispatch(setLevel(Number(e.target.value) || 0))}
                        }
                    />
                20
            </label>
            </div>
            <div>
                <label>Target AC: {}
                    <input type="number"
                        value={AC}
                        onChange={e => dispatch(setAC(Number(e.target.value) || 0))}
                    />

                </label>
            </div>

        </div>
    );
}

export default TargetInput