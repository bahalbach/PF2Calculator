import React from 'react';

function ByLevelInput(props) {
    // level: value
    let levelList = [];
    for (let i = 1; i <= 20; i++) {
        levelList.push(
            <div key={i}>
                <label> Level {i}: { }
                    <input 
                        type="number" 
                        value={props.modifier.get(i)} 
                        onChange={props.onChange.bind(null,i)}
                    />
                </label>
            </div>
        );
    }
    return levelList;
}

export default ByLevelInput