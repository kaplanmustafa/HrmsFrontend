import axios from "axios";

const apiPath = "/api/staff";
export default class StaffService {
  getAllStaff() {
    return axios.get(`${apiPath}/getAll`);
  }

  add(staffDto) {
    return axios.post(`${apiPath}/add`, staffDto);
  }
}
