import React, {useState, useEffect, Component} from "react";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import PlanService from "../../Services/plan.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";
import AuthService from "../../Services/auth.service"

const PlanOperations = () => {
    const [plans, setPlans] = useState([]);
    const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState("None");
    const planTmp = {
        id: "",
        name: "",
    };
    const [planForm, setPlanForm] = useState(planTmp);
    useEffect(() => {
        PlanService.getAllPlans().then(
            (data) => {
                setPlans(data);
                console.log(data);
            },
            (error) => {
                console.log(error);
                const errors =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrors(errors);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    }, [updatePage, addPage]);
    const onDelete = (planId) => {
        PlanService.deletePlan(planId).then(
            () => {
                window.location.reload();
            },
            (error) => {
                console.log(error);
                const errors =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrors(errors);

                if (error.response && error.response.status === 401) {
                    EventBus.dispatch("logout");
                }
            }
        );
    };
    const onChangePlanName = event => {
        setPlanForm({...planForm, name: event.target.value})
    }

    const addPlan = () => {
        var data = {
            name: planForm.name,
        };

        PlanService.addPlan(planForm.name)
            .then(data => {
                setPlanForm(planTmp);
                setAddPage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const showCourses = (id, name) => {
        var data = {
            id: id,
            name: name,
        };

        PlanService.getAllCoursesByPlan(id)
            .then(data => {
                setCourses(data);
                setSelectedPlan(name);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };


    const updatePlan = () => {
        var data = {
            id: planForm.id,
            name: planForm.name,
        };

        PlanService.updatePlan(planForm.id,
            planForm.name)
            .then(data => {
                setPlanForm(planTmp);
                setUpdatePage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUpdateForm = (plan) => {
        setPlanForm(planTmp);
        setPlanForm({
            ...planForm,
            id: plan.id,
            name: plan.name,
        });
        setUpdatePage(true);
    };

    const newAddForm = () => {
        setPlanForm(planTmp);
        setAddPage(true);
    };

    return (
        <div className="container">

            {!updatePage ? (
                <div className="card">
                    <h3 className="card-header text-center">Plans</h3>
                    <div className="list-group-flush">
                        {errors}
                        <div className="text-right">
                            <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                    onClick={newAddForm} className="btn btn-success">
                                Add Plan
                            </button>
                        </div>
                        {addPage &&
                            <div className="card">
                                <div className="list-group-flush">
                                    <form>
                                        <table className="table">
                                            <thead>
                                            <tr>
                                                <th>PLAN NAME</th>
                                            </tr>
                                            </thead>
                                            <tbody>
                                            <tr>
                                                <td><input className="form-control input-sm"
                                                           value={planForm.name} onChange={onChangePlanName}/></td>
                                                <td>
                                                    <button
                                                        disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                                        className="btn btn-success" onClick={() => addPlan()}>SAVE
                                                    </button>
                                                </td>
                                            </tr>
                                            </tbody>
                                        </table>
                                    </form>
                                </div>
                            </div>
                        }
                        <div>
                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>PLAN NAME</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                    <th>SHOW COURSES</th>
                                </tr>
                                </thead>
                                <tbody>
                                {plans.map(plan => (
                                    <tr key={plan.id}>
                                        <td>{plan.id}</td>
                                        <td>{plan.name}</td>
                                        <td>
                                            <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                                    className="btn btn-danger"
                                                    onClick={() => onDelete(plan.id)}>DELETE
                                            </button>
                                        </td>
                                        <td>
                                            <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                                    className="btn btn-primary"
                                                    onClick={() => newUpdateForm(plan)}>UPDATE
                                            </button>
                                        </td>
                                        <td>
                                        <button
                                            className="btn btn-warning" onClick={() => showCourses(plan.id,plan.name)}>SHOW COURSES
                                        </button>
                                        </td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                        </div>
                    </div>
                        <div>
                            <center><h3 htmlFor="coursesforplan">Selected Plan : {selectedPlan}</h3></center>
                            <table className="table" name="coursesforplan">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>CODE</th>
                                    <th>NAME</th>
                                    <th>TYPE</th>
                                    <th>ABD</th>
                                    <th>COORDINATOR</th>
                                    <th>BOLOGNA LINK</th>
                                    <th>CATEGORY</th>
                                    <th>PLAN</th>
                                    <th>EQUIVALENT</th>
                                    <th>EQUIVALENT COURSE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.code}</td>
                                        <td>{course.name}</td>
                                        <td>{course.type}</td>
                                        <td>{course.abd}</td>
                                        <td>{(course.coordinator != null) ? course.coordinator.name : null}</td>
                                        <td>{course.bolognaLink}</td>
                                        <td>{course.category}</td>
                                        <td>{(course.plan != null) ? course.plan.name : null}</td>
                                        <td>{course.equivalent}</td>
                                        <td>{(course.equivalentCourse != null) ? course.equivalentCourse.name : null}</td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>
                </div>
                </div>
                ) :
                (
                <div className="submit-form">
                <div className="form-group">
                <label htmlFor="id">ID</label>
                <h1 id="id">{planForm.id}</h1>
                </div>
                <td><input className="form-control input-sm"
                value={planForm.name} onChange={onChangePlanName}/></td>
                <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"} onClick={updatePlan}
                className="btn btn-success">
                Save
                </button>
                </div>
                )}

        </div>

    );
};
export default PlanOperations;

