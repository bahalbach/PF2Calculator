import AdditionalEffectArray from "./AdditionalEffectArray";

class AdditionalEffect {

    static newAdditionalEffect(entries = [], extraDiceNum = 0, extraDieSize = 6, extraStaticDam = 0) {
        const length = entries.length;
        return {length, entries, extraDiceNum, extraDieSize, extraStaticDam};
    }

    static getEntries(addEffect) {
        return addEffect.entries;
    }

    static getDescription(addEffect, level) {
        const nameSet = new Set();
        let desc = "AddDamage";
        // if (addEffect.length === 0) {
        //     desc += "None";
        // } else {
        //     for (let i = 0; i < addEffect.length; i++) {
        //         nameSet.add(addEffect.effectEntries[i][0]);
        //     }
        //     for (let name of nameSet) {
        //         desc += " " + name;
        //     }
        // }
        return desc;
    }

    static createUpdated(addEffect, params) {
        const key = params.key;
        const index = params.index;
        const event = params.event;

        switch (key) {
            case "EntryLevel":
                return AdditionalEffect.fromChangedEntryLevel(addEffect, index, event);

            case "EntryDiceNum":
                return AdditionalEffect.fromChangedEntryDiceNum(addEffect, index, parseInt(event));

            case "EntryDieSize":
                return AdditionalEffect.fromChangedEntryDieSize(addEffect, index, parseInt(event));

            case "EntryStaticDam":
                return AdditionalEffect.fromChangedEntryStaticDam(addEffect, index, parseInt(event));

            default:
                return AdditionalEffect.newAdditionalEffectArray();
        }
    }

    static fromChangedEntryLevel(addEffect, index, value) {
        let entries = addEffect.entries.slice();
        // TODO: if value === 0, remove from entries

        if (index === entries.length) {
            value = parseInt(value);
            for (let i = 0; i <= entries.length; i++) {
                if (i === entries.length || entries[i][0] > value) {
                    entries.splice(i, 0, [value, addEffect.extraDiceNum, addEffect.extraDieSize, addEffect.extraStaticDam]);
                    break;
                }
            }
        } else {
            if (value === "never") {
                entries.splice(index, 1);
            } else {
                entries[index] = [parseInt(value), entries[index][1], entries[index][2], entries[index][3]];
            }
        }

        return AdditionalEffect.newAdditionalEffect(entries, addEffect.extraDiceNum, addEffect.extraDieSize, addEffect.extraStaticDam);
    }

    static fromChangedEntryDiceNum(addEffect, index, value) {
        let entries = addEffect.entries.slice();
        let extraDiceNum = addEffect.extraDiceNum;

        if (index === addEffect.entries.length) {
            extraDiceNum = value;
        } else {
            entries[index] = [entries[index][0], value, entries[index][2], entries[index][3]];
        }

        return AdditionalEffect.newAdditionalEffect(entries, extraDiceNum, addEffect.extraDieSize, addEffect.extraStaticDam);
    }

    static fromChangedEntryDieSize(addEffect, index, value) {
        let entries = addEffect.entries.slice();
        let extraDieSize = addEffect.extraDiceNum;

        if (index === addEffect.entries.length) {
            extraDieSize = value;
        } else {
            entries[index] = [entries[index][0], entries[index][1], value, entries[index][3]];
        }

        return AdditionalEffect.newAdditionalEffect(entries, addEffect.extraDiceNum, extraDieSize, addEffect.extraStaticDam);
    }

    static fromChangedEntryStaticDam(addEffect, index, value) {
        let entries = addEffect.entries.slice();
        let extraStaticDam = addEffect.extraDiceNum;

        if (index === addEffect.entries.length) {
            extraStaticDam = value;
        } else {
            entries[index] = [entries[index][0], entries[index][1], entries[index][2], value];
        }

        return AdditionalEffect.newAdditionalEffect(entries, addEffect.extraDiceNum, addEffect.extraDieSize, extraStaticDam);
    }
}

export default AdditionalEffect