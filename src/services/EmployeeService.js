import Axios from "axios"
import AuthService from '@/services/AuthService'

const api_endpoint = process.env.VUE_APP_CCS_ENDPOINT || "http://localhost:8000"

export default {
    async getAllCustomers(){
        try{
            let url = `${api_endpoint}/api/employee/all-customers`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        }catch (e){
            
        }
    },
    async getAllWaitingRequest(){
        try{
            let url = `${api_endpoint}/api/employee/all-waiting-request`;
            let header = AuthService.getApiHeader();
            let res = await Axios.get(url, header);
            return res
        }catch (e){
            
        }
    },

    async confirmRequest(id, status){
        try{
            let url = `${api_endpoint}/api/employee/update-status/${id}`;
            let body = {
                id: id,
                status: status
            }
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, body, header);
            return res
        }catch (e){
            
        }
    },

    async appointment(id, appointment, status){
        try{
            let url = `${api_endpoint}/api/employee/appointment/${id}`;
            let body = {
                id: id,
                appointment: appointment,
                status: status
            }
            console.log(body.appointment);
            let header = AuthService.getApiHeader();
            let res = await Axios.post(url, body, header);
            return res
        }catch (e){
            
        }
    },
}