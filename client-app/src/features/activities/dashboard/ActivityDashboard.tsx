import React, { useContext, useEffect } from "react";
import { observer } from "mobx-react-lite";
import { Grid } from "semantic-ui-react";
import ActivityList from "./ActivityList";
import ActivityStore from "../../../app/stores/activityStore";
import LoadingComponent from "../../../app/layout/LoadingComponent";

const ActivityDashboard = () => {
  const { loadActivities, loadingInitial } = useContext(ActivityStore);

  useEffect(() => {
    loadActivities();
  }, [loadActivities]);

  if (loadingInitial) return <LoadingComponent content="Loading Activities..." inverted />;

  return (
    <Grid>
      <Grid.Column width={10}>
        <ActivityList />
      </Grid.Column>
      <Grid.Column width={6}>
        <h2>Activity filters</h2>
      </Grid.Column>
    </Grid>
  );
};

export default observer(ActivityDashboard);
