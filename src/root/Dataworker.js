import axios from "axios"

const URL = "https://data.mongodb-api.com/app/kitzone-functions-wqhlr/endpoint"
class DataService {

 Getalldata(apikey){
     return axios.get(`${URL}/getallorders?apikey=${apikey}`)
 }

 updateOrderStatus(apikey = "Slide12345", uid, oid, status){
    return axios.get(`${URL}/updateorderstatus?apikey=${apikey}&uid=${uid}&status=${status}&oid=${oid}`)
 }

}

export default new DataService();