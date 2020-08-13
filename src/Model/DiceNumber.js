class DiceNumber {
    constructor(values = null) {
        if (values === null) {
            this.values = new Array(20).fill(1);
            for (let i = 0; i < 20; i++) {
                if (i + 1 >= 19) {this.values[i] = 4; continue;}
                if (i + 1 >= 12) {this.values[i] = 3; continue;}
                if (i + 1 >= 4) {this.values[i] = 2; continue;}
            }
        } else
            this.values = values;
    }

    get(level) {
        return this.values[level - 1]
    }

    getDescription(level) {
        let desc = " ";
        if (level) {
            desc += "(" + this.get(level) + ") ";
        }

        desc += this.values[0] + " to " + this.values[19];

        return desc;
    }

    isOne() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 0) return false;
        }
        return true;
    }

    isABPWeapon() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 19) {if (this.values[i] !== 4) return false; else continue;}
            if (i + 1 >= 12) {if (this.values[i] !== 3) return false; else continue;}
            if (i + 1 >= 4) {if (this.values[i] !== 2) return false; else continue;}
            if (this.values[i] !== 1) return false; else continue;
        }
        return true;
    }

    createUpdated(key, event) {
        let newValues;
        switch (key) {
            case "One":
                newValues = new Array(20).fill(1);
                return new DiceNumber(newValues);

            case "ABPWeapon":
                newValues = new Array(20).fill(1);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 19) {newValues[i] = 4; continue;}
                    if (i + 1 >= 12) {newValues[i] = 3; continue;}
                    if (i + 1 >= 4) {newValues[i] = 2; continue;}
                }
                return new DiceNumber(newValues);

            default:
                newValues = this.values.slice();
                newValues[key-1] = parseInt(event.target.value);
                return new DiceNumber(newValues);
        }
    }
}

export default DiceNumber