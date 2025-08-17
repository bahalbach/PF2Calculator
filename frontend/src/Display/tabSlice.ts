import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createSelector,
} from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import {
  ActivityPath,
  ActivityPathObject,
  Damage,
  Effect,
  Routine,
  RoutineObject,
} from "../Routines/RoutineSlice/RoutineTypes";
import { getNewRoutineId } from "../Routines/RoutineSlice/routineSlice";

export interface Tab {
  id: number;
  name: string;
}

export const tabAdapter = createEntityAdapter<Tab>();

let maxUsedTabId = 0;

const loadState = () => {
  console.log("Loading tab state from local storage");
  // Uncomment the following lines to enable loading from localStorage
  try {
    const serializedState = localStorage.getItem("tabState");
    if (serializedState !== null) {
      const state = JSON.parse(serializedState);
      maxUsedTabId = Math.max(...state.ids);
      return state;
    }
    console.log("Tab state not loaded");
    return undefined;
  } catch (err) {
    // ignore errors
    console.log("Error loading tab state");
    return undefined;
  }
};

// try to load initial state
type State = ReturnType<
  typeof tabAdapter.getInitialState<{
    currentTab: number;
  }>
>;
const savedState = loadState();
const initialState: State =
  savedState ??
  tabAdapter.getInitialState({
    currentTab: maxUsedTabId,
  });

export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    tabCreated: {
      reducer(state, action: PayloadAction<Tab>) {
        tabAdapter.addOne(state, action.payload);
        state.currentTab = action.payload.id;
      },
      prepare({ name }) {
        const id = ++maxUsedTabId;
        return {
          payload: {
            id,
            name,
          },
        };
      },
    },
    removeTab: (state, action: PayloadAction<number>) => {
      if (state.ids.length === 1) {
        console.log("Cannot remove last tab");
        return;
      }
      const tabId = action.payload;
      tabAdapter.removeOne(state, tabId);
      state.currentTab = state.ids[0]; // Set current tab to the first tab after removal
    },
    cloneTab: {
      reducer(
        state,
        action: PayloadAction<{ clonedTabId: number; newTabId: number }>
      ) {
        const { clonedTabId, newTabId } = action.payload;
        const tab = state.entities[clonedTabId];
        if (tab) {
          const newTab = {
            ...tab,
            id: newTabId,
            name: `${tab.name} (copy)`,
          };
          tabAdapter.addOne(state, newTab);
          state.currentTab = newTabId;
        }
      },
      prepare(clonedTabId: number) {
        return {
          payload: {
            clonedTabId,
            newTabId: ++maxUsedTabId,
          },
        };
      },
    },
    importTab: {
      prepare({ tab, routines }: { tab: Tab; routines: RoutineObject[] }) {
        const newTabId = ++maxUsedTabId;
        const newRoutines = routines.map((routine) => ({
          ...routine,
          id: getNewRoutineId(),
          tabId: newTabId, // Assign new tab ID to routines
        }));
        return {
          payload: {
            tab,
            routines: newRoutines,
            newTabId: newTabId,
          },
        };
      },
      reducer(
        state,
        action: PayloadAction<{
          tab: Tab;
          newTabId: number;
        }>
      ) {
        const { newTabId, tab } = action.payload;
        const tabWithNewId = {
          ...tab,
          id: newTabId,
        };
        tabAdapter.addOne(state, tabWithNewId);
        state.currentTab = newTabId;
      },
    },
    tabUpdated: tabAdapter.updateOne,
    setCurrentTab: (state, action: PayloadAction<number>) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder;
  },
});

export const {
  tabCreated,
  removeTab,
  cloneTab,
  importTab,
  setCurrentTab,
  tabUpdated,
} = tabSlice.actions;

export default tabSlice.reducer;

export const {
  selectById: selectTabById,
  selectIds: selectTabIds,
  selectEntities: selectTabEntities,
  selectAll: selectAllTabs,
  selectTotal: selectTotalTabs,
} = tabAdapter.getSelectors((state: RootState) => state.tabs);

export const selectCurrentTabId = (state: RootState) => state.tabs.currentTab;
export const selectCurrentTabEntity = (state: RootState) =>
  state.tabs.entities[state.tabs.currentTab];
export const selectCurrentTabRoutines = createSelector(
  (state: RootState) => state.tabs.currentTab,
  (state: RootState) => state.routines.routines.entities,
  (currentTab, routines) => {
    return Object.values(routines).filter(
      (routine) => routine.tabId === currentTab
    );
  }
);
export const selectCurrentTabRoutineObjects = createSelector(
  (state: RootState) => state.tabs.currentTab,
  (state: RootState) => state.routines.routines.entities,
  (state: RootState) => state.routines.activityPaths.entities,
  (state: RootState) => state.routines.damages.entities,
  (state: RootState) => state.routines.effects.entities,
  (currentTab, routines, activityPaths, damages, effects) => {
    return Object.values(routines)
      .filter((routine) => routine.tabId === currentTab)
      .map((routine) =>
        routineToRoutineObject(routine, activityPaths, damages, effects)
      );
  }
);
export const selectCurrentTabRoutineEntities = createSelector(
  (state: RootState) => state.tabs.currentTab,
  (state: RootState) => state.routines.routines.entities,
  (currentTab, routines) =>
    Object.fromEntries(
      Object.entries(routines).filter(
        ([id, routine]) => routine.tabId === currentTab
      )
    )
);

function routineToRoutineObject(
  routine: Routine,
  activityPaths: Record<number, ActivityPath>,
  damages: Record<number, Damage>,
  effects: Record<number, Effect>
): RoutineObject {
  const activityPathsObjects: ActivityPathObject[] = routine.apIds.map((apId) =>
    activityPathToActivityPathObject(
      activityPaths[apId],
      activityPaths,
      damages,
      effects
    )
  );
  return {
    ...routine,
    apIds: activityPathsObjects,
  };
}
function activityPathToActivityPathObject(
  activityPath: ActivityPath,
  activityPaths: Record<number, ActivityPath>,
  damages: Record<number, Damage>,
  effects: Record<number, Effect>
): ActivityPathObject {
  const activityPathsObjects: ActivityPathObject[] = activityPath.apIds.map(
    (apId) =>
      activityPathToActivityPathObject(
        activityPaths[apId],
        activityPaths,
        damages,
        effects
      )
  );
  const d = activityPath.damages.map((damageId) => damages[damageId]);
  const e = activityPath.effects.map((effectId) => effects[effectId]);
  return {
    ...activityPath,
    apIds: activityPathsObjects,
    damages: d,
    effects: e,
  };
}
