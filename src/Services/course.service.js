import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/courses";

class CourseService {

    getAllCourses = () => {
        return axios
            .get(API_URL, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteCourse = (courseId) => {
        return axios
            .delete(API_URL + "/" + courseId, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    getCourse = (courseId) => {
        return axios
            .get(API_URL + courseId, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    updateCourse = (id, code, name, type, abd, coordinator, bolognaLink, category, plan, equivalentCourse) => {
        return axios.put(API_URL, {
            "id": id,
            "code": code,
            "name": name,
            "type": type,
            "abd": abd,
            "coordinator": coordinator,
            "bolognaLink": bolognaLink,
            "category": category,
            "plan": plan,
            "equivalentCourse": equivalentCourse,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };

    addCourse = (code, name, type, abd, coordinator, bolognaLink, category, plan, equivalentCourse) => {
        return axios.post(API_URL, {
            "code": code,
            "name": name,
            "type": type,
            "abd": abd,
            "coordinator": coordinator,
            "bolognaLink": bolognaLink,
            "category": category,
            "plan": plan,
            "equivalentCourse": equivalentCourse,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };


}

export default new CourseService();