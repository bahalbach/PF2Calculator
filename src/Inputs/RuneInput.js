import React from 'react';
import { CheckboxInput, CollapsableInput, LevelSelection } from './CommonInputs'

function RuneTable(props) {
    // props: runes, onChange
    
    const runes = props.runes;
    let rows = [];
    for(let index=0;index<runes.length;index++) {

    }
    const emptyEntry = <tr>
        <td>
        </td>
    </tr>

    return (
        <div className="TableInput">
            <table>
            <tbody>
                <tr>
                    <th>Rune Name</th>
                    <th>Level Added</th>
                    <th>Level Removed</th>
                </tr>
                {rows}
                </tbody>
            </table>
        </div>
    );
}

function RuneInput(props) {
    // props: effect, onChange, selectedLevel
    

    return (
        <div className="RuneInput">
        <CollapsableInput 
            description="Runes: "
            listInput={
                <RuneTable 
                    runes={props.effect.runes}
                    onChange={props.onChange}
                />
            }
            
        />
        </div>
        
    );
}

export default RuneInput