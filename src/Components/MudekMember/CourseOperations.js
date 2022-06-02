import React, {useState, useEffect, Component} from "react";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import CourseService from "../../Services/course.service";
import  AcademicianService from "../../Services/academician.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";


const CourseOperations = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCoordinatorOption, setSelectedCoordinatorOption] = useState("none");
    const [academicians, setAcademicians] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage,setAddPage] = useState(false);
    const courseTmp ={
        id:null,
        name:null,
        code:null,
        coordinator:{id:null, username:null},
    };
    const [courseForm, setCourseForm] = useState(courseTmp);
    useEffect(() => {
        CourseService.getAllCourses().then(
            (data) => {
                setCourses(data);
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
    }, [updatePage,addPage]);

    useEffect(() => {
        AcademicianService.getAllAcademicians().then(
            (data) => {
                setAcademicians(data);
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
    }, [updatePage,addPage]);

    const academicianOptions = [];
        academicians.map((academician)=> academicianOptions.push({ value: academician.id, label: academician.username }));


    const onDelete = (courseId) => {
        CourseService.deleteCourse(courseId).then(
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
    const onChangeName = event => {
        setCourseForm({ ...courseForm,name:event.target.value})
    }
    const onChangeCode = event => {
        setCourseForm({ ...courseForm,code:event.target.value})
    }
    const onChangeAcademician = event => {
        setCourseForm({ ...courseForm,coordinator: {id: event.target.value}})
    }

    const handleCoordinatorTypeSelect = e => {
        setSelectedCoordinatorOption(e.value);
        setCourseForm({ ...courseForm,coordinator: {id: e.value, username:e.label}});
    };



    const addCourse = () => {
        var data = {

            name:courseForm.name,
            code:courseForm.code,
            coordinator: courseForm.coordinator,
        };

        CourseService.addCourse(courseForm.name,courseForm.code,courseForm.coordinator)
            .then(data => {
                setCourseForm(courseTmp);
                setAddPage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateCourse = () => {
        var data = {
            id:courseForm.id,
            name:courseForm.name,
            code:courseForm.code,
            coordinator: courseForm.coordinator,
        };

        CourseService.updateCourse(courseForm.id,courseForm.name,courseForm.code, courseForm.coordinator)
            .then(data => {
                setCourseForm(courseTmp);
                setUpdatePage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUpdateForm = (course) => {
        setCourseForm(courseTmp);
        setCourseForm({ ...courseForm,
            id:course.id,
            name:course.name,
            code:course.code,
            coordinator: course.coordinator,
        });
        setUpdatePage(true);
    };

    const newAddForm = () => {
        setCourseForm(courseTmp);
        setAddPage(true);
    };

    return (
        <div className="container">

            {!updatePage ? (
                    <div className="card">
                        <h3 className="card-header text-center">Courses</h3>
                        <div className="list-group-flush">
                            {errors}
                            <div className="text-right">
                                <button onClick={newAddForm} className="btn btn-success" >
                                    Add Course
                                </button>
                            </div>
                            {addPage &&
                                <div className="card">
                                    <div className="list-group-flush">
                                        <form>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>NAME</th>
                                                    <th>CODE</th>
                                                    <th>COORDINATOR</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><input className="form-control input-sm" value={courseForm.name} onChange={onChangeName}/></td>
                                                    <td><input className="form-control input-sm" value={courseForm.code} onChange={onChangeCode}/></td>
                                                    <td><Select
                                                        options={academicianOptions}
                                                        onChange={handleCoordinatorTypeSelect}
                                                        value={academicianOptions.filter(function(option) {
                                                            return option.value === courseForm.coordinator;
                                                        })}
                                                        label="adasd"

                                                    /></td>
                                                    <td><button className="btn btn-success" onClick={() => addCourse()}>SAVE</button></td>
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
                                    <th>NAME</th>
                                    <th>CODE</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {courses.map(course => (
                                    <tr key={course.id}>
                                        <td>{course.id}</td>
                                        <td>{course.name}</td>
                                        <td>{course.code}</td>
                                        <td><button className="btn btn-danger" onClick={() => onDelete(course.id)}>DELETE</button></td>
                                        <td><button className="btn btn-primary" onClick={() => newUpdateForm(course)}>UPDATE</button></td>
                                    </tr>
                                ))}

                                </tbody>
                            </table>



                        </div>
                    </div>
                ):
                (
                    <div className="submit-form">
                        <div className="form-group">
                            <label htmlFor="id">ID</label>
                            <h1 id="id">{courseForm.id}</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={courseForm.name}
                                onChange={onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="code">Code</label>
                            <input
                                type="text"
                                className="form-control"
                                id="code"
                                required
                                value={courseForm.code}
                                onChange={onChangeCode}
                                name="code"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="coordinator">Coordinator</label>
                            <td><Select
                                options={academicianOptions}
                                onChange={handleCoordinatorTypeSelect}
                                value={academicianOptions.filter(function(option) {
                                    return option.value === courseForm.coordinator;
                                })}
                                label="adasd"

                            /></td>
                        </div>

                        <button onClick={updateCourse} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}

        </div>

    );
};

export default CourseOperations;
