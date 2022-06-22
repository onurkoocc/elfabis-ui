import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/equivalentCourses";

class EquivalentCourseService {

    getAllEquivalentCourses = () => {
        return axios
            .get(API_URL, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteEquivalentCourse = (equivalentCourseId) => {
        return axios
            .delete(API_URL + "/" + equivalentCourseId, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    getEquivalentCourse = (equivalentCourseId) => {
        return axios
            .get(API_URL + equivalentCourseId, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    updateEquivalentCourse = (id, name) => {
        return axios.put(API_URL, {
            "id": id, "name": name,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };

    addEquivalentCourse = (name) => {
        return axios.post(API_URL, {
            "name": name,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };


}

export default new EquivalentCourseService();