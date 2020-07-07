import axios from 'axios'
const baseUrl="https://reqres.in/"
 
class ApiFun {
 
static postApi(url,data){ 
    // alert(data["email"]);  
return axios.post(baseUrl+url,data);
}
 
static getApi(url){
return axios.get(baseUrl + url);
}
}
 
export default ApiFun