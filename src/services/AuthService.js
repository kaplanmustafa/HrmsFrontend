import axios from "axios";

const apiPath = "/api/auth";

export const employeeLogin = (creds) => {
  return axios.post(apiPath, creds);
};
