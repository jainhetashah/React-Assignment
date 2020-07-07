import axios from 'axios'
const baseUrl = "http://localhost:4455/"

class ApiFun {

  static postApi(url, data) {
    return axios.post("/api/CreateUser", data);
  }

  static getApi(url) {
    return axios.get(url);
  }

  static deleteApi(url) {
    return axios.delete(url);
  }
  static editApi(url) {
    return axios.get(url);
  }
  static updateApi(url,data) {    
    return axios.put(url,data);
  }
}

export default ApiFun