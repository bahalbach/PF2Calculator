import { createSlice } from '@reduxjs/toolkit';

import MAP from './Model/MAP.js';
import Proficiency from './Model/Proficiency.js';
import AbilityScore from './Model/AbilityScore.js';
import Modifier from './Model/Modifier.js';
import AdditionalEffectArray from './Model/AdditionalEffectArray.js';
import AdditionalEffect from './Model/AdditionalEffect.js';
import { DamageType } from './Model/DamageType.js';

//#region defaults
const DEFAULT_OVERRIDE = Modifier.newMod(new Array(20).fill(0))
const DEFAULT_PROF = Proficiency.newProficiency(1, 1, 5, 13);
const DEFAULT_ABSCORE = AbilityScore.newScore(18, [true, true, true, true], 17);
const ITEMB_ARRAY = new Array(20).fill(0);
for (let i = 0; i < 20; i++) {
    if (i + 1 >= 16) { ITEMB_ARRAY[i] = 3; continue; }
    if (i + 1 >= 10) { ITEMB_ARRAY[i] = 2; continue; }
    if (i + 1 >= 2) { ITEMB_ARRAY[i] = 1; continue; }
}
const DEFAULT_ITEMB = Modifier.newMod(ITEMB_ARRAY);
const WS_ARRAY = new Array(20).fill(0);
for (let level = 7; level <= 20; level++) {
    if (level < 15) {
       WS_ARRAY[level - 1] = 1;
    }
    if (level >= 15) {
       WS_ARRAY[level - 1] = 2;
    }
}
const DEFAULT_WS = Modifier.newMod(WS_ARRAY);
const DICENUM_ARRAY = new Array(20).fill(1);
for (let i = 0; i < 20; i++) {
    if (i + 1 >= 19) { DICENUM_ARRAY[i] = 4; continue; }
    if (i + 1 >= 12) { DICENUM_ARRAY[i] = 3; continue; }
    if (i + 1 >= 4) { DICENUM_ARRAY[i] = 2; continue; }
}
const DEFAULT_DICENUM = Modifier.newMod(DICENUM_ARRAY);
const DEFAULT_DIESIZE = Modifier.newMod(new Array(20).fill(8));
//#endregion

export const effectSlice = createSlice({
  name: 'effect',
  initialState: {
    MAP: MAP.newMAP(),

    useOverride: false,
    override: DEFAULT_OVERRIDE,

    proficiency: DEFAULT_PROF,
    attackAbilityScore: DEFAULT_ABSCORE,
    itemBonus: DEFAULT_ITEMB,

    useMiscModifiers: true,
    circumstanceBonus: Modifier.newMod(),
    statusBonus: Modifier.newMod(),
    circumstancePenalty: Modifier.newMod(),
    statusPenalty: Modifier.newMod(),
    itemPenalty: Modifier.newMod(),
    untypedPenalty: Modifier.newMod(),

    damageType: DamageType.newDamageType(),
    damageAbilityScore: DEFAULT_ABSCORE,
    weaponDiceNum: DEFAULT_DICENUM,
    dieSize: DEFAULT_DIESIZE,
    weaponSpec: DEFAULT_WS,

    weaponTraits: AdditionalEffectArray.newAdditionalEffectArray(),
    runes: AdditionalEffectArray.newAdditionalEffectArray(),

    additionalDamage: AdditionalEffect.newAdditionalEffect(),
  },
  reducers: {
    setMAP: (state, action) => {
      state.MAP = MAP.createUpdated(state.MAP, action.payload);
    },

    setUseOverride: (state, action) => {
      state.useOverride = action.payload;
    },
    setOverride: (state, action) => {
      state.override = Modifier.createUpdated(state.override, action.payload);
    },

    setProficiency: (state, action) => {
      state.proficiency = Proficiency.createUpdated(state.proficiency, action.payload);
    },
    setAttackAbilityScore: (state, action) => {
      state.attackAbilityScore = AbilityScore.createUpdated(state.attackAbilityScore, action.payload);
    },
    setItemBonus: (state, action) => {
      state.itemBonus = Modifier.createUpdated(state.itemBonus, action.payload);
    },

    setUseMiscModifiers: (state, action) => {
      state.useMiscModifiers = action.payload;
    },
    setCircumstanceBonus: (state, action) => {
      state.circumstanceBonus = Modifier.createUpdated(state.circumstanceBonus, action.payload);
    },
    setStatusBonus: (state, action) => {
      state.statusBonus = Modifier.createUpdated(state.statusBonus, action.payload);
    },
    setCicumstancePenalty: (state, action) => {
      state.circumstancePenalty = Modifier.createUpdated(state.circumstancePenalty, action.payload);
    },
    setStatusPenalty: (state, action) => {
      state.statusPenalty = Modifier.createUpdated(state.statusPenalty, action.payload);
    },
    setItemPenalty: (state, action) => {
      state.itemPenalty = Modifier.createUpdated(state.itemPenalty, action.payload);
    },
    setUntypedPenalty: (state, action) => {
      state.untypedPenalty = Modifier.createUpdated(state.untypedPenalty, action.payload);
    },

    setDamageType: (state, action) => {
      state.damageType = DamageType.newDamageType(action.payload);
    },
    setDamageAbilityScore: (state, action) => {
      state.damageAbilityScore = AbilityScore.createUpdated(state.damageAbilityScore, action.payload);
    },
    setWeaponDiceNum: (state, action) => {
      state.weaponDiceNum = Modifier.createUpdated(state.weaponDiceNum, action.payload);
    },
    setDieSize: (state, action) => {
      state.dieSize = Modifier.createUpdated(state.dieSize, action.payload);
    },
    setWeaponSpec: (state, action) => {
      state.weaponSpec = Modifier.createUpdated(state.weaponSpec, action.payload);
    },

    setWeaponTraits: (state, action) => {
      state.weaponTraits = AdditionalEffectArray.createUpdated(state.weaponTraits, action.payload);
    },
    setRunes: (state, action) => {
      state.runes = AdditionalEffectArray.createUpdated(state.runes, action.payload);
    },

    setAdditionalDamage: (state, action) => {
      state.additionalDamage = AdditionalEffect.createUpdated(state.additionalDamage, action.payload);
    },
  },
});

