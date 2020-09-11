import Modifier from "./Effect/Model/Modifier";
import Proficiency from "./Effect/Model/Proficiency";
import AbilityScore from "./Effect/Model/AbilityScore";
import MAP from "./Effect/Model/MAP";

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
        const dice = "" + Modifier.get(effect.weaponDiceNum, level) + "d" + Modifier.get(effect.dieSize, level);
        const staticDamage = (AbilityScore.getMod(effect.damageAbilityScore, level) + (Modifier.get(effect.weaponSpec, level) * Proficiency.getProf(effect.proficiency,level)));
        const average = Modifier.get(effect.weaponDiceNum, level) * (Modifier.get(effect.dieSize, level) + 1) / 2 + staticDamage;
        return "(" + average + ") " + dice + " + " + staticDamage;
    }
    return "";
}

function getAttackBonus(effect, level) {
    let total;

    if (effect.useOverride) {
        total = Modifier.get(effect.override, level);
    }
    else {
        total = AbilityScore.getMod(effect.attackAbilityScore, level) + Proficiency.get(effect.proficiency, level) + Modifier.get(effect.itemBonus, level);
    }
    total += MAP.get(effect.MAP, level);

    return total;
}

function getTotalBonus(effect, level) {
    let total = getAttackBonus(effect, level);

    if (effect.useMiscModifiers) {

        total += (
            Modifier.get(effect.circumstanceBonus, level) +
            Modifier.get(effect.statusBonus, level) +
            -Modifier.get(effect.circumstancePenalty, level) +
            -Modifier.get(effect.statusPenalty, level) +
            -Modifier.get(effect.itemPenalty, level) +
            -Modifier.get(effect.untypedPenalty, level)
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
    const level = target.level;
    if (!level) return;
    const attackBonus = getTotalBonus(effect, level);
    const diceNum = Modifier.get(effect.weaponDiceNum, level);
    const dieSize = Modifier.get(effect.dieSize, level);
    const staticDamage = (AbilityScore.getMod(effect.damageAbilityScore, level) + (Modifier.get(effect.weaponSpec, level) * Proficiency.getProf(effect.proficiency,level)));
    const average = diceNum * (dieSize+1)/2 + staticDamage;
    const AC = target.AC;
    const critPercent = getCritSuccessPercent(attackBonus,AC);
    const hitPercent = getSuccessPercent(attackBonus,AC);
    return (hitPercent * average + critPercent * average * 2) / 100;
}

export { totalBonusDescription, attackBonusDescription, totalDamageDescription, calculateExpectedDamage }