import Axios from "axios"
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_CCS_ENDPOINT || "http://localhost:8000"

export default {
    async createCustomer(newCustomer){
        try{
            let url = `${api_endpoint}/api/customer/create_customer`;
            let res = await Axios.post(url, newCustomer)
            return res
        }catch (e){
            
        }
    },
    async createRequest(newRequest){
        try{
            let url = `${api_endpoint}/api/customer/create_request`;
            let headers = AuthService.getApiHeader();
            let res = await Axios.post(url, newRequest, headers);
            return res
        }catch (e){
            
        }
    },
    async getAllRequestsById(id){
        try{
            let url = `${api_endpoint}/api/customer/all_requests/${id}`;
            let headers = AuthService.getApiHeader();
            let res = await Axios.get(url, headers);
            return res
        }catch (e){
            
        }
    },
    async getRequestDetailById(id){
        try{
            let url = `${api_endpoint}/api/customer/request/${id}`;
            let headers = AuthService.getApiHeader();
            let res = await Axios.get(url, headers);
            return res
        }catch (e){
            
        }
    },
    async getAllAppointedDate(){
        try{
            let url = `${api_endpoint}/api/customer/request/appoint-date`;
            let headers = AuthService.getApiHeader();
            let res = await Axios.get(url, headers);
            return res
        }catch (e){
            
        }
    },
}