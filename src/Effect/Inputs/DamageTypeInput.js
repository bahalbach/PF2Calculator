import React from 'react';
import { damageTypes, preciousMaterials } from '../Model/Features.js';
import { useSelector, useDispatch } from 'react-redux';
import { selectDamageType, setDamageType } from '../effectSlice.js';
import { DamageType } from '../Model/DamageType.js';


function DamageTypeInput(props) {
    const damageType = useSelector(selectDamageType);
    const dispatch = useDispatch();

    let damageTypeList = [];
    for (let i = 0; i < damageTypes.length; i++) {
        damageTypeList.push(
            <option key={damageTypes[i]}
                value={damageTypes[i]}>
                {damageTypes[i]}
            </option>
        );
    }
    let pmTypeList = [];
    for (let i = 0; i < preciousMaterials.length; i++) {
        pmTypeList.push(
            <option key={preciousMaterials[i]}
                value={preciousMaterials[i]}>
                {preciousMaterials[i]}
            </option>
        );
    }
    return (
        <div>
        Damage Type: {}
        <select
            value={damageType.damageType}
            onChange={e => dispatch(setDamageType({damageType: e.target.value, preciousMaterials: damageType.preciousMaterials}))}
        >
            {damageTypeList}
        </select>
        <br />
        Precious Materials: {}
        <select
            value={damageType.preciousMaterials}
            onChange={e => dispatch(setDamageType({damageType: damageType.damageType, preciousMaterials: e.target.value}))}
        >
            <option value="None">
                None
            </option>
            {pmTypeList}
        </select>
        </div>

    );
}

export default DamageTypeInput