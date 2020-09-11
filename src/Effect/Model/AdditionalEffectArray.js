class AdditionalEffectArray {
    // has an array of effect entries. 
    // Each effect entry has an Name, level added, and level removed

    // constructor(values = [], extraLevelAdded = 1, extraLevelRemoved = 0) {
    //     aea.length = values.length;
    //     aea.effectEntries = values;
    //     aea.extraLevelAdded = extraLevelAdded;
    //     aea.extraLevelRemoved = extraLevelRemoved;
    // }

    static newAdditionalEffectArray(effectEntries = [], extraLevelAdded = 1, extraLevelRemoved = 0) {
        const length = effectEntries.length;
        return {length, effectEntries, extraLevelAdded, extraLevelRemoved};
    }

    static getName(aea, index) {
        if (index === aea.length) {
            return "None";
        }
        return aea.effectEntries[index][0];
    }

    static getLevelAdded(aea, index) {
        if (index === aea.length) {
            return aea.extraLevelAdded;
        }
        return aea.effectEntries[index][1];
    }

    static getLevelRemoved(aea, index) {
        if (index === aea.length) {
            return aea.extraLevelRemoved;
        }
        return aea.effectEntries[index][2];
    }

    static getDescription(aea) {
        const nameSet = new Set();
        let desc = "Runes: ";
        if (aea.length === 0) {
            desc += "None";
        } else {
            for (let i = 0; i < aea.length; i++) {
                nameSet.add(aea.effectEntries[i][0]);
            }
            for (let name of nameSet) {
                desc += " " + name;
            }
        }
        return desc;
    }

    static fromUpdateEntryEffect(aea, index, value) {
        let newValues = aea.effectEntries.slice();

        if (index === aea.length) {
            console.log("here")
            newValues.push([value, aea.extraLevelAdded, aea.extraLevelRemoved]);
        }
        else if (value === "None") {
            newValues.splice(index, 1);
        }
        else {
            newValues[index][0] = value;
        }

        return AdditionalEffectArray.newAdditionalEffectArray(newValues, aea.extraLevelAdded, aea.extraLevelRemoved);
    }

    static fromUpdateEntryLevelAdded(aea, index, value) {
        let newValues = aea.effectEntries.slice();
        if (!value) value = 0;

        if (index === aea.length) {
            aea.extraLevelAdded = value;
        }
        else {
            newValues[index][1] = value;
        }

        return AdditionalEffectArray.newAdditionalEffectArray(newValues, aea.extraLevelAdded, aea.extraLevelRemoved);
    }

    static fromUpdateEntryLevelRemoved(aea, index, value) {
        let newValues = aea.effectEntries.slice();
        if (!value) value = 0;

        if (index === aea.length) {
            aea.extraLevelRemoved = value;
        }
        else {
            newValues[index][2] = value;
        }

        return AdditionalEffectArray.newAdditionalEffectArray(newValues, aea.extraLevelAdded, aea.extraLevelRemoved);
    }

    static createUpdated(aea, params) {
        const key = params.key;
        const index = params.index;
        const event = params.event;

        switch (key) {
            case "EntryName":
                return AdditionalEffectArray.fromUpdateEntryEffect(aea, index, event);

            case "LevelAdded":
                return AdditionalEffectArray.fromUpdateEntryLevelAdded(aea, index, parseInt(event));

            case "LevelRemoved":
                return AdditionalEffectArray.fromUpdateEntryLevelRemoved(aea, index, parseInt(event));

            default:
                return AdditionalEffectArray.newAdditionalEffectArray();
        }
    }
}

class AdditionalEffectItem {

}

export default AdditionalEffectArray