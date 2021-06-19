import React from "react";
import { Grid } from "semantic-ui-react";
import { Route, useRouteMatch } from "react-router-dom";
import HomePage from "../pages/HomePage";

export default function Dashboard() {
  const matched = useRouteMatch("/");
  const { isExact: isHomePage } = matched;

  return (
    <div>
      <Grid columns={2}>
        <Grid.Row>
          {!isHomePage && <Grid.Column width={4}> MENU </Grid.Column>}
          <Grid.Column width={isHomePage ? 16 : 12}>
            <Route exact path="/" component={HomePage} />
            {/* <Route exact path="/a" component={A} /> */}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
