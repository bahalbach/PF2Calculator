class ItemBonus {
    constructor(values = null) {
        if (values === null) {
            this.values = new Array(20).fill(0);
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

    isNone() {
        for (let i = 0; i < 20; i++) {
            if (this.values[i] !== 0) return false;
        }
        return true;
    }

    isABPWeapon() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 16) {if (this.values[i] !== 3) return false; else continue;}
            if (i + 1 >= 10) {if (this.values[i] !== 2) return false; else continue;}
            if (i + 1 >= 2) {if (this.values[i] !== 1) return false; else continue;}
            if (this.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    isABPSkill1() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 17) {if (this.values[i] !== 3) return false; else continue;}
            if (i + 1 >= 9) {if (this.values[i] !== 2) return false; else continue;}
            if (i + 1 >= 3) {if (this.values[i] !== 1) return false; else continue;}
            if (this.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    isABPSkill2() {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 20) {if (this.values[i] !== 3) return false; else continue;}
            if (i + 1 >= 13) {if (this.values[i] !== 2) return false; else continue;}
            if (i + 1 >= 6) {if (this.values[i] !== 1) return false; else continue;}
            if (this.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    createUpdated(key, event) {
        let newValues;
        switch (key) {
            case "None":
                newValues = new Array(20).fill(0);
                return new ItemBonus(newValues);
            case "ABPWeapon":
                newValues = new Array(20).fill(0);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 16) {newValues[i] = 3; continue;}
                    if (i + 1 >= 10) {newValues[i] = 2; continue;}
                    if (i + 1 >= 2) {newValues[i] = 1; continue;}
                }
                return new ItemBonus(newValues);
            case "ABPSkill1":
                newValues = new Array(20).fill(0);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 17) {newValues[i] = 3; continue;}
                    if (i + 1 >= 9) {newValues[i] = 2; continue;}
                    if (i + 1 >= 3) {newValues[i] = 1; continue;}
                }
                return new ItemBonus(newValues);
            case "ABPSkill2":
                newValues = new Array(20).fill(0);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 20) {newValues[i] = 3; continue;}
                    if (i + 1 >= 13) {newValues[i] = 2; continue;}
                    if (i + 1 >= 6) {newValues[i] = 1; continue;}
                }
                return new ItemBonus(newValues);
            // case "ABPSkill3":
            //     newValues = new Array(20).fill(0);
            //     for (let i = 0; i < 20; i++) {
            //         if (i + 1 >= 15) newValues[i] = 2;
            //         if (i + 1 >= 9) newValues[i] = 1;
            //     }
            //     return new ItemBonus(newValues);
            // case "ABPSkill4":
            //     newValues = new Array(20).fill(0);
            //     for (let i = 0; i < 20; i++) {
            //         if (i + 1 >= 20) newValues[i] = 2;
            //         if (i + 1 >= 15) newValues[i] = 1;
            //     }
            //     return new ItemBonus(newValues);
            // case "ABPSkill5":
            //     newValues = new Array(20).fill(0);
            //     for (let i = 0; i < 20; i++) {
            //         if (i + 1 >= 17) newValues[i] = 1;
            //     }
            //     return new ItemBonus(newValues);
            // case "ABPSkill6":
            //     newValues = new Array(20).fill(0);
            //     for (let i = 0; i < 20; i++) {
            //         if (i + 1 >= 20) newValues[i] = 1;
            //     }
            //     return new ItemBonus(newValues);
            // case "ABPPerception":
            //     newValues = new Array(20).fill(0);
            //     for (let i = 0; i < 20; i++) {
            //         if (i + 1 >= 19) newValues[i] = 3;
            //         if (i + 1 >= 13) newValues[i] = 2;
            //         if (i + 1 >= 7) newValues[i] = 1;
            //     }
            //     return new ItemBonus(newValues);
            default:
                newValues = this.values.slice();
                newValues[key-1] = parseInt(event.target.value);
                return new ItemBonus(newValues);
        }
    }
}

export default ItemBonus