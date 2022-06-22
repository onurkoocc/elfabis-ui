import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/academicians";


class AcademicianService {
    getAllAcademicians = () => {
        return axios
            .get(API_URL, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    getAllCommissioners = () => {
        return axios
            .get(API_URL + "/commissioners", {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteAcademician = (academicianId) => {
        return axios
            .delete(API_URL + "/" + academicianId, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    updateAcademician = (id, username, email, role, name, title, abd, abbr) => {
        return axios.put(API_URL + "/updateacademician", {
            "id": id,
            "username": username,
            "email": email,
            "role": role.name,
            "name": name,
            "title": title,
            "abd": abd,
            "abbr": abbr,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };

    addAcademician = (username, email, role, name, title, abd, abbr) => {
        return axios.post(API_URL + "/addacademician", {
            "username": username,
            "email": email,
            "role": role.name,
            "name": name,
            "title": title,
            "abd": abd,
            "abbr": abbr,
            password: "password",
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };
}

export default new AcademicianService();