class MAP {
    // constructor(prevAttacks = 0, initial = -5, changeLevel = 0, changed = -4) {
    //     // -4, 1, 10, -3 for agile weapon with agile grace at 10
    //     this.prevAttacks = prevAttacks;
    //     this.initial = initial;
    //     this.changeLevel = changeLevel;
    //     this.changed = changed;

    //     this.value = new Array(20).fill(prevAttacks * initial);
    //     if( changeLevel ) {
    //         for (let level = changeLevel; level <= 20; level++) {
    //             this.value[level - 1] = prevAttacks * changed;
    //         }
    //     }
    // }

    static get(map, level) {
        return map.value[level - 1];
    }

    static getPrevAttacks(map) {
        return map.prevAttacks;
    }

    static getInitial(map) {
        return map.initial;
    }

    static getChanged(map) {
        return map.changed;
    }

    static getDescription(map, level) {
        if (level) {
            return "(" + map.value[level-1] + ")";
        }
        return "";
    }

    static createUpdated(map, params) {
        const key = params.key;
        const event = params.event;
        switch (key) {
            case "prevAttacks":
                return MAP.newMAP(parseInt(event), map.initial, map.changeLevel, map.changed);
            case "initial":
                return MAP.newMAP(map.prevAttacks, parseInt(event), map.changeLevel, Math.min(parseInt(event)+1,0));
            case "changeLevel":
                if (event === "never") {
                    return MAP.newMAP(map.prevAttacks, map.initial, null, map.changed);
                }
                return MAP.newMAP(map.prevAttacks, map.initial, parseInt(event), map.changed);
            case "changed":
                return MAP.newMAP(map.prevAttacks, Math.max(parseInt(event)-1,-5), map.changeLevel, parseInt(event));
            default:
                return MAP.newMAP();
        }
    }

    static newMAP(prevAttacks = 0, initial = -5, changeLevel = 0, changed = -4) { 
        const value = new Array(20).fill(prevAttacks * initial);
        if( changeLevel ) {
            for (let level = changeLevel; level <= 20; level++) {
                value[level - 1] = prevAttacks * changed;
            }
        }
        return {value, prevAttacks, initial, changeLevel, changed};
    }
}

export default MAP