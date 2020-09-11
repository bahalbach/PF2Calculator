const MAX_LEVEL = 20;

class AbilityScore {
    // constructor(initial = 10, boosts = [false, false, false, false], apexLevel = null) {
    //     this.initial = initial;
    //     this.boosts = boosts;
    //     this.apexLevel = apexLevel;

    //     this.scoreArray = [];
    //     let currentScore = initial;
    //     let scoreWithApex;

    //     for (let i = 1; i <= MAX_LEVEL; i++) {
    //         if ((i === 5 && boosts[0]) || (i === 10 && boosts[1]) || (i === 15 && boosts[2]) || (i === 20 && boosts[3]))
    //             currentScore < 18 ? currentScore += 2 : currentScore += 1;
    //         (apexLevel && i >= apexLevel) ? (scoreWithApex = Math.max(18, currentScore + 2)) : scoreWithApex = currentScore;
    //         this.scoreArray.push(scoreWithApex);
    //     }
    //     this.maxScore = scoreWithApex;
    // }

    // get(level) {
    //     return this.scoreArray[level - 1];
    // }

    static get(score, level) {
        return score.scoreArray[level - 1];
    }

    // getMod(level) {
    //     return parseInt((this.scoreArray[level - 1] - 10) / 2);
    // }

    static getMod(score, level) {
        return parseInt((score.scoreArray[level - 1] - 10) / 2);
    }

    // getInitial() {
    //     return this.initial;
    // }
    // getBoosts() {
    //     return this.boosts;
    // }
    // getApexLevel() {
    //     return this.apexLevel;
    // }

    static getInitial(score) {
        return score.initial;
    }
    static getBoosts(score) {
        return score.boosts;
    }
    static getApexLevel(score) {
        return score.apexLevel;
    }

    // getScores() {
    //     return [this.initial, ...this.boosts, this.apexLevel];
    // }

    // is18a() {
    //     if (this.initial !== 18) return false;
    //     if (this.boosts[0] !== true) return false;
    //     if (this.boosts[1] !== true) return false;
    //     if (this.boosts[2] !== true) return false;
    //     if (this.boosts[3] !== true) return false;
    //     if (this.apexLevel !== 17) return false;
    //     return true;
    // }

    // is16a() {
    //     if (this.initial !== 16) return false;
    //     if (this.boosts[0] !== true) return false;
    //     if (this.boosts[1] !== true) return false;
    //     if (this.boosts[2] !== true) return false;
    //     if (this.apexLevel !== 17) return false;
    //     return true;
    // }

    // is16pp() {
    //     if (this.initial !== 16) return false;
    //     if (this.boosts[0] !== true) return false;
    //     if (this.boosts[1] !== true) return false;
    //     if (this.boosts[2] !== true) return false;
    //     if (this.apexLevel !== null) return false;
    //     return true;
    // }

    // is14p() {
    //     if (this.initial !== 14) return false;
    //     if (this.boosts[0] !== true) return false;
    //     if (this.boosts[1] !== true) return false;
    //     if (this.boosts[2] !== false) return false;
    //     if (this.boosts[3] !== false) return false;
    //     if (this.apexLevel !== null) return false;
    //     return true;
    // }

    // is10() {
    //     if (this.initial !== 10) return false;
    //     if (this.boosts[0] !== false) return false;
    //     if (this.boosts[1] !== false) return false;
    //     if (this.boosts[2] !== false) return false;
    //     if (this.boosts[3] !== false) return false;
    //     if (this.apexLevel !== null) return false;
    //     return true;
    // }

    static is18a(score) {
        if (score.initial !== 18) return false;
        if (score.boosts[0] !== true) return false;
        if (score.boosts[1] !== true) return false;
        if (score.boosts[2] !== true) return false;
        if (score.boosts[3] !== true) return false;
        if (score.apexLevel !== 17) return false;
        return true;
    }

    static is16a(score) {
        if (score.initial !== 16) return false;
        if (score.boosts[0] !== true) return false;
        if (score.boosts[1] !== true) return false;
        if (score.boosts[2] !== true) return false;
        if (score.apexLevel !== 17) return false;
        return true;
    }

    static is16pp(score) {
        if (score.initial !== 16) return false;
        if (score.boosts[0] !== true) return false;
        if (score.boosts[1] !== true) return false;
        if (score.boosts[2] !== true) return false;
        if (score.apexLevel !== null) return false;
        return true;
    }

    static is14p(score) {
        if (score.initial !== 14) return false;
        if (score.boosts[0] !== true) return false;
        if (score.boosts[1] !== true) return false;
        if (score.boosts[2] !== false) return false;
        if (score.boosts[3] !== false) return false;
        if (score.apexLevel !== null) return false;
        return true;
    }

    static is10(score) {
        if (score.initial !== 10) return false;
        if (score.boosts[0] !== false) return false;
        if (score.boosts[1] !== false) return false;
        if (score.boosts[2] !== false) return false;
        if (score.boosts[3] !== false) return false;
        if (score.apexLevel !== null) return false;
        return true;
    }

    // getDescription(level) {
    //     let scoreDesc = " ";
    //     if (level) {
    //         scoreDesc += "(" + this.getMod(level) + ") ";
    //     }

    //     scoreDesc += this.initial + " to " + this.maxScore;

    //     return scoreDesc;
    // }
    static getDescription(score, level) {
        let scoreDesc = " ";
        if (level) {
            scoreDesc += "(" + AbilityScore.getMod(score, level) + ") ";
        }

        scoreDesc += score.initial + " to " + score.maxScore;

        return scoreDesc;
    }

    static createUpdated(score, params) {
        const key = params.key;
        const eventValue = params.eventValue;
        const eventChecked = params.eventChecked;
    
        let newInitial = score.initial;
        let newBoosts = score.boosts.slice();
        let newApexLevel = score.apexLevel;
        switch (key) {
            case "18a":
                return AbilityScore.newScore(18, [true, true, true, true], 17);
            case "16a":
                return AbilityScore.newScore(16, [true, true, true, false], 17);
            case "16++":
                return AbilityScore.newScore(16, [true, true, true, false], null);
            case "14+":
                return AbilityScore.newScore(14, [true, true, false, false], null);
            case "10":
                return AbilityScore.newScore(10, [false, false, false, false], null);

            case "initial":
                newInitial = parseInt(eventValue);
                break;
            case 0:
            case 1:
            case 2:
            case 3:
                newBoosts[key] = eventChecked;
                break;
            case "apex":
                let value = eventValue;
                if (value === "never") value = null;
                newApexLevel = value;
                break;
            default:
                console.error("Unhandled ability score");
        }
        return AbilityScore.newScore(newInitial, newBoosts, newApexLevel);
    }

    static newScore(initial, boosts, apexLevel) {
        const scoreArray = [];
        let currentScore = initial;
        let scoreWithApex;

        for (let i = 1; i <= MAX_LEVEL; i++) {
            if ((i === 5 && boosts[0]) || (i === 10 && boosts[1]) || (i === 15 && boosts[2]) || (i === 20 && boosts[3]))
                currentScore < 18 ? currentScore += 2 : currentScore += 1;
            (apexLevel && i >= apexLevel) ? (scoreWithApex = Math.max(18, currentScore + 2)) : scoreWithApex = currentScore;
            scoreArray.push(scoreWithApex);
        }
        const maxScore = scoreWithApex;
        return {initial, boosts, apexLevel, scoreArray, maxScore};
    }
}

export default AbilityScore