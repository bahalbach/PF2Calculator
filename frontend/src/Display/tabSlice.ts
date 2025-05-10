import {
  createSlice,
  PayloadAction,
  createEntityAdapter,
  createListenerMiddleware,
} from "@reduxjs/toolkit";
import { RootState } from "../App/store";
import {
  importRoutine,
  routineCreated,
  routineRemoved,
} from "../Routines/RoutineSlice/routineSlice";

export interface Tab {
  id: number;
  name: string;
  routineIds: number[];
}

export const tabAdapter = createEntityAdapter<Tab>();

let tabId = 0;

const saveState = (state: State) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem("tabState", serializedState);
  } catch {
    // ignore errors
  }
};

const loadState = () => {
  console.log("Loading tab state from local storage");
  try {
    const serializedState = localStorage.getItem("tabState");
    if (serializedState !== null) {
      const state = JSON.parse(serializedState);
      // console.log(state);
      tabId = Math.max(...state.routines.ids);
      return state;
    }
    console.log("Tab state not loaded");
    return undefined;
  } catch (err) {
    // ignore errors
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
        const { id, tabId: selectedTabId } = action.payload;
        const tabId = selectedTabId ?? state.currentTab;
        state.currentTab = tabId;
        const currentTab = state.entities[tabId];
        if (currentTab) {
          const routineIds = currentTab.routineIds;
          if (!routineIds.includes(id)) {
            routineIds.push(id);
          }
        }
      })
      .addCase(routineRemoved, (state, action) => {
        const routineId = action.payload;
        const currentTab = state.entities[state.currentTab];
        if (currentTab) {
          const routineIds = currentTab.routineIds;
          if (routineIds.includes(routineId)) {
            currentTab.routineIds = routineIds.filter((id) => id !== routineId);
          }
        }
      });
  },
});

export const { tabCreated, removeTab, setCurrentTab } = tabSlice.actions;

export default tabSlice.reducer;

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

// const listenerMiddleware = createListenerMiddleware()
// listenerMiddleware.startListening({
//   predicate: (action, currentState, previousState) => {
//     return action.type === "tabs/tabCreated" || action.type === "tabs/removeTab"
//   },
//   effect: (action, listenerApi) => {
//     saveState(listenerApi.getState())
//   }
// })
