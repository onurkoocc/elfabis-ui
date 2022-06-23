import axios from "axios";
import authHeader from "./auth-header";

const API_URL = "http://localhost:9090/formtrackings";

class FormTrackingService {

    getAllFormTrackings = () => {
        return axios
            .get(API_URL, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };
    getAllCompletedFormTrackings = () => {
        return axios
            .get(API_URL + "/getallcompleted", {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    deleteFormTracking = (id) => {
        return axios
            .delete(API_URL + "/" + id, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    getFormTracking = (formTrackingId) => {
        return axios
            .get(API_URL + formTrackingId, {headers: authHeader()}
            )
            .then((response) => {
                return response.data;
            });
    };

    updateFormTracking = (id, givenCourse, commission, area1, area2, area3, area4, area5, area6, area7, area8, area9, area10, area11, area12, area13, form2, form3, pc) => {
        return axios.put(API_URL, {
            "id": id,
            "givenCourse": givenCourse,
            "commission": commission,
            "area1": area1,
            "area2": area2,
            "area3": area3,
            "area4": area4,
            "area5": area5,
            "area6": area6,
            "area7": area7,
            "area8": area8,
            "area9": area9,
            "area10": area10,
            "area11": area11,
            "area12": area12,
            "area13": area13,
            "form2": form2,
            "form3": form3,
            "pc": pc,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };

    addFormTracking = (givenCourseId, commission, area1, area2, area3, area4, area5, area6, area7, area8, area9, area10, area11, area12, area13, form2, form3, pc) => {
        return axios.post(API_URL, {
            "givenCourse": {"id": givenCourseId},
            "commission": commission,
            "area1": area1,
            "area2": area2,
            "area3": area3,
            "area4": area4,
            "area5": area5,
            "area6": area6,
            "area7": area7,
            "area8": area8,
            "area9": area9,
            "area10": area10,
            "area11": area11,
            "area12": area12,
            "area13": area13,
            "form2": form2,
            "form3": form3,
            "pc": pc,
        }, {headers: authHeader()}).then((response) => {
            return response.data
        });
    };


}

export default new FormTrackingService();