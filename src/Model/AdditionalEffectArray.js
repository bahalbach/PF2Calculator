class AdditionalEffectArray {
    // has an array of effect entries. 
    // Each effect entry has an Name, level added, and level removed

    constructor(values=[], extraLevelAdded=1,extraLevelRemoved=20) {
        this.length = values.length;
        this.effectEntries = values;
        this.extraLevelAdded = extraLevelAdded;
        this.extraLevelRemoved = extraLevelRemoved;
    }

    getName(index) {
        if ( index === this.length ) {
            return "None";
        }
        return this.effectEntries[index][0];
    }

    getLevelAdded(index) {
        if ( index === this.length ) {
            return this.extraLevelAdded;
        }
        return this.effectEntries[index][1];
    }

    getLevelRemoved(index) {
        if ( index === this.length ) {
            return this.extraLevelRemoved;
        }
        return this.effectEntries[index][2];
    }

    getDescription() {
        const nameSet = new Set();
        let desc = "Runes: ";
        for(let i=0; i<this.length; i++) {
            nameSet.add(this.effectEntries[i][0]);
        }
        for (let name of nameSet) {
            desc += " " + name;
        }
        return desc;
    }

    fromUpdateEntryEffect(index, value) {
        let newValues = this.effectEntries.slice();

        if ( index === this.length ) {
            console.log("here")
            newValues.push([value,this.extraLevelAdded,this.extraLevelRemoved]);
        }
        else if ( value === "None") {
            newValues.splice(index, 1);
        }
        else {
            newValues[index][0] = value;
        }

        return new AdditionalEffectArray(newValues, this.extraLevelAdded, this.extraLevelRemoved);
    }

    fromUpdateEntryLevelAdded(index, value) {
        let newValues = this.effectEntries.slice();
        if (!value) value=0;

        if ( index === this.length ) {
            this.extraLevelAdded = value;
        }
        else {
            newValues[index][1] = value;
        }

        return new AdditionalEffectArray(newValues, this.extraLevelAdded, this.extraLevelRemoved);
    }

    fromUpdateEntryLevelRemoved(index, value) {
        let newValues = this.effectEntries.slice();
        if (!value) value=0;

        if ( index === this.length ) {
            this.extraLevelRemoved = value;
        }
        else {
            newValues[index][2] = value;
        }

        return new AdditionalEffectArray(newValues, this.extraLevelAdded, this.extraLevelRemoved);
    }

    createUpdated(key, event, index ) {
        switch (key) {
            case "EntryName":
                return this.fromUpdateEntryEffect(index, event.target.value);

            case "LevelAdded":
                return this.fromUpdateEntryLevelAdded(index, parseInt(event.target.value));

            case "LevelRemoved":
                return this.fromUpdateEntryLevelRemoved(index, parseInt(event.target.value));
        
            default:
                return new AdditionalEffectArray();
        }
    }
}

class AdditionalEffectItem {

}

export default AdditionalEffectArray