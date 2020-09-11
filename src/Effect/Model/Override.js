class Override {
    constructor(use = false, values = null) {
        this.use = use;
        if (values===null) {
            this.values = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20];
        } else
            this.values = values;
    }

    isUse() {
        return this.use;
    }

    get(level) {
        return this.values[level - 1];
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
        let newOverride;
        switch (key) {
            case "use":
                newOverride = new Override(event.target.checked, this.values);
                break;
            default:
                let newValues = this.values.slice();
                newValues[key-1] = event.target.value;
                newOverride = new Override(this.use, newValues);
        }
        return newOverride;
    }
}

export default Override