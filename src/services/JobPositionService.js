import axios from "axios";

const apiPath = "/api/jobPositions";

export default class JobPositionService {
  getAll() {
    return axios.get(`${apiPath}/getAll`);
  }

  addJobPosition(jobPosition) {
    return axios.post(`${apiPath}/add`, jobPosition);
  }
}
