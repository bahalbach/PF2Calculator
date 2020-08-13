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
        } else
            this.values = values;
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

    createUpdated(key, event) {
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

            default:
                newValues = this.values.slice();
                newValues[key - 1] = parseInt(event.target.value);
        }
        return new Modifier(newValues);
    }
}

export default Modifier