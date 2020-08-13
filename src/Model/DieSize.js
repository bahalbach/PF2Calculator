class DieSize {
    constructor(values = null) {
        if (values === null) {
            this.values = new Array(20).fill(8);
        } else
            this.values = values;
    }

    get(level) {
        return this.values[level - 1]
    }

    getDescription(level) {
        let desc = " ";
        if (level) {
            desc += "(d" + this.get(level) + ") ";
        }

        desc += "d" + this.values[0] + " to " + "d" + this.values[19];

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

    createUpdated(key, event) {
        let newValues;
        switch (key) {
            case "d4":
                newValues = new Array(20).fill(4);
                return new DieSize(newValues);
            case "d6":
                newValues = new Array(20).fill(6);
                return new DieSize(newValues);
            case "d8":
                newValues = new Array(20).fill(8);
                return new DieSize(newValues);
            case "d10":
                newValues = new Array(20).fill(10);
                return new DieSize(newValues);
            case "d12":
                newValues = new Array(20).fill(12);
                return new DieSize(newValues);

            default:
                newValues = this.values.slice();
                newValues[key - 1] = parseInt(event.target.value);
                return new DieSize(newValues);
        }
    }
}

export default DieSize