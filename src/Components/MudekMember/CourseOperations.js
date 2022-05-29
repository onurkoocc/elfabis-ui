import React, {useState, useEffect} from "react";
import CheckButton from "react-validation/build/button";

import CourseService from "../../Services/course.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";


const CourseOperations = () => {
    const [courses, setCourses] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage,setAddPage] = useState(false);
    const courseTmp ={
        id:null,
        name:null,
        code:null,
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



    const addCourse = () => {
        var data = {

            name:courseForm.name,
            code:courseForm.code,

        };

        CourseService.addCourse(courseForm.name,courseForm.code)
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
        };

        CourseService.updateCourse(courseForm.id,courseForm.name,courseForm.code)
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
                                                    <th>ADD</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><input className="form-control input-sm" value={courseForm.name} onChange={onChangeName}/></td>
                                                    <td><input className="form-control input-sm" value={courseForm.code} onChange={onChangeCode}/></td>
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

                        <button onClick={updateCourse} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}

        </div>

    );
};

export default CourseOperations;
