// Store:
//     item bonuses
//     if using other bonuses/penalties
//     item penalties
//     status bonuses
//     status penalties
//     circumstance bonuses
//     circumstance penalties
//     untyped penalties (other than MAP)

// Also can be used for damage bonuses like Weapon specialization 

class Modifier {
    constructor(values = null) {
        if (values === null) {
            this.values = new Array(20).fill(0);
            this.entries = [[1, 0]];
            this.extra = 0;
        } else {
            this.values = values;
            this.generateEntries();
            this.extra = 0;
        }
        // console.log(this.values);
        // console.log(this.entries);
    }

    get(level) {
        return this.values[level - 1]
    }

    is(value) {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== value) return false;
        }
        return true;
    }

    generateEntries() {
        let currentValue = this.values[0];
        this.entries = [[1, currentValue]];
        for (let level = 2; level <= 20; level++) {
            if (currentValue !== this.values[level - 1]) {
                currentValue = this.values[level - 1];
                this.entries.push([level, currentValue]);
            }
        }
    }

    getByLevelEntries() {
        return this.entries;
    }

    fromChangedEntryLevel(index, value) {
        if (index === this.entries.length) {
            // TODO: place value in entries at appropiate location
            for(let i=0; i<=this.entries.length; i++) {
                if ( i===this.entries.length || this.entries[i][0]  > value) {
                    this.entries.splice(i,0,[value, this.extra]);
                    break;
                }
            }
        } else {
            this.entries[index][0] = value;
        }

        return this.newModifierFromEntries(this.entries, this.extra);
    }

    fromChangedEntryValue(index, value) {

        if (index === this.entries.length) {
            this.extra = value;
        } else {
            this.entries[index][1] = value;
        }

        return this.newModifierFromEntries(this.entries, this.extra);
    }

    newModifierFromEntries(entries, extra = 0) {
        let values = [];
        let currentValue = 0;
        let currentIndex = 0;
        for (let level = 1; level <= 20; level++) {
            if (entries[currentIndex] && entries[currentIndex][0] === level) {
                currentValue = entries[currentIndex][1];
                if (!currentValue) currentValue = 0;
                currentIndex++;
            }
            values.push(currentValue);
        }
        const mod = new Modifier(values);
        mod.extra = extra;
        return mod;
    }

    isWSMartial() {
        for (let level = 1; level <= 20; level++) {
            if (level < 7) {
                if (this.values[level - 1] !== 0) return false;
            }
            if (level >= 7 && level < 15) {
                if (this.values[level - 1] !== 1) return false;
            }
            if (level >= 15) {
                if (this.values[level - 1] !== 2) return false;
            }
        }
        return true;
    }

    isWSCaster() {
        for (let level = 1; level <= 20; level++) {
            if (level < 13) {
                if (this.values[level - 1] !== 0) return false;
            }
            if (level >= 13) {
                if (this.values[level - 1] !== 1) return false;
            }
        }
        return true;
    }

    getDescription(level) {
        let desc = " ";
        if (level) {
            desc += "(" + this.get(level) + ") ";
        }

        desc += this.values[0] + " to " + this.values[19];

        return desc;
    }

    createUpdated(key, event, index) {
        let newValues;
        switch (key) {

            case "0":
                newValues = new Array(20).fill(0);
                break;
            case "+1":
            case "-1":
                newValues = new Array(20).fill(1);
                break;
            case "+2":
            case "-2":
                newValues = new Array(20).fill(2);
                break;
            case "+3":
            case "-3":
                newValues = new Array(20).fill(3);
                break;
            case "+4":
            case "-4":
                newValues = new Array(20).fill(4);
                break;

            case "WSMartial":
                newValues = new Array(20).fill(0);
                for (let level = 7; level <= 20; level++) {
                    if (level < 15) {
                        newValues[level - 1] = 1;
                    }
                    if (level >= 15) {
                        newValues[level - 1] = 2;
                    }
                }
                break;
            case "WSCaster":
                newValues = new Array(20).fill(0);
                for (let level = 13; level <= 20; level++) {
                    newValues[level - 1] = 1;
                }
                break;

            case "d4":
                newValues = new Array(20).fill(4);
                break;
            case "d6":
                newValues = new Array(20).fill(6);
                break;
            case "d8":
                newValues = new Array(20).fill(8);
                break;
            case "d10":
                newValues = new Array(20).fill(10);
                break;
            case "d12":
                newValues = new Array(20).fill(12);
                break;

            case "None":
                newValues = new Array(20).fill(0);
                break;
            case "ABPWeapon":
                newValues = new Array(20).fill(0);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 16) { newValues[i] = 3; continue; }
                    if (i + 1 >= 10) { newValues[i] = 2; continue; }
                    if (i + 1 >= 2) { newValues[i] = 1; continue; }
                }
                break;
            case "ABPSkill1":
                newValues = new Array(20).fill(0);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 17) { newValues[i] = 3; continue; }
                    if (i + 1 >= 9) { newValues[i] = 2; continue; }
                    if (i + 1 >= 3) { newValues[i] = 1; continue; }
                }
                break;
            case "ABPSkill2":
                newValues = new Array(20).fill(0);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 20) { newValues[i] = 3; continue; }
                    if (i + 1 >= 13) { newValues[i] = 2; continue; }
                    if (i + 1 >= 6) { newValues[i] = 1; continue; }
                }
                break;

            case "EntryLevel":
                return this.fromChangedEntryLevel(index, parseInt(event.target.value));

            case "EntryValue":
                return this.fromChangedEntryValue(index, parseInt(event.target.value));

            default:
                newValues = this.values.slice();
                newValues[key - 1] = parseInt(event.target.value);
        }
        return new Modifier(newValues);
    }

    // For acting as Die Size--------------------------------------
    getDieSizeDescription(level) {
        let desc = " ";
        if (level) {
            desc += "(d" + this.get(level) + ") ";
        }

        desc += "d" + this.values[0] + " to d" + this.values[19];

        return desc;
    }

    isd4() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 4) return false;
        }
        return true;
    }

    isd6() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 6) return false;
        }
        return true;
    }

    isd8() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 8) return false;
        }
        return true;
    }

    isd10() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 10) return false;
        }
        return true;
    }

    isd12() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 12) return false;
        }
        return true;
    }

    // For acting as item bonus
    isNone() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 0) return false;
        }
        return true;
    }

    isABPWeapon() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 16) { if (this.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 10) { if (this.values[i] !== 2) return false; else continue; }
            if (i + 1 >= 2) { if (this.values[i] !== 1) return false; else continue; }
            if (this.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    isABPSkill1() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 17) { if (this.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 9) { if (this.values[i] !== 2) return false; else continue; }
            if (i + 1 >= 3) { if (this.values[i] !== 1) return false; else continue; }
            if (this.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    isABPSkill2() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 20) { if (this.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 13) { if (this.values[i] !== 2) return false; else continue; }
            if (i + 1 >= 6) { if (this.values[i] !== 1) return false; else continue; }
            if (this.values[i] !== 0) return false; else continue;
        }
        return true;
    }


}

export default Modifier