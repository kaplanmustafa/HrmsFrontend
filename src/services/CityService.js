import axios from "axios";

const apiPath = "/api/cities";

export default class CityService {
  getAll() {
    return axios.get(`${apiPath}/getAll`);
  }
}
