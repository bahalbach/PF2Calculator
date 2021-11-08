import { convolve, consolidateDists } from "./Distribution";
import { calculateExpectedDamage } from "./Calculation";
import {
  Condition,
  conditions,
  effectStateTypes,
  effectTypes,
  effectValueTypes,
  TargetState,
  whenConditions,
} from "../Model/types";
import {
  ActivityPath,
  Damage,
  Effect,
  Routine,
} from "../Routines/RoutineSlice/RoutineTypes";
import { Dictionary } from "@reduxjs/toolkit";
import { Target } from "../Target/targetSlice";
import { Weakness } from "../Target/weaknessSlice";

/**
 * Checks given degreeOfSuccess is in the condition
 * like Success is in Success or better
 * @param {*} condition
 * @param {*} degreeOfSuccess
 * @returns
 */
function validateCondition(condition: Condition, degreeOfSuccess: number) {
  let indicies: number[] = [];
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
  activityPaths: Dictionary<ActivityPath>;
  target: Target;
  damages: Dictionary<Damage>;
  effects: Dictionary<Effect>;
  weaknesses: Dictionary<Weakness>;
  selectedRoutine?: number;
  constructor(
    activityPaths: Dictionary<ActivityPath>,
    targets: Dictionary<Target>,
    damages: Dictionary<Damage>,
    effects: Dictionary<Effect>,
    weaknesses: Dictionary<Weakness>,
    selectedRoutine?: number
  ) {
    this.activityPaths = activityPaths;
    this.target = targets[0]!;
    this.damages = damages;
    this.effects = effects;
    this.weaknesses = weaknesses;
    this.selectedRoutine = selectedRoutine;
  }

  canEvaluate(level: number, routine: Routine) {
    const levelDiff = this.target.levelDiff;
    // console.log(`level ${level}, levelDiff ${levelDiff}`);
    if (level < routine.startLevel || level > routine.endLevel) return false;
    if (level + levelDiff < -1 || level + levelDiff > 24) return false;
    return true;
  }

  evalRoutine(
    routine: Routine,
    level: number,
    ACBonus: number,
    resBonus: number
  ) {
    const initialTargetState = {
      // flatfooted: this.target.flatfooted,
      // prone: false,
      // grappled: false,
      // frightened: 0,
      // clumsy: 0,
    } as TargetState;
    for (let effectState of Object.values(effectStateTypes)) {
      initialTargetState[effectState] = false;
    }
    for (let effectValue of Object.values(effectValueTypes)) {
      initialTargetState[effectValue] = 0;
    }
    initialTargetState.Flatfooted = this.target.flatfooted;

    const dataArray = [];
    const cumulative = [];
    const PdataArray = [];
    const Pcumulative = [];

    let expD = 0;
    let expP = 0;
    let routineDDist = [1];
    let routinePDDist = [1];
    for (let i = 0; i < routine.apIds.length; i++) {
      let activityPath = this.activityPaths[routine.apIds[i]]!;
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

  evalPath(
    activityPath: ActivityPath,
    targetState: TargetState,
    level: number,
    defenseBonus: number,
    resistanceBonus: number
  ) {
    // evaluate this and all following APs
    let currentTarget = this.target;
    let currentDamages = activityPath.damages.map(
      (damageId) => this.damages[damageId]!
    );
    //currentDamages.push(activityPath);
    let currentEffects = activityPath.effects.map(
      (effectId) => this.effects[effectId]!
    );
    let currentWeaknesses = currentTarget.weaknesses.map(
      (weaknessId) => this.weaknesses[weaknessId]!
    );

    // calculate the expected damage for this activity
    let { damageTrees, chances } = calculateExpectedDamage(
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
      // go though each valid effect and update targetStates
      currentEffects.forEach((effect) => {
        let {
          effectCondition,
          effectType,
          effectValue,
          startLevel,
          endLevel,
          damageWhen,
        } = effect;
        if (level < startLevel || level > endLevel) return;
        let shouldAddThisEffect = false;
        for (let state of damageWhen) {
          if (state === whenConditions.Always) {
            shouldAddThisEffect = true;
            break;
          }
          let val = targetStates[i][state];
          if (val && val > 0) {
            shouldAddThisEffect = true;
            break;
          }
        }
        if (!shouldAddThisEffect) return;

        if (validateCondition(effectCondition, i)) {
          switch (effectType) {
            case effectTypes.RESTRAINED:
              if (targetStates[i].Restrained !== true)
                targetStates[i] = {
                  ...targetStates[i],
                  Flatfooted: true,
                  Grappled: true,
                  Restrained: true,
                };
              break;

            case effectTypes.GRAPPLED:
              if (targetStates[i].Grappled !== true)
                targetStates[i] = {
                  ...targetStates[i],
                  Flatfooted: true,
                  Grappled: true,
                };
              break;

            case effectTypes.PRONE:
              if (targetStates[i].Prone !== true)
                targetStates[i] = {
                  ...targetStates[i],
                  Flatfooted: true,
                  Prone: true,
                };
              break;

            case effectTypes.FLATFOOT:
              if (targetStates[i].Flatfooted !== true)
                targetStates[i] = { ...targetStates[i], Flatfooted: true };
              break;

            case effectTypes.FRIGHTENED:
              if (effectValue && targetStates[i].Frightened < effectValue)
                targetStates[i] = {
                  ...targetStates[i],
                  Frightened: effectValue,
                };
              break;

            case effectTypes.CLUMSY:
              if (effectValue && targetStates[i].Clumsy < effectValue)
                targetStates[i] = {
                  ...targetStates[i],
                  Clumsy: effectValue,
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
      let ap = this.activityPaths[apId]!;

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
      { distribution: damageTrees[0].normal, chance: chances[0] },
      { distribution: damageTrees[1].normal, chance: chances[1] },
      { distribution: damageTrees[2].normal, chance: chances[2] },
      { distribution: damageTrees[3].normal, chance: chances[3] }
    );
    let PdamageDist = consolidateDists(
      { distribution: damageTrees[0].persistent, chance: chances[0] },
      { distribution: damageTrees[1].persistent, chance: chances[1] },
      { distribution: damageTrees[2].persistent, chance: chances[2] },
      { distribution: damageTrees[3].persistent, chance: chances[3] }
    );
    // console.log(damageDist);

    return [damageDist, PdamageDist];
  }
}

export { ActivityPathEvaluator };
