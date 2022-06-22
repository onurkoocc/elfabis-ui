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
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
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

                            <table className="table">
                                <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>PLAN NAME</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
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

