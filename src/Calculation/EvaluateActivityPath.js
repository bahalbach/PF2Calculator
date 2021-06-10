import { convolve, consolidateDists } from "./Distribution";
import { calculateExpectedDamage } from "./Calculation";
import { conditions } from "../types";

class ActivityPathEvaluator {
  constructor(activityPaths, targets, damages, weaknesses) {
    this.activityPaths = activityPaths;
    this.targets = targets;
    this.damages = damages;
    this.weaknesses = weaknesses;
  }

  evalPath(activityPath) {
    let currentTarget = this.targets[0];
    let currentDamages = activityPath.damages.map(
      (damageId) => this.damages[damageId]
    );
    currentDamages.push(activityPath);
    let currentWeaknesses = currentTarget.weaknesses.map(
      (weaknessId) => this.weaknesses[weaknessId]
    );

    // damage tress = [critDamages, succDamages, failDamages, crfaDamages]
    // critDamages = {normal, persistent}
    // normal = {fire..., staticDamage, damageDist}
    let [damageTrees, chances] = calculateExpectedDamage(
      activityPath,
      currentDamages,
      currentTarget,
      currentWeaknesses
    );
    // console.log(`chances are ${chances}`);

    // go through each activity path, depending on its condition add its damage distributions to this activities appropriately
    activityPath.apIds.forEach((apId) => {
      let ap = this.activityPaths[apId];
      let [pathDist, pathPDist] = this.evalPath(ap);

      let indicies = [];
      // console.log(`cond is: ${ap.condition}`);
      switch (ap.condition) {
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
      // console.log(`indies are: ${indicies}`);
      for (let index of indicies) {
        // console.log(
        //   `adding damage to index ${index} w/ chance ${chances[index]}`
        // );
        // damageTrees[index].normal.staticDamage += pathSD;
        damageTrees[index].normal.damageDist = convolve(
          damageTrees[index].normal.damageDist,
          pathDist
        );
        // damageTrees[index].persistent.staticDamage += pathPSD;
        damageTrees[index].persistent.damageDist = convolve(
          damageTrees[index].persistent.damageDist,
          pathPDist
        );
      }
      // console.log(pathChance);
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

    return [damageDist, PdamageDist];
  }
}

export default ActivityPathEvaluator;
