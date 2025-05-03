import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
} from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import {
  importRoutine,
  routineCreated,
} from "../Routines/RoutineSlice/routineSlice";

// export interface TabState {
//   tabs: Tab[];
//   currentTab: number;
// }

// const initialState: TabState = {
//   tabs: [{ id: 0, routineIds: [] }],
//   currentTab: 0,
// };

export interface Tab {
  id: number;
  name: string;
  routineIds: number[];
}

export const tabAdapter = createEntityAdapter<Tab>();

let tabId = 0;
export const initialTab: Tab = {
  id: tabId,
  name: "Default",
  routineIds: [],
};
export const initialState = tabAdapter.getInitialState({
  // tabs: [initialTab],
  currentTab: tabId,
});
export type TabState = {
  tabs: Tab[];
  currentTab: number;
};

export const tabSlice = createSlice({
  name: "tabs",
  initialState,
  reducers: {
    tabCreated: {
      reducer(state, action: PayloadAction<Tab>) {
        tabAdapter.addOne(state, action.payload);
        state.currentTab = action.payload.id;
      },
      prepare({ name, routineIds }) {
        const id = ++tabId;
        return {
          payload: {
            id,
            name,
            routineIds,
          },
        };
      },
    },
    removeTab: (state, action: PayloadAction<number>) => {
      tabAdapter.removeOne(state, action.payload);
    },
    addRoutineToTab: (
      state,
      action: PayloadAction<{ tabId: number; routineId: number }>
    ) => {
      tabAdapter.updateOne(state, {
        id: action.payload.tabId,
        changes: {
          routineIds: [
            ...(state.entities[action.payload.tabId]?.routineIds ?? []),
            action.payload.routineId,
          ],
        },
      });
    },
    removeRoutineFromTab: (
      state,
      action: PayloadAction<{ tabId: number; routineId: number }>
    ) => {
      const { tabId, routineId } = action.payload;
      const tab = state.entities[tabId];
      if (tab) {
        tabAdapter.updateOne(state, {
          id: tabId,
          changes: {
            routineIds: tab.routineIds.filter((id) => id !== routineId),
          },
        });
      }
    },
    setCurrentTab: (state, action: PayloadAction<number>) => {
      state.currentTab = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(importRoutine, (state, action) => {
        if (action.payload !== null) {
          const { id } = action.payload;
          const currentTab = state.entities[state.currentTab];
          if (currentTab) {
            const routineIds = currentTab.routineIds;
            if (!routineIds.includes(id)) {
              routineIds.push(id);
            }
          }
        }
      })
      .addCase(routineCreated, (state, action) => {
        const { id } = action.payload;
        const currentTab = state.entities[state.currentTab];
        if (currentTab) {
          const routineIds = currentTab.routineIds;
          if (!routineIds.includes(id)) {
            routineIds.push(id);
          }
        }
      });
  },
});

export const {
  tabCreated,
  removeTab,
  addRoutineToTab,
  removeRoutineFromTab,
  setCurrentTab,
} = tabSlice.actions;

export default tabSlice.reducer;

// export const selectTabs = (state: { tabs: TabState }) => state.tabs.tabs;
// export const selectCurrentTab = (state: { tabs: TabState }) =>
//   state.tabs.currentTab;
// export const selectTabById = (state: { tabs: TabState }, id: number) =>
//   state.tabs.tabs.find((tab) => tab.id === id);

export const {
  selectById: selectTabById,
  selectIds: selectTabIds,
  selectEntities: selectTabEntities,
  selectAll: selectAllTabs,
  selectTotal: selectTotalTabs,
} = tabAdapter.getSelectors((state: RootState) => state.tabs);

export const selectCurrentTab = (state: RootState) => state.tabs.currentTab;
export const selectCurrentTabEntity = (state: RootState) =>
  state.tabs.entities[state.tabs.currentTab];
export const selectCurrentTabRoutines = (state: RootState) =>
  state.tabs.entities[state.tabs.currentTab]?.routineIds
    ?.map((id) => state.routines.routines.entities[id])
    .filter((routine) => routine !== undefined) ?? [];
export const selectCurrentTabRoutineEntities = (state: RootState) => {
  const routineIds =
    state.tabs.entities[state.tabs.currentTab]?.routineIds ?? [];
  const routines = state.routines.routines.entities;
  return Object.fromEntries(routineIds.map((id) => [id, routines[id]!]));
};
