import React from "react";
import { Grid } from "semantic-ui-react";
import { Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import AddJobPostingPage from "../pages/AddJobPostingPage";
import EmployeeSignupPage from "../pages/EmployeeSignupPage";
import { ToastContainer } from "react-toastify";
import GeneralSİgnupPage from "../pages/GeneralSİgnupPage";
import EmployerSignupPage from "../pages/EmployerSignupPage";
import StaffSignupPage from "../pages/StaffSignupPage";

export default function Dashboard() {
  return (
    <div>
      <ToastContainer position="bottom-right" />
      <Grid>
        <Grid.Row>
          <Grid.Column>
            <Route exact path="/" component={HomePage} />
            <Route exact path="/staff/signup" component={StaffSignupPage} />
            <Route exact path="/newJobPosting" component={AddJobPostingPage} />
            <Route exact path="/signup" component={GeneralSİgnupPage} />
            <Route
              exact
              path="/employee/signup"
              component={EmployeeSignupPage}
            />
            <Route
              exact
              path="/employer/signup"
              component={EmployerSignupPage}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    </div>
  );
}
