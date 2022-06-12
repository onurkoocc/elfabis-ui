import React, {useState, useEffect, Component} from "react";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import AcademicianService from "../../Services/academician.service";
import CourseService from "../../Services/course.service";
import GivenCourseService from "../../Services/givenCourse.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";

const GivenCourseOperations = () => {
    const [givenCourses, setGivenCourses] = useState([]);
    const [selectedLecturerOption, setSelectedLecturerOption] = useState("none");
    const [selectedCourseOption, setSelectedCourseOption] = useState("none");
    const [courses, setCourses] = useState([]);
    const [lecturers, setLecturers] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
    const givenCourseTmp = {
        id: "",
        course: "",
        lecturer: "",
        year: "",
        semester: "",
        group: "",
    };
    const [givenCourseForm, setGivenCourseForm] = useState(givenCourseTmp);
    useEffect(() => {
        AcademicianService.getAllAcademicians().then(
            (data) => {
                setLecturers(data);
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
    }, [updatePage, addPage]);
    useEffect(() => {
        GivenCourseService.getAllGivenCourses().then(
            (data) => {
                setGivenCourses(data);
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

    const lecturerOptions = [];
    lecturers.map((lecturer) => lecturerOptions.push({value: lecturer.id, label: lecturer.username}));

    const courseOptions = [];
    courses.map((course) => courseOptions.push({value: course.id, label: course.name}));

    const onDelete = (givenCourseId) => {
        GivenCourseService.deleteGivenCourse(givenCourseId).then(
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
    const onChangeYear = event => {
        setGivenCourseForm({...givenCourseForm, year: event.target.value})
    }
    const onChangeSemester = event => {
        setGivenCourseForm({...givenCourseForm, semester: event.target.value})
    }
    const onChangeGroup = event => {
        setGivenCourseForm({...givenCourseForm, group: event.target.value})
    }
    const onChangeCourse = event => {
        setGivenCourseForm({...givenCourseForm, course:{id: event.target.value}})
    }
    const onChangeLecturer = event => {
        setGivenCourseForm({...givenCourseForm, lecturer:{id: event.target.value}})
    }

    const handleCourseSelect = e => {
        setSelectedCourseOption(e.value);
        setGivenCourseForm({...givenCourseForm, course: {id: e.value, name: e.label}});
    };

    const handleLecturerSelect = e => {
        setSelectedLecturerOption(e.value);
        setGivenCourseForm({...givenCourseForm, lecturer: {id: e.value, username: e.label}});
    };

    const addGivenCourse = () => {
        var data = {
            course: givenCourseForm.course,
            lecturer: givenCourseForm.lecturer,
            year: givenCourseForm.year,
            semester: givenCourseForm.semester,
            group: givenCourseForm.group,
        };

        GivenCourseService.addGivenCourse(givenCourseForm.course,
            givenCourseForm.lecturer,
            givenCourseForm.year,
            givenCourseForm.semester,
            givenCourseForm.group)
            .then(data => {
                setGivenCourseForm(givenCourseTmp);
                setAddPage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateGivenCourse = () => {
        var data = {
            id: givenCourseForm.id,
            course: givenCourseForm.course,
            lecturer: givenCourseForm.lecturer,
            year: givenCourseForm.year,
            semester: givenCourseForm.semester,
            group: givenCourseForm.group,
        };

        GivenCourseService.updateGivenCourse(givenCourseForm.id,
            givenCourseForm.course,
            givenCourseForm.lecturer,
            givenCourseForm.year,
            givenCourseForm.semester,
            givenCourseForm.group)
            .then(data => {
                setGivenCourseForm(givenCourseTmp);
                setUpdatePage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUpdateForm = (givenCourse) => {
        setGivenCourseForm(givenCourseTmp);
        setGivenCourseForm({
            ...givenCourseForm,
            id: givenCourse.id,
            course: givenCourse.course,
            lecturer: givenCourse.lecturer,
            year: givenCourse.year,
            semester: givenCourse.semester,
            group: givenCourse.group,
        });
        setUpdatePage(true);
    };

    const newAddForm = () => {
        setGivenCourseForm(givenCourseTmp);
        setAddPage(true);
    };

    return (
        <div className="container">

            {!updatePage ? (
                    <div className="card">
                        <h3 className="card-header text-center">GivenCourses</h3>
                        <div className="list-group-flush">
                            {errors}
                            <div className="text-right">
                                <button onClick={newAddForm} className="btn btn-success">
                                    Add GivenCourse
                                </button>
                            </div>
                            {addPage &&
                                <div className="card">
                                    <div className="list-group-flush">
                                        <form>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>COURSE</th>
                                                    <th>LECTURER</th>
                                                    <th>YEAR</th>
                                                    <th>SEMESTER</th>
                                                    <th>GROUP</th>
                                                    <th>ADD</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><Select className="form-control" name="course"
                                                                options={courseOptions}
                                                                onChange={handleCourseSelect}
                                                                value={courseOptions.filter(function (option) {
                                                                    return option.value === selectedCourseOption;
                                                                })}
                                                    /></td>
                                                    <td><Select className="form-control" name="lecturer"
                                                                options={lecturerOptions}
                                                                onChange={handleLecturerSelect}
                                                                value={lecturerOptions.filter(function (option) {
                                                                    return option.value === selectedLecturerOption;
                                                                })}
                                                    /></td>
                                                    <td><input className="form-control input-sm"
                                                               value={givenCourseForm.year} onChange={onChangeYear}/></td>
                                                    <td><input className="form-control input-sm"
                                                               value={givenCourseForm.semester}
                                                               onChange={onChangeSemester}/></td>
                                                    <td><input className="form-control input-sm"
                                                               value={givenCourseForm.group} onChange={onChangeGroup}/></td>
                                                    <td>
                                                        <button className="btn btn-success"
                                                                onClick={() => addGivenCourse()}>SAVE
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
                                    <th>COURSE</th>
                                    <th>LECTURER</th>
                                    <th>YEAR</th>
                                    <th>SEMESTER</th>
                                    <th>GROUP</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {givenCourses.map(givenCourse => (
                                    <tr key={givenCourse.id}>
                                        <td>{givenCourse.id}</td>
                                        <td>{givenCourse.course != null ? givenCourse.course.name : null}</td>
                                        <td>{givenCourse.lecturer != null ? givenCourse.lecturer.username : null}</td>
                                        <td>{givenCourse.year}</td>
                                        <td>{givenCourse.semester}</td>
                                        <td>{givenCourse.courseGroup}</td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => onDelete(givenCourse.id)}>DELETE
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => newUpdateForm(givenCourse)}>UPDATE
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
                            <h1 id="id">{givenCourseForm.id}</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="course">Course</label>
                            <Select className="form-control" name="course"
                                    options={courseOptions}
                                    onChange={handleCourseSelect}
                                    value={courseOptions.filter(function (option) {
                                        return option.value === selectedCourseOption;
                                    })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="lecturer">Lecturer</label>
                            <Select className="form-control" name="lecturer"
                                    options={lecturerOptions}
                                    onChange={handleLecturerSelect}
                                    value={lecturerOptions.filter(function (option) {
                                        return option.value === selectedLecturerOption;
                                    })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="year">Year</label>
                            <input
                                type="text"
                                className="form-control"
                                id="year"
                                required
                                value={givenCourseForm.year}
                                onChange={onChangeYear}
                                name="year"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="semester">Semester</label>
                            <input
                                type="text"
                                className="form-control"
                                id="semester"
                                required
                                value={givenCourseForm.semester}
                                onChange={onChangeSemester}
                                name="semester"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="group">Group</label>
                            <input
                                type="text"
                                className="form-control"
                                id="group"
                                required
                                value={givenCourseForm.group}
                                onChange={onChangeGroup}
                                name="group"
                            />
                        </div>

                        <button onClick={updateGivenCourse} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}

        </div>

    );
};
export default GivenCourseOperations;

