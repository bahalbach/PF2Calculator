function totalBonusDescription(effect, level) {
    let desc = "";
    if (level) {
        desc += "(" + getTotalBonus(effect, level) + ") ";
    }
    desc += getTotalBonus(effect, 1) + " to " + getTotalBonus(effect, 20);
    return desc;
}

function attackBonusDescription(effect, level) {
    let desc = "";
    if (level) {
        desc += "(" + getAttackBonus(effect, level) + ") ";
    }
    desc += getAttackBonus(effect, 1) + " to " + getAttackBonus(effect, 20);
    return desc;
}



function totalDamageDescription(effect, level) {
    // damageAbilityScore: new AbilityScore(),
    // weaponDiceNum: new DiceNumber(),
    // dieSize: new DieSize(),
    // weaponSpec
    if (level) {
        const dice = "" + effect.weaponDiceNum.get(level) + "d" + effect.dieSize.get(level);
        const staticDamage = (effect.damageAbilityScore.getMod(level) + (effect.weaponSpec.get(level) * effect.proficiency.getProf(level)));
        const average = effect.weaponDiceNum.get(level) * (effect.dieSize.get(level) + 1) / 2 + staticDamage;
        return "(" + average + ") " + dice + " + " + staticDamage;
    }
    return "";
}

function getAttackBonus(effect, level) {
    let total;

    if (effect.useOverride.isTrue()) {
        total = effect.override.get(level);
    }
    else {
        total = effect.attackAbilityScore.getMod(level) + effect.proficiency.get(level) + effect.itemBonus.get(level);
    }
    total += effect.MAP.get(level);

    return total;
}

function getTotalBonus(effect, level) {
    let total = getAttackBonus(effect, level);

    if (effect.useMiscModifiers.isTrue()) {

        total += (
            effect.circumstanceBonus.get(level) +
            effect.statusBonus.get(level) +
            -effect.circumstancePenalty.get(level) +
            -effect.statusPenalty.get(level) +
            -effect.itemPenalty.get(level) +
            -effect.untypedPenalty.get(level)
        );
    }

    return total;
}

function getCritSuccessPercent(bonus, DC, keen=false) {
    const dif = bonus-DC;
    let chance;
    if (dif < -20) {
        chance = 0;
    } else if (dif < -9) {
        chance = keen?10:5;
    } else if (dif < 8) {
        chance = (11 + dif) * 5;
    } else {
        chance = 95;
    }
      
    return chance;
}

function getSuccessPercent(bonus, DC, keen=false) {
    const dif = bonus-DC;
    let chance;
    if (dif < -29) {
        chance = 0;
    } else if (dif < -20) {
        chance = 5;
    } else if (dif < -9) {
        chance = (keen?19:20 + dif) *5;
    } else if (dif < -1) {
        chance = 50;
    } else if (dif < 9) {
        chance = (8 - dif) * 5;
    } else {
        chance = 5;
    }
      
    return chance;
}

function calculateExpectedDamage(effect, target) {
    const level = target.selectedLevel;
    if (!level) return;
    const attackBonus = getTotalBonus(effect, level);
    const diceNum = effect.weaponDiceNum.get(level);
    const dieSize = effect.dieSize.get(level);
    const staticDamage = (effect.damageAbilityScore.getMod(level) + (effect.weaponSpec.get(level) * effect.proficiency.getProf(level)));
    const average = diceNum * (dieSize+1)/2 + staticDamage;
    const AC = target.AC;
    const critPercent = getCritSuccessPercent(attackBonus,AC);
    const hitPercent = getSuccessPercent(attackBonus,AC);
    return (hitPercent * average + critPercent * average * 2) / 100;
}

export { totalBonusDescription, attackBonusDescription, totalDamageDescription, calculateExpectedDamage }