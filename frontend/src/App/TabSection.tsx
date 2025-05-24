import "./PF2App.css";
import {
  selectCurrentTabId,
  selectAllTabs,
  setCurrentTab,
  tabCreated,
  selectCurrentTabEntity,
  tabUpdated,
  cloneTab,
  removeTab,
} from "../Display/tabSlice";
import { Container, Box, Button, TextField, Paper } from "@mui/material";
import Grid from "@mui/material/Grid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useAppDispatch, useAppSelector } from "../App/hooks";

function TabSection() {
  const dispatch = useAppDispatch();
  const tabs = useAppSelector(selectAllTabs);
  const canRemoveTab = tabs.length > 1; // Ensure at least one tab remains
  const currentTabId = useAppSelector(selectCurrentTabId);
  const currentTab = useAppSelector(selectCurrentTabEntity);

  const addTab = () => {
    dispatch(
      tabCreated({
        name: "New Tab",
        routineIds: [],
      })
    );
  };

  const updateCurrentTabName = (name: string) => {
    dispatch(
      tabUpdated({
        id: currentTabId,
        changes: {
          name,
        },
      })
    );
  };

  return (
    <Paper
      variant="outlined"
      sx={{
        p: 0.5,
        my: 2,
      }}
      component="ul"
    >
      <Grid container spacing={1}>
        <Grid size={12}>
          <Tabs value={currentTabId} variant="scrollable" scrollButtons="auto">
            {tabs.map((tab) => (
              <Tab
                key={tab.id}
                label={tab.name}
                value={tab.id}
                onClick={() => dispatch(setCurrentTab(tab.id))}
              />
            ))}
            <Tab label="+" value={"add tab"} onClick={addTab} />
          </Tabs>
        </Grid>

        <Grid size={6}>
          <TextField
            value={currentTab.name}
            onChange={(e) => {
              updateCurrentTabName(e.target.value);
            }}
            fullWidth
          />
        </Grid>
        <Grid size={3} sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(cloneTab(currentTabId));
            }}
            fullWidth
          >
            Copy Tab
          </Button>
        </Grid>
        <Grid size={3} sx={{ display: "flex", alignItems: "center" }}>
          <Button
            variant="contained"
            onClick={() => {
              dispatch(removeTab(currentTabId));
            }}
            disabled={!canRemoveTab}
            fullWidth
          >
            Delete
          </Button>
        </Grid>
      </Grid>
    </Paper>
  );
}

export default TabSection;
