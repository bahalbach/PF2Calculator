const MAX_LEVEL = 20;

class AbilityScore {
    constructor(initial = 10, boosts = [false, false, false, false], apexLevel = null) {
        this.initial = initial;
        this.boosts = boosts;
        this.apexLevel = apexLevel;

        this.scoreArray = [initial];
        let currentScore = initial;
        let scoreWithApex;

        for (let i = 2; i <= MAX_LEVEL; i++) {
            if ((i === 5 && boosts[0]) || (i === 10 && boosts[1]) || (i === 15 && boosts[2]) || (i === 20 && boosts[3]))
                currentScore < 18 ? currentScore += 2 : currentScore += 1;
            (apexLevel && i >= apexLevel) ? (scoreWithApex = Math.max(18, currentScore + 2)) : scoreWithApex = currentScore;
            this.scoreArray.push(scoreWithApex);
        }
        this.maxScore = scoreWithApex;
    }

    get(level) {
        return this.scoreArray[level - 1];
    }

    getMod(level) {
        return parseInt((this.scoreArray[level - 1] - 10) / 2);
    }

    getInitial() {
        return this.initial;
    }
    getBoosts() {
        return this.boosts;
    }
    getApexLevel() {
        return this.apexLevel;
    }

    getScores() {
        return [this.initial, ...this.boosts, this.apexLevel];
    }

    is18a() {
        if (this.initial !== 18) return false;
        if (this.boosts[0] !== true) return false;
        if (this.boosts[1] !== true) return false;
        if (this.boosts[2] !== true) return false;
        if (this.boosts[3] !== true) return false;
        if (this.apexLevel !== 17) return false;
        return true;
    }

    is16a() {
        if (this.initial !== 16) return false;
        if (this.boosts[0] !== true) return false;
        if (this.boosts[1] !== true) return false;
        if (this.boosts[2] !== true) return false;
        if (this.apexLevel !== 17) return false;
        return true;
    }

    is16pp() {
        if (this.initial !== 16) return false;
        if (this.boosts[0] !== true) return false;
        if (this.boosts[1] !== true) return false;
        if (this.boosts[2] !== true) return false;
        if (this.apexLevel !== null) return false;
        return true;
    }

    is14p() {
        if (this.initial !== 14) return false;
        if (this.boosts[0] !== true) return false;
        if (this.boosts[1] !== true) return false;
        if (this.boosts[2] !== false) return false;
        if (this.boosts[3] !== false) return false;
        if (this.apexLevel !== null) return false;
        return true;
    }

    is10() {
        if (this.initial !== 10) return false;
        if (this.boosts[0] !== false) return false;
        if (this.boosts[1] !== false) return false;
        if (this.boosts[2] !== false) return false;
        if (this.boosts[3] !== false) return false;
        if (this.apexLevel !== null) return false;
        return true;
    }

    getDescription(level) {
        let scoreDesc = " ";
        if (level) {
            scoreDesc += "(" + this.getMod(level) + ") ";
        }

        scoreDesc += this.initial + " to " + this.maxScore;

        return scoreDesc;
    }

    createUpdated(key, event) {
        let newInitial = this.initial;
        let newBoosts = this.boosts.slice();
        let newApexLevel = this.apexLevel;
        switch (key) {
            case "18a":
                return new AbilityScore(18, [true, true, true, true], 17);
            case "16a":
                return new AbilityScore(16, [true, true, true, false], 17);
            case "16++":
                return new AbilityScore(16, [true, true, true, false], null);
            case "14+":
                return new AbilityScore(14, [true, true, false, false], null);
            case "10":
                return new AbilityScore(10, [false, false, false, false], null);

            case "initial":
                newInitial = parseInt(event.target.value);
                break;
            case 0:
            case 1:
            case 2:
            case 3:
                newBoosts[key] = event.target.checked;
                break;
            case "apex":
                let value = event.target.value;
                if (value === "never") value = null;
                newApexLevel = value;
                break;
            default:
                console.error("Unhandled ability score");
        }
        return new AbilityScore(newInitial, newBoosts, newApexLevel);
    }
}
/*

        this.proficiencies = [untrained,trained,expert,master,legendary];
        let currentProf = 0;
        if (trained && trained===1) {
            currentProf = 1;
            if (expert && expert===1) {
                currentProf = 2;
                if (master && master===1) {
                    currentProf = 3;
                    if (legendary && legendary===1) {
                        currentProf = 4;
        }}}}
        this.initial = currentProf;
        this.profArray = [];

        for(let i=0; i<MAX_LEVEL; i++) {
            while (this.proficiencies[currentProf+1] && this.proficiencies[currentProf+1] === (i+1)) {
                currentProf++;
            }
            if (currentProf===0) {
                this.profArray.push(0);
            } else {
                this.profArray.push((i+1) + (currentProf*2));
            }
        }
        this.maxProf = currentProf;
        this.usedProficiencies = []
        for(let i=this.initial; i<=this.maxProf; i++) {
            this.usedProficiencies.push(i);
        }
    }

    get(level) {
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
        let newProfs = [1,null,null,null,null];
        const diff = initialProf - oldProficiency.usedProficiencies[0];
        for(let i=0; i<newProfs.length; i++) {
            if (i <= initialProf) {
                newProfs[i] = 1;
            } else {
                let oldProf = oldProficiency.usedProficiencies[i-initialProf];
                let oldLevel = oldProficiency.getLevelAcquired(oldProf);
                newProfs[oldProf+diff] = oldLevel;
            }
        }
        return new Proficiency(newProfs[0], newProfs[1], newProfs[2], newProfs[3], newProfs[4]);
    }

    static newProficiencyWithChangedLevel(changedProf, newLevel, oldProficiency) {
        let oldProfs = oldProficiency.proficiencies.slice();
        oldProfs[changedProf] = newLevel;
        console.log(oldProfs);
        return new Proficiency(...oldProfs);

    }
}
*/

export default AbilityScore