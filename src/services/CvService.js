import axios from "axios";

const apiPath = "/api/cvs";

export default class CvService {
  getCvOfUser(identityNumber) {
    return axios.get(`${apiPath}/getCvOfUser/${identityNumber}`);
  }

  addCv(cvSubmitDto, identityNumber) {
    return axios.post(`${apiPath}/add/${identityNumber}`, cvSubmitDto);
  }
}
