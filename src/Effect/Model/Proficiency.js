const MAX_LEVEL = 20;

class Proficiency {
    constructor(untrained = 1, trained = 1, expert = null, master = null, legendary = null) {
        this.proficiencies = [untrained, trained, expert, master, legendary];
        let currentProf = 0;
        if (trained && trained === 1) {
            currentProf = 1;
            if (expert && expert === 1) {
                currentProf = 2;
                if (master && master === 1) {
                    currentProf = 3;
                    if (legendary && legendary === 1) {
                        currentProf = 4;
                    }
                }
            }
        }
        this.initial = currentProf;
        this.values = [];
        this.profArray = [];

        for (let i = 0; i < MAX_LEVEL; i++) {
            while (this.proficiencies[currentProf + 1] && this.proficiencies[currentProf + 1] === (i + 1)) {
                currentProf++;
            }
            if (currentProf === 0) {
                this.values.push(0);
                this.profArray.push(0);
            } else {
                this.values.push((i + 1) + (currentProf * 2));
                this.profArray.push(currentProf);
            }
        }
        this.maxProf = currentProf;
        this.usedProficiencies = []
        for (let i = this.initial; i <= this.maxProf; i++) {
            this.usedProficiencies.push(i);
        }
    }

    static get(prof, level) {
        return prof.values[level - 1];
    }

    static getProf(prof, level) {
        return prof.profArray[level-1];
    }

    static getInitial(prof) {
        return prof.initial;
    }

    static getMax(prof) {
        return prof.maxProf;
    }

    static getLevelAcquired(prof, proficiencyValue) {
        return prof.proficiencies[proficiencyValue];
    }

    static getProficiencies(prof) {
        return prof.usedProficiencies;
    }

    static isFighter(prof) {
        return prof.proficiencies.every((val, index) => val === [1, 1, 1, 5, 13][index]);
    }
    static isMartial(prof) {
        return prof.proficiencies.every((val, index) => val === [1, 1, 5, 13, null][index]);
    }
    static isCaster(prof) {
        return prof.proficiencies.every((val, index) => val === [1, 1, 11, null, null][index]);
    }
    static isAlchemist(prof) {
        return prof.proficiencies.every((val, index) => val === [1, 1, 7, null, null][index]);
    }
    static getDescription(prof, level) {
        let profDesc = " ";
        if (level) {
            profDesc += "(" + Proficiency.get(prof, level) + ") ";
        }

        profDesc += Proficiency.toName(prof.initial) + " 1";
        for (let i = prof.initial + 1; i <= prof.maxProf; i++) {
            profDesc += ", " + Proficiency.toName(i) + " " + Proficiency.getLevelAcquired(prof, i);
        }

        return profDesc;
    }

    static toName(profValue) {
        return ([
            "Untrained",
            "Trained",
            "Expert",
            "Master",
            "Legendary"
        ][profValue]);
    }

    static newProficiencyWithIntial(oldProficiency, initialProf) {
        let newProfs = [1, null, null, null, null];
        const diff = initialProf - oldProficiency.usedProficiencies[0];
        for (let i = 0; i < newProfs.length; i++) {
            if (i <= initialProf) {
                newProfs[i] = 1;
            } else {
                let oldProf = oldProficiency.usedProficiencies[i - initialProf];
                let oldLevel = Proficiency.getLevelAcquired(oldProficiency, oldProf);
                newProfs[oldProf + diff] = oldLevel;
            }
        }
        return Proficiency.newProficiency(newProfs[0], newProfs[1], newProfs[2], newProfs[3], newProfs[4]);
    }

    static newProficiencyWithChangedLevel(oldProficiency, changedProf, newLevel) {
        let oldProfs = oldProficiency.proficiencies.slice();
        oldProfs[changedProf] = newLevel;
        //console.log(oldProfs);
        return Proficiency.newProficiency(...oldProfs);

    }

    // static ________________________________________--------------------------------------
    static newProficiency(untrained = 1, trained = 1, expert = null, master = null, legendary = null) {
        let proficiencies = [untrained, trained, expert, master, legendary];
        let currentProf = 0;
        if (trained && trained === 1) {
            currentProf = 1;
            if (expert && expert === 1) {
                currentProf = 2;
                if (master && master === 1) {
                    currentProf = 3;
                    if (legendary && legendary === 1) {
                        currentProf = 4;
                    }
                }
            }
        }
        let initial = currentProf;
        let values = [];
        let profArray = [];

        for (let i = 0; i < MAX_LEVEL; i++) {
            while (proficiencies[currentProf + 1] && proficiencies[currentProf + 1] === (i + 1)) {
                currentProf++;
            }
            if (currentProf === 0) {
                values.push(0);
                profArray.push(0);
            } else {
                values.push((i + 1) + (currentProf * 2));
                profArray.push(currentProf);
            }
        }
        let maxProf = currentProf;
        let usedProficiencies = []
        for (let i = initial; i <= maxProf; i++) {
            usedProficiencies.push(i);
        }
        return {proficiencies, initial, maxProf, values, profArray, usedProficiencies};
    }

    static createUpdated(proficiencies, params) {
        const key = params.key;
        const event = params.event;
        switch (key) {
            case "initial":
                return Proficiency.newProficiencyWithIntial(proficiencies, event);
            case "fighter":
                return Proficiency.newProficiency(1, 1, 1, 5, 13);
            case "martial":
                return Proficiency.newProficiency(1, 1, 5, 13, null);
            case "caster":
                return Proficiency.newProficiency(1, 1, 11, null, null);
            case "alchemist":
                return Proficiency.newProficiency(1, 1, 7, null, null);
            default:
                return Proficiency.newProficiencyWithChangedLevel(proficiencies, key, parseInt(event));
        }
    }

}

export default Proficiency