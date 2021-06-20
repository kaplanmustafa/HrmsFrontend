import React from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddJobPosting from "../pages/AddJobPosting";
import EmployeeSignupPage from "../pages/EmployeeSignupPage";
import { ToastContainer } from "react-toastify";
import GeneralSİgnupPage from "../pages/GeneralSİgnupPage";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/newJobPosting" component={AddJobPosting} />
            <Route exact path="/signup" component={GeneralSİgnupPage} />
            <Route
              exact
              path="/employee/signup"
              component={EmployeeSignupPage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
