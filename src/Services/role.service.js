import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/roles";

class RoleService {

    getAllRoles = () => {
        return axios
            .get(API_URL, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };
}

export default new RoleService();