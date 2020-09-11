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
    // constructor(values = null) {
    //     if (values === null) {
    //         mod.values = new Array(20).fill(0);
    //         mod.entries = [[1, 0]];
    //         mod.extra = 0;
    //     } else {
    //         mod.values = values;
    //         mod.generateEntries();
    //         mod.extra = 0;
    //     }
    //     // console.log(mod.values);
    //     // console.log(mod.entries);
    // }

    // get(level) {
    //     return mod.values[level - 1]
    // }

    // is(value) {
    //     for (let i = 0; i < 20; i++) {
    //         if (mod.values[i] !== value) return false;
    //     }
    //     return true;
    // }

    // generateEntries() {
    //     let currentValue = mod.values[0];
    //     mod.entries = [[1, currentValue]];
    //     for (let level = 2; level <= 20; level++) {
    //         if (currentValue !== mod.values[level - 1]) {
    //             currentValue = mod.values[level - 1];
    //             mod.entries.push([level, currentValue]);
    //         }
    //     }
    // }

    // getByLevelEntries() {
    //     return mod.entries;
    // }

    // fromChangedEntryLevel(index, value) {
    //     let entries = mod.entries.slice();

    //     if (index === entries.length) {
    //         // TODO: place value in entries at appropiate location
    //         for (let i = 0; i <= entries.length; i++) {
    //             if (i === entries.length || entries[i][0] > value) {
    //                 entries.splice(i, 0, [value, mod.extra]);
    //                 break;
    //             }
    //         }
    //     } else {
    //         entries[index] = [value, entries[index][1]];
    //     }

    //     return mod.newModifierFromEntries(entries, mod.extra);
    // }

    // fromChangedEntryValue(index, value) {
    //     let extra = mod.extra;
    //     let entries = mod.entries.slice();

    //     if (index === mod.entries.length) {
    //         extra = value;
    //     } else {
    //         entries[index] = [entries[index][0], value];
    //     }

    //     return mod.newModifierFromEntries(entries, extra);
    // }

    // newModifierFromEntries(entries, extra = 0) {
    //     let values = [];
    //     let currentValue = 0;
    //     let currentIndex = 0;
    //     for (let level = 1; level <= 20; level++) {
    //         if (entries[currentIndex] && entries[currentIndex][0] === level) {
    //             currentValue = entries[currentIndex][1];
    //             if (!currentValue) currentValue = 0;
    //             currentIndex++;
    //         }
    //         values.push(currentValue);
    //     }
    //     const mod = new Modifier(values);
    //     mod.extra = extra;
    //     return mod;
    // }

    // getDescription(level) {
    //     let desc = " ";
    //     if (level) {
    //         desc += "(" + mod.get(level) + ") ";
    //     }

    //     desc += mod.values[0] + " to " + mod.values[19];

    //     return desc;
    // }

    static createUpdated(mod, params) {
        const key = params.key;
        const index = params.index;
        const event = params.event;
        let newValues;
        switch (key) {
            case "EntryLevel":
                return Modifier.fromChangedEntryLevel(mod, index, parseInt(event));

            case "EntryValue":
                return Modifier.fromChangedEntryValue(mod, index, parseInt(event));

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
            case "ABPWeaponBonus":
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

            case "One":
                newValues = new Array(20).fill(1);
                break;
            case "ABPWeaponDiceNum":
                newValues = new Array(20).fill(1);
                for (let i = 0; i < 20; i++) {
                    if (i + 1 >= 19) { newValues[i] = 4; continue; }
                    if (i + 1 >= 12) { newValues[i] = 3; continue; }
                    if (i + 1 >= 4) { newValues[i] = 2; continue; }
                }
                break;

            default:
                console.log("Here?");
                newValues = mod.values.slice();
                newValues[key - 1] = parseInt(event);
        }
        return Modifier.newMod(newValues);
    }

    // For acting as Weapon Specialization--------------------------
    static isWSMartial(mod) {
        for (let level = 1; level <= 20; level++) {
            if (level < 7) {
                if (mod.values[level - 1] !== 0) return false;
            }
            if (level >= 7 && level < 15) {
                if (mod.values[level - 1] !== 1) return false;
            }
            if (level >= 15) {
                if (mod.values[level - 1] !== 2) return false;
            }
        }
        return true;
    }

    static isWSCaster(mod) {
        for (let level = 1; level <= 20; level++) {
            if (level < 13) {
                if (mod.values[level - 1] !== 0) return false;
            }
            if (level >= 13) {
                if (mod.values[level - 1] !== 1) return false;
            }
        }
        return true;
    }

    // For acting as Dice Number-----------------------------------
    static isABPWeaponDiceNum(mod) {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 19) { if (mod.values[i] !== 4) return false; else continue; }
            if (i + 1 >= 12) { if (mod.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 4) { if (mod.values[i] !== 2) return false; else continue; }
            if (mod.values[i] !== 1) return false; else continue;
        }
        return true;
    }

    // For acting as Die Size--------------------------------------
    static getDieSizeDescription(mod, level) {
        let desc = " ";
        if (level) {
            desc += "(d" + mod.values[level-1] + ") ";
        }

        desc += "d" + mod.values[0] + " to d" + mod.values[19];

        return desc;
    }

    // isd4() {
    //     for (let i = 0; i < 20; i++) {
    //         if (mod.values[i] !== 4) return false;
    //     }
    //     return true;
    // }

    // isd6() {
    //     for (let i = 0; i < 20; i++) {
    //         if (mod.values[i] !== 6) return false;
    //     }
    //     return true;
    // }

    // isd8() {
    //     for (let i = 0; i < 20; i++) {
    //         if (mod.values[i] !== 8) return false;
    //     }
    //     return true;
    // }

    // isd10() {
    //     for (let i = 0; i < 20; i++) {
    //         if (mod.values[i] !== 10) return false;
    //     }
    //     return true;
    // }

    // isd12() {
    //     for (let i = 0; i < 20; i++) {
    //         if (mod.values[i] !== 12) return false;
    //     }
    //     return true;
    // }

    // For acting as item bonus
    static isNone(mod) {
        for (let i = 0; i < 20; i++) {
            if (mod.values[i] !== 0) return false;
        }
        return true;
    }

    static isABPWeaponBonus(mod) {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 16) { if (mod.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 10) { if (mod.values[i] !== 2) return false; else continue; }
            if (i + 1 >= 2) { if (mod.values[i] !== 1) return false; else continue; }
            if (mod.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    static isABPSkill1(mod) {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 17) { if (mod.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 9) { if (mod.values[i] !== 2) return false; else continue; }
            if (i + 1 >= 3) { if (mod.values[i] !== 1) return false; else continue; }
            if (mod.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    static isABPSkill2(mod) {
        for (let i = 0; i < 20; i++) {
            if (i + 1 >= 20) { if (mod.values[i] !== 3) return false; else continue; }
            if (i + 1 >= 13) { if (mod.values[i] !== 2) return false; else continue; }
            if (i + 1 >= 6) { if (mod.values[i] !== 1) return false; else continue; }
            if (mod.values[i] !== 0) return false; else continue;
        }
        return true;
    }

    // -------------------------------------------------------------------------------Static methods
    static newMod(values = null) {
        if (values === null) {
            values = new Array(20).fill(0);
            const entries = [[1, 0]];
            const extra = 0;
            return {values, entries, extra};
        } else {
            const entries = Modifier.generateEntries(values);
            const extra = 0;
            return {values, entries, extra};
        }
    }

    static get(mod, level) {
        return mod.values[level - 1]
    }

    static is(mod, value) {
        for (let i = 0; i < 20; i++) {
            if (mod.values[i] !== value) return false;
        }
        return true;
    }

    static generateEntries(values) {
        let currentValue = values[0];
        const entries = [[1, currentValue]];
        for (let level = 2; level <= 20; level++) {
            if (currentValue !== values[level - 1]) {
                currentValue = values[level - 1];
                entries.push([level, currentValue]);
            }
        }
        return entries;
    }

    static getByLevelEntries(mod) {
        return mod.entries;
    }

    static fromChangedEntryLevel(mod, index, value) {
        let entries = mod.entries.slice();

        if (index === entries.length) {
            // TODO: place value in entries at appropiate location
            for (let i = 0; i <= entries.length; i++) {
                if (i === entries.length || entries[i][0] > value) {
                    entries.splice(i, 0, [value, mod.extra]);
                    break;
                }
            }
        } else {
            entries[index] = [value, entries[index][1]];
        }

        return Modifier.newModifierFromEntries(entries, mod.extra);
    }

    static fromChangedEntryValue(mod, index, value) {
        let extra = mod.extra;
        let entries = mod.entries.slice();

        if (index === mod.entries.length) {
            extra = value;
        } else {
            entries[index] = [entries[index][0], value];
        }

        return Modifier.newModifierFromEntries(entries, extra);
    }

    static newModifierFromEntries(entries, extra = 0) {
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
        const mod = Modifier.newMod(values);
        mod.extra = extra;
        return mod;
    }

    static getDescription(mod, level) {
        let desc = " ";
        if (level) {
            desc += "(" + Modifier.get(mod,level) + ") ";
        }

        desc += mod.values[0] + " to " + mod.values[19];

        return desc;
    }

}

export default Modifier