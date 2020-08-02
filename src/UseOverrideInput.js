import React from 'react';

function UseOverrideInput(props) {

    return (
        <label> <input
            type="checkbox"
            checked={props.override.isUse()}
            onChange={props.onChange.bind(null, "use")}
        />
                    Override Attack Bonus?
        </label>
    );

}

export default UseOverrideInput