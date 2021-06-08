import axios from "axios";

const apiPath = "/api/employers";

export default class EmployerService {
  getEmployers() {
    return axios.get(`${apiPath}/getAll`);
  }

  addEmployer(employerDto) {
    return axios.post(`${apiPath}/add`, employerDto);
  }
}
