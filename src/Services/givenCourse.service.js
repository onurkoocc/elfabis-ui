import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9090/givenCourses";

class GivenCourseService {

    getAllGivenCourses = () => {
        return axios
            .get(API_URL , { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteGivenCourse = (givenCourseId) => {
        return axios
            .delete(API_URL +"/"+givenCourseId, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    getGivenCourse = (givenCourseId) => {
        return axios
            .get(API_URL +givenCourseId, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    updateGivenCourse = (id,course,lecturer,year,semester,group) => {
        return axios.put(API_URL,{
            id,course,lecturer,year,semester,group,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };

    addGivenCourse = (course,lecturer,year,semester,group) => {
        return axios.post(API_URL,{
            course,lecturer,year,semester,group,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };


}
export default new GivenCourseService();