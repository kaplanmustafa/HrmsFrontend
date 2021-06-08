import axios from "axios";

const apiPath = "/api/jobPositions";

export default class JobPositionService {
  getJobPositions() {
    return axios.get(`${apiPath}/getAll`);
  }

  addJobPosition(jobPosition) {
    return axios.post(`${apiPath}/add`, jobPosition);
  }
}
