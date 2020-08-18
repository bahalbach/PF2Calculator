class AdditionalEffectArray {
    // has an array of effect entries. 
    // Each effect entry has an AdditionalEffect, level added, and level removed

    constructor(length=0,values=[]) {
        this.length = length;
        this.effectEntries = values;
    }

    createUpdated(key, event, index) {
        switch (key) {
            case "Effect":
                let effectName=event.target.value;

                break;

            case "LevelAdded":
                break;

            case "LevelRemoved":
                break;
        }
    }
}

export default AdditionalEffectArray