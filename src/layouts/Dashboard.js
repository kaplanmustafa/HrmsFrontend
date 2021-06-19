import React from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddJobPosting from "../pages/AddJobPosting";

export default function Dashboard() {
  return (
    <div>
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/newJobPosting" component={AddJobPosting} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
