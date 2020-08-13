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

    get(level) {
        return this.values[level - 1];
    }

    getProf(level) {
        return this.profArray[level-1];
    }

    getInitial() {
        return this.initial;
    }

    getMax() {
        return this.maxProf;
    }

    getLevelAcquired(proficiencyValue) {
        return this.proficiencies[proficiencyValue];
    }

    getProficiencies() {
        return this.usedProficiencies;
    }

    isFighter() {
        return this.proficiencies.every((val, index) => val === [1, 1, 1, 5, 13][index]);
    }
    isMartial() {
        return this.proficiencies.every((val, index) => val === [1, 1, 5, 13, null][index]);
    }
    isCaster() {
        return this.proficiencies.every((val, index) => val === [1, 1, 11, null, null][index]);
    }
    isAlchemist() {
        return this.proficiencies.every((val, index) => val === [1, 1, 7, null, null][index]);
    }
    getDescription(level) {
        let profDesc = " ";
        if (level) {
            profDesc += "(" + this.get(level) + ") ";
        }

        profDesc += Proficiency.toName(this.getInitial()) + " 1";
        for (let i = this.getInitial() + 1; i <= this.getMax(); i++) {
            profDesc += ", " + Proficiency.toName(i) + " " + this.getLevelAcquired(i);
        }

        return profDesc;
    }

    createUpdated(key, event) {
        switch (key) {
            case "initial":
                return Proficiency.newProficiencyWithIntial(event.target.value, this);
            case "fighter":
                return new Proficiency(1, 1, 1, 5, 13);
            case "martial":
                return new Proficiency(1, 1, 5, 13, null);
            case "caster":
                return new Proficiency(1, 1, 11, null, null);
            case "alchemist":
                return new Proficiency(1, 1, 7, null, null);
            default:
                return Proficiency.newProficiencyWithChangedLevel(key, parseInt(event.target.value), this);
        }
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

    static newProficiencyWithIntial(initialProf, oldProficiency) {
        let newProfs = [1, null, null, null, null];
        const diff = initialProf - oldProficiency.usedProficiencies[0];
        for (let i = 0; i < newProfs.length; i++) {
            if (i <= initialProf) {
                newProfs[i] = 1;
            } else {
                let oldProf = oldProficiency.usedProficiencies[i - initialProf];
                let oldLevel = oldProficiency.getLevelAcquired(oldProf);
                newProfs[oldProf + diff] = oldLevel;
            }
        }
        return new Proficiency(newProfs[0], newProfs[1], newProfs[2], newProfs[3], newProfs[4]);
    }

    static newProficiencyWithChangedLevel(changedProf, newLevel, oldProficiency) {
        let oldProfs = oldProficiency.proficiencies.slice();
        oldProfs[changedProf] = newLevel;
        //console.log(oldProfs);
        return new Proficiency(...oldProfs);

    }
}

export default Proficiency