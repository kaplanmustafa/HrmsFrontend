import axios from "axios";

const apiPath = "/api/jobTypes";

export default class JobTypeService {
  getAll() {
    return axios.get(`${apiPath}/getAll`);
  }
}
