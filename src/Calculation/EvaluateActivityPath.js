import { convolve, consolidateDists } from "./Distribution";
import { calculateExpectedDamage } from "./Calculation";
import { conditions, effectTypes } from "../types";

function validateCondition(condition, degreeOfSuccess) {
  let indicies = [];
  // console.log(`cond is: ${ap.condition}`);
  switch (condition) {
    case conditions.ALWAYS:
      indicies = [0, 1, 2, 3];
      break;

    case conditions.AT_LEAST_FAIL:
      indicies = [0, 1, 2];
      break;

    case conditions.AT_LEAST_SUCC:
      indicies = [0, 1];
      break;

    case conditions.CRIF:
      indicies = [3];
      break;

    case conditions.CRIT:
      indicies = [0];
      break;

    case conditions.FAIL:
      indicies = [2];
      break;

    case conditions.FAIL_WORSE:
      indicies = [2, 3];
      break;

    case conditions.SUCC:
      indicies = [1];
      break;

    case conditions.SUCC_WORSE:
      indicies = [1, 2, 3];
      break;

    default:
  }
  return indicies.includes(degreeOfSuccess);
}

class ActivityPathEvaluator {
  constructor(activityPaths, targets, damages, effects, weaknesses) {
    this.activityPaths = activityPaths;
    this.targets = targets;
    this.damages = damages;
    this.effects = effects;
    this.weaknesses = weaknesses;
  }

  canEvaluate(level) {
    const levelDiff = this.targets[0].levelDiff;
    // console.log(`level ${level}, levelDiff ${levelDiff}`);
    if (level + levelDiff < -1 || level + levelDiff > 24) return false;
    return true;
  }

  evalRoutine(routine, level, ACBonus, resBonus) {
    const initialTargetState = {
      flatfooted: false,
      frightened: 0,
    };
    const dataArray = [];
    const cumulative = [];
    const PdataArray = [];
    const Pcumulative = [];

    let expD = 0;
    let expP = 0;
    let routineDDist = [1];
    let routinePDDist = [1];
    for (let i = 0; i < routine.apIds.length; i++) {
      let activityPath = this.activityPaths[routine.apIds[i]];
      let [damageDist, PdamageDist] = this.evalPath(
        activityPath,
        initialTargetState,
        level,
        ACBonus,
        resBonus
      );
      routineDDist = convolve(routineDDist, damageDist);
      routinePDDist = convolve(routinePDDist, PdamageDist);
    }
    let currentSum = 1;
    for (let i = 0; i < routineDDist.length; i++) {
      dataArray.push(i);
      cumulative.push(currentSum);
      currentSum -= routineDDist[i];

      expD += routineDDist[i] * i;
    }
    currentSum = 1;
    for (let i = 0; i < routinePDDist.length; i++) {
      PdataArray.push(i);
      Pcumulative.push(currentSum);
      currentSum -= routinePDDist[i];

      expP += routinePDDist[i] * i;
    }
    return {
      expD,
      expP,
      dataArray,
      routineDDist,
      cumulative,
      PdataArray,
      routinePDDist,
      Pcumulative,
    };
  }

  evalPath(activityPath, targetState, level, defenseBonus, resistanceBonus) {
    // evaluate this and all following APs
    let currentTarget = this.targets[0];
    let currentDamages = activityPath.damages.map(
      (damageId) => this.damages[damageId]
    );
    //currentDamages.push(activityPath);
    let currentEffects = activityPath.effects.map(
      (effectId) => this.effects[effectId]
    );
    let currentWeaknesses = currentTarget.weaknesses.map(
      (weaknessId) => this.weaknesses[weaknessId]
    );

    // calculate the expected damage for this activity
    let [damageTrees, chances] = calculateExpectedDamage(
      level,
      activityPath,
      currentDamages,
      currentTarget,
      targetState,
      currentWeaknesses,
      defenseBonus,
      resistanceBonus
    );

    const targetStates = [targetState, targetState, targetState, targetState];
    // go through each degree of success
    for (let i = 0; i < 4; i++) {
      // go though each effect and update targetStates
      currentEffects.forEach((effect) => {
        let { effectCondition, effectType } = effect;
        if (validateCondition(effectCondition, i)) {
          switch (effectType) {
            case effectTypes.FLATFOOT:
              if (targetStates[i].flatfooted !== true)
                targetStates[i] = { ...targetStates[i], flatfooted: true };
              break;

            case effectTypes.FRIGHTENED1:
              if (targetStates[i].frightened < 1)
                targetStates[i] = {
                  ...targetStates[i],
                  frightened: 1,
                };
              break;
            case effectTypes.FRIGHTENED2:
              if (targetStates[i].frightened < 2)
                targetStates[i] = {
                  ...targetStates[i],
                  frightened: 2,
                };
              break;
            case effectTypes.FRIGHTENED3:
              if (targetStates[i].frightened < 3)
                targetStates[i] = {
                  ...targetStates[i],
                  frightened: 3,
                };
              break;
            case effectTypes.FRIGHTENED4:
              if (targetStates[i].frightened < 4)
                targetStates[i] = {
                  ...targetStates[i],
                  frightened: 4,
                };
              break;

            default:
              console.log(`Effect type ${effectType} not implemented`);
          }
        }
      });
    }

    // go through each activity path, depending on its condition add its damage distributions to this activities appropriately
    activityPath.apIds.forEach((apId) => {
      let ap = this.activityPaths[apId];

      const evaluations = new Map();
      // go through each degree of success
      for (let i = 0; i < 4; i++) {
        // evaluate if necessary and add distribution to damageTrees
        if (validateCondition(ap.condition, i)) {
          if (evaluations.has(targetStates[i])) {
            // already evaluated
          } else {
            let [pathDist, pathPDist] = this.evalPath(
              ap,
              targetStates[i],
              level,
              defenseBonus,
              resistanceBonus
            );
            evaluations.set(targetStates[i], { pathDist, pathPDist });
          }

          damageTrees[i].normal.damageDist = convolve(
            damageTrees[i].normal.damageDist,
            evaluations.get(targetStates[i]).pathDist
          );
          damageTrees[i].persistent.damageDist = convolve(
            damageTrees[i].persistent.damageDist,
            evaluations.get(targetStates[i]).pathPDist
          );
        }
      }
    });

    let damageDist = consolidateDists(
      [damageTrees[0].normal, chances[0]],
      [damageTrees[1].normal, chances[1]],
      [damageTrees[2].normal, chances[2]],
      [damageTrees[3].normal, chances[3]]
    );
    let PdamageDist = consolidateDists(
      [damageTrees[0].persistent, chances[0]],
      [damageTrees[1].persistent, chances[1]],
      [damageTrees[2].persistent, chances[2]],
      [damageTrees[3].persistent, chances[3]]
    );
    // console.log(damageDist);

    return [damageDist, PdamageDist];
  }
}

const evaluateRoutine = (evaluator, routine) => {};
export { ActivityPathEvaluator, evaluateRoutine };
