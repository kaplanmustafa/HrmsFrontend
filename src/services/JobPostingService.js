import axios from "axios";

const apiPath = "/api/jobs";

export default class JobPostingService {
  getJobPostings() {
    return axios.get(`${apiPath}/getAll`);
  }

  addJobPosting(jobPosting) {
    return axios.post(`${apiPath}/add`, jobPosting);
  }

  getAllActivePosting() {
    return axios.get(`${apiPath}/getAllActivePosting`);
  }

  getAllActivePostingByDateDesc() {
    return axios.get(`${apiPath}/getAllActivePostingByDateDesc`);
  }

  getAllActivePostingByDateAsc() {
    return axios.get(`${apiPath}/getAllActivePostingByDateAsc`);
  }

  getAllActivePostingByCompany(companyWebsite) {
    return axios.get(
      `${apiPath}/getAllActivePostingByCompany?${companyWebsite}`
    );
  }
}
