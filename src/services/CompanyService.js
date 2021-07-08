import axios from "axios";

const apiPath = "/api/companies";

export default class CompanyService {
  getAll() {
    return axios.get(`${apiPath}/getAll`);
  }
}
