import { convolve, consolidateDists, applyMax } from "./Distribution";
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
import { Target } from "../Display/targetSlice";
import { Weakness } from "../Display/weaknessSlice";
import { defaultHP } from "../Model/defaults";

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
  activityPaths: Record<number, ActivityPath>;
  target: Target;
  damages: Record<number, Damage>;
  effects: Record<number, Effect>;
  weaknesses: Record<number, Weakness>;
  selectedRoutine?: number;
  constructor(
    activityPaths: Record<number, ActivityPath>,
    targets: Record<number, Target>,
    damages: Record<number, Damage>,
    effects: Record<number, Effect>,
    weaknesses: Record<number, Weakness>,
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
  canEvaluateSingleLevel(routine: Routine) {
    const level = this.target.routineLevel;
    // console.log(`level ${level}, levelDiff ${levelDiff}`);
    if (level < routine.startLevel || level > routine.endLevel) return false;
    return true;
  }

  evalRoutine(
    routine: Routine,
    ACBonus: number,
    resBonus: number,
    level?: number
  ) {
    let maxDamage: number;
    if (level === undefined) {
      maxDamage = this.target.currentHP;
    } else {
      maxDamage = Math.round(
        defaultHP[this.target.HPTrend][level] * (this.target.percentHP / 100)
      );
    }
    const initialTargetState = {
      persistentDamages: {},
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

    let expD = 0;
    // let expP = 0;
    let routineDDist = [1];
    // let routinePDDist = [1];
    for (let i = 0; i < routine.apIds.length; i++) {
      let activityPath = this.activityPaths[routine.apIds[i]]!;
      let damageDist = this.evalPath(
        activityPath,
        initialTargetState,
        ACBonus,
        resBonus,
        level
      );
      routineDDist = convolve(routineDDist, damageDist);
    }
    // make sure damage not more than HP
    // static damage is 0, so can ignore it
    const { damageDist } = applyMax(0, routineDDist, maxDamage);
    routineDDist = damageDist;

    let currentSum = 1;
    for (let i = 0; i < routineDDist.length; i++) {
      dataArray.push(i);
      cumulative.push(currentSum);
      currentSum -= routineDDist[i];

      expD += routineDDist[i] * i;
    }

    return {
      expD,
      dataArray,
      routineDDist,
      cumulative,
    };
  }

  evalPath(
    activityPath: ActivityPath,
    targetState: TargetState,
    defenseBonus: number,
    resistanceBonus: number,
    level?: number
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
      activityPath,
      currentDamages,
      currentTarget,
      targetState,
      currentWeaknesses,
      defenseBonus,
      resistanceBonus,
      activityPath.apIds.length === 0,
      level
    );
    // console.log("damage trees: ", damageTrees);

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
        if (level !== undefined) {
          if (level < startLevel || level > endLevel) return;
        } else {
          if (
            this.target.routineLevel < startLevel ||
            this.target.routineLevel > endLevel
          )
            return;
        }
        let shouldAddThisEffect = false;
        for (let state of damageWhen) {
          if (state === whenConditions.Always) {
            shouldAddThisEffect = true;
            break;
          }
          const val = targetStates[i][state];
          const isTrue = val === true;
          const isGreaterThanZero = typeof val === "number" && val > 0;
          if (isTrue || isGreaterThanZero) {
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

            case effectTypes.BONUSC1:
              if (
                effectValue &&
                targetStates[i]["Cicumstance Bonus to next attack"] <
                  effectValue
              )
                targetStates[i] = {
                  ...targetStates[i],
                  "Cicumstance Bonus to next attack": effectValue,
                };

              break;

            case effectTypes.BONUSSA:
              if (
                effectValue &&
                targetStates[i]["Status Bonus to all attacks"] < effectValue
              ) {
                targetStates[i] = {
                  ...targetStates[i],
                  "Status Bonus to all attacks": effectValue,
                };
              }
              break;

            default:
              console.log(`Effect type ${effectType} not implemented`);
          }
        }
      });
      // add persistent damage to target state if necessary
      if (
        damageTrees[i].persistent &&
        JSON.stringify(damageTrees[i].persistent) !==
          JSON.stringify(targetStates[i].persistentDamages)
      ) {
        targetStates[i] = {
          ...targetStates[i],
          persistentDamages: damageTrees[i].persistent,
        };
      }
    }

    // go through each activity path, depending on its condition add its damage distributions to this activities appropriately
    activityPath.apIds.forEach((apId) => {
      let ap = this.activityPaths[apId]!;

      const evaluations = new Map();
      // go through each degree of success
      for (let i = 0; i < 4; i++) {
        // evaluate if necessary and add distribution to damageTrees, or take max for persistent damage
        if (validateCondition(ap.condition, i)) {
          if (evaluations.has(targetStates[i])) {
            // already evaluated
            // console.log("skip target state: ", targetStates[i]);
          } else {
            let pathDist = this.evalPath(
              ap,
              targetStates[i],
              defenseBonus,
              resistanceBonus,
              level
            );
            // console.log("add target state: ", targetStates[i]);
            evaluations.set(targetStates[i], pathDist);
          }
          damageTrees[i].normal.damageDist = convolve(
            damageTrees[i].normal.damageDist,
            evaluations.get(targetStates[i])
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

    return damageDist;
  }
}

export { ActivityPathEvaluator };
