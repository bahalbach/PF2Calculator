class MAP {
    constructor(prevAttacks = 0, initial = -5, changeLevel = null, changed = -4) {
        // -4, 1, 10, -3 for agile weapon with agile grace at 10
        this.prevAttacks = prevAttacks;
        this.initial = initial;
        this.changeLevel = changeLevel;
        this.changed = changed;

        this.value = new Array(20).fill(prevAttacks * initial);
        if( changeLevel !== null) {
            for (let level = changeLevel; level <= 20; level++) {
                this.value[level - 1] = prevAttacks * changed;
            }
        }
    }

    get(level) {
        return this.value[level - 1];
    }

    getPrevAttacks() {
        return this.prevAttacks;
    }

    getInitial() {
        return this.initial;
    }

    getChanged() {
        return this.changed;
    }

    getDescription(level) {
        if (level) {
            return "(" + this.get(level) + ")";
        }
        return "";
    }

    createUpdated(key, event) {
        switch (key) {
            case "prevAttacks":
                return new MAP(parseInt(event.target.value), this.initial, this.changeLevel, this.changed);
            case "initial":
                return new MAP(this.prevAttacks, parseInt(event.target.value), this.changeLevel, parseInt(event.target.value)+1);
            case "changeLevel":
                if (event.target.value === "never") {
                    return new MAP(this.prevAttacks, this.initial, null, this.changed);
                }
                return new MAP(this.prevAttacks, this.initial, parseInt(event.target.value), this.changed);
            case "changed":
                return new MAP(this.prevAttacks, Math.max(parseInt(event.target.value)-1,-5), this.changeLevel, parseInt(event.target.value));
            default:
                return new MAP();
        }
    }
}

export default MAP