import axios from "axios";

const apiPath = "/api/employees";
export default class EmployeeService {
  getEmployees() {
    return axios.get(`${apiPath}/getAll`);
  }

  add(employeeDto) {
    return axios.post(`${apiPath}/add`, employeeDto);
  }
}
