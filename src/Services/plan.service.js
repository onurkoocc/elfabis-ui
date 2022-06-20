import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9090/plans";

class PlanService {

    getAllPlans = () => {
        return axios
            .get(API_URL , { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    deletePlan = (planId) => {
        return axios
            .delete(API_URL +"/"+planId, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    getPlan = (planId) => {
        return axios
            .get(API_URL +planId, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    updatePlan = (id,name) => {
        return axios.put(API_URL,{
            "id":id,"name":name,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };

    addPlan = (name) => {
        return axios.post(API_URL,{
            "name":name,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };


}
export default new PlanService();