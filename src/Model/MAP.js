class MAP {
    constructor(initial = 0, prevAttacks=0, additional=[]) {
        // -4, 1, [10, -3] for agile weapon with agile grace at 10
        this.initial = initial;
        this.value = new Array(20).fill(initial);
        this.prevAttacks = prevAttacks;
        for (const entry of additional) {
            for(let level=entry[0]; level<=20; level++) {
                this.value[level-1] = entry[1];
            }
        }
    }

    get(level) {
        return this.value[level - 1];
    }

    getInitial() {
        return this.initial;
    }

    getPrevAttacks() {
        return this.prevAttacks;
    }

    createUpdated(key, event) {
        switch (key) {
            case "initial":
                return new MAP(event.target.value[0],event.target.value[1]);
            default:
                return new MAP();
        }
    }
}

export default MAP