export const { setMAP, setUseOverride, setOverride, setProficiency, setAttackAbilityScore, setItemBonus, 
  setUseMiscModifiers, setCircumstanceBonus, setStatusBonus, setCicumstancePenalty, setStatusPenalty, setItemPenalty, setUntypedPenalty,
  setDamageType, setDamageAbilityScore, setWeaponDiceNum, setDieSize, setWeaponSpec, setWeaponTraits, setRunes, setAdditionalDamage, } = effectSlice.actions;

//#region selectors
export const selectCurrentEffect = state => state.effect;

export const selectLevel = state => state.target.level;

export const selectMAP = state => selectCurrentEffect(state).MAP;

export const selectUseOverride = state => selectCurrentEffect(state).useOverride;
export const selectOverride = state => selectCurrentEffect(state).override;

export const selectProficiency = state => selectCurrentEffect(state).proficiency;
export const selectAttackAbilityScore = state => selectCurrentEffect(state).attackAbilityScore;
export const selectItemBonus = state => selectCurrentEffect(state).itemBonus;

export const selectUseMiscModifiers = state => selectCurrentEffect(state).useMiscModifiers;
export const selectCircumstanceBonus = state => selectCurrentEffect(state).circumstanceBonus;
export const selectStatusBonus = state => selectCurrentEffect(state).statusBonus;
export const selectCircumstancePenalty = state => selectCurrentEffect(state).circumstancePenalty;
export const selectStatusPenalty = state => selectCurrentEffect(state).statusPenalty;
export const selectItemPenalty = state => selectCurrentEffect(state).itemPenalty;
export const selectUntypedPenalty = state => selectCurrentEffect(state).untypedPenalty;

export const selectDamageType = state => selectCurrentEffect(state).damageType;
export const selectDamageAbilityScore = state => selectCurrentEffect(state).damageAbilityScore;
export const selectWeaponDiceNum = state => selectCurrentEffect(state).weaponDiceNum;
export const selectDieSize = state => selectCurrentEffect(state).dieSize;
export const selectWeaponSpec = state => selectCurrentEffect(state).weaponSpec;

export const selectWeaponTraits = state => selectCurrentEffect(state).weaponTraits;
export const selectRunes = state => selectCurrentEffect(state).runes;

export const selectAdditionalDamage = state => selectCurrentEffect(state).additionalDamage;
//#endregion

export default effectSlice.reducer;