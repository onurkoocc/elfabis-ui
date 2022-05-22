import axios from "axios";
import authHeader from "./auth-header";
const API_URL = "http://localhost:9090/academicians";


class AcademicianService {
    getAllAcademicians = () => {
        return axios
            .get(API_URL, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteAcademician = (academicianId) => {
        return axios
            .delete(API_URL +academicianId, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    updateAcademician = (id,name,surname,username,email,role) => {
        return axios.put(API_URL + "/updateacademician",{
            id,name,surname,username,email,role,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };

    addAcademician = (name,surname,username,email,role,password) => {
        return axios.post(API_URL + "/addacademician",{
            name,surname,username,email,role,password,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };

    getAllCourses = () => {
        return axios
            .get(API_URL + "courses", { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteCourse = (courseId) => {
        return axios
            .delete(API_URL + "courses/"+courseId, { headers: authHeader() }
            )
            .then((response) => {
                return response.data;
            });
    };

    updateCourse = (id,name,code) => {
        return axios.put(API_URL + "courses/",{
            id,name,code,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };

    addCourse = (name,code) => {
        return axios.post(API_URL + "courses",{
            name,code,
        },{ headers: authHeader()}).then((response)=>{return response.data});
    };

}

export default new AcademicianService();