import React, {useState, useEffect, Component} from "react";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import EquivalentCourseService from "../../Services/equivalentCourse.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";

const EquivalentCourseOperations = () => {
    const [equivalentCourses, setEquivalentCourses] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
    const equivalentCourseTmp = {
        id: "",
        name: "",
    };
    const [equivalentCourseForm, setEquivalentCourseForm] = useState(equivalentCourseTmp);
    useEffect(() => {
        EquivalentCourseService.getAllEquivalentCourses().then(
            (data) => {
                setEquivalentCourses(data);
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
    const onDelete = (equivalentCourseId) => {
        EquivalentCourseService.deleteEquivalentCourse(equivalentCourseId).then(
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
    const onChangeEquivalentCourseName = event => {
        setEquivalentCourseForm({...equivalentCourseForm, name: event.target.value})
    }

    const addEquivalentCourse = () => {
        var data = {
            name: equivalentCourseForm.name,
        };

        EquivalentCourseService.addEquivalentCourse(equivalentCourseForm.name)
            .then(data => {
                setEquivalentCourseForm(equivalentCourseTmp);
                setAddPage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateEquivalentCourse = () => {
        var data = {
            id: equivalentCourseForm.id,
            name: equivalentCourseForm.name,
        };

        EquivalentCourseService.updateEquivalentCourse(equivalentCourseForm.id,
            equivalentCourseForm.name)
            .then(data => {
                setEquivalentCourseForm(equivalentCourseTmp);
                setUpdatePage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUpdateForm = (equivalentCourse) => {
        setEquivalentCourseForm(equivalentCourseTmp);
        setEquivalentCourseForm({
            ...equivalentCourseForm,
            id: equivalentCourse.id,
            name: equivalentCourse.name,
        });
        setUpdatePage(true);
    };

    const newAddForm = () => {
        setEquivalentCourseForm(equivalentCourseTmp);
        setAddPage(true);
    };

    return (
        <div className="container">

            {!updatePage ? (
                    <div className="card">
                        <h3 className="card-header text-center">Equivalent Courses</h3>
                        <div className="list-group-flush">
                            {errors}
                            <div className="text-right">
                                <button onClick={newAddForm} className="btn btn-success">
                                    Add Equivalent Course
                                </button>
                            </div>
                            {addPage &&
                                <div className="card">
                                    <div className="list-group-flush">
                                        <form>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>EQUIVALENT COURSE NAME</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><input className="form-control input-sm"
                                                               value={equivalentCourseForm.name}
                                                               onChange={onChangeEquivalentCourseName}/></td>
                                                    <td>
                                                        <button className="btn btn-success"
                                                                onClick={() => addEquivalentCourse()}>SAVE
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
                                    <th>EQUIVALENT COURSE NAME</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {equivalentCourses.map(equivalentCourse => (
                                    <tr key={equivalentCourse.id}>
                                        <td>{equivalentCourse.id}</td>
                                        <td>{equivalentCourse.name}</td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => onDelete(equivalentCourse.id)}>DELETE
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => newUpdateForm(equivalentCourse)}>UPDATE
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
                            <h1 id="id">{equivalentCourseForm.id}</h1>
                        </div>
                        <td><input className="form-control input-sm"
                                   value={equivalentCourseForm.name} onChange={onChangeEquivalentCourseName}/></td>
                        <button onClick={updateEquivalentCourse} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}

        </div>

    );
};
export default EquivalentCourseOperations;

