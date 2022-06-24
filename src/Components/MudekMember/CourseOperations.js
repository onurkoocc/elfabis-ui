import React, {useState, useEffect, Component} from "react";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import CourseService from "../../Services/course.service";
import AcademicianService from "../../Services/academician.service";
import EquivalentCourseService from "../../Services/equivalentCourse.service";
import PlanService from "../../Services/plan.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";
import AuthService from "../../Services/auth.service"


const CourseOperations = () => {
    const [courses, setCourses] = useState([]);
    const [selectedCoordinatorOption, setSelectedCoordinatorOption] = useState("none");
    const [selectedEquivalentCourseOption, setSelectedEquivalentCourseOption] = useState("none");
    const [selectedPlanOption, setSelectedPlanOption] = useState("none");
    const [academicians, setAcademicians] = useState([]);
    const [equivalentCourses, setEquivalentCourses] = useState([]);
    const [plans, setPlans] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
    const courseTmp = {
        id: "",
        code: "",
        name: "",
        type: "",
        abd: "",
        coordinator: {id: "", username: ""},
        bolognaLink: "",
        category: "",
        plan: "",
        equivalentCourse: null,
    };
    const [courseForm, setCourseForm] = useState(courseTmp);


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


    const academicianOptions = [];
    academicians.map((academician) => academicianOptions.push({value: academician.id, label: academician.username}));

    const equivalentCourseOptions = [];
    equivalentCourses.map((equivalentCourse) => equivalentCourseOptions.push({
        value: equivalentCourse.id,
        label: equivalentCourse.name
    }));

    const planOptions = [];
    plans.map((plan) => planOptions.push({value: plan.id, label: plan.name}));


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
    const onChangeCode = event => {
        setCourseForm({...courseForm, code: event.target.value})
    }
    const onChangeName = event => {
        setCourseForm({...courseForm, name: event.target.value})
    }
    const onChangeType = event => {
        setCourseForm({...courseForm, type: event.target.value})
    }
    const onChangeAbd = event => {
        setCourseForm({...courseForm, abd: event.target.value})
    }
    const onChangeAcademician = event => {
        setCourseForm({...courseForm, coordinator: {id: event.target.value}})
    }
    const onChangeBolognaLink = event => {
        setCourseForm({...courseForm, bolognaLink: event.target.value})
    }
    const onChangeCategory = event => {
        setCourseForm({...courseForm, category: event.target.value})
    }
    const onChangePlan = event => {
        setCourseForm({...courseForm, plan: {id: event.target.value}})
    }
    const onChangeEquivalentCourse = event => {
        setCourseForm({...courseForm, equivalentCourse: {id: event.target.value}})
    }

    const handleCoordinatorTypeSelect = e => {
        setSelectedCoordinatorOption(e.value);
        setCourseForm({...courseForm, coordinator: {id: e.value, username: e.label}});
    };

    const handlePlanSelect = e => {
        setSelectedPlanOption(e.value);
        setCourseForm({...courseForm, plan: {id: e.value, name: e.label}});
    };

    const handleEquivalentCourseSelect = e => {
        setSelectedEquivalentCourseOption(e.value);
        setCourseForm({...courseForm, equivalentCourse: {id: e.value, name: e.label}});
    };


    const addCourse = () => {
        var data = {
            code: courseForm.code,
            name: courseForm.name,
            type: courseForm.type,
            abd: courseForm.abd,
            coordinator: courseForm.coordinator,
            bolognaLink: courseForm.bolognaLink,
            category: courseForm.category,
            plan: courseForm.plan,
            equivalentCourse: courseForm.equivalentCourse,
        };

        CourseService.addCourse(courseForm.code, courseForm.name, courseForm.type,
            courseForm.abd, courseForm.coordinator, courseForm.bolognaLink, courseForm.category, courseForm.plan,
            courseForm.equivalentCourse)
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
            id: courseForm.id,
            code: courseForm.code,
            name: courseForm.name,
            type: courseForm.type,
            abd: courseForm.abd,
            coordinator: courseForm.coordinator,
            bolognaLink: courseForm.bolognaLink,
            category: courseForm.category,
            plan: courseForm.plan,
            equivalentCourse: courseForm.equivalentCourse,
        };

        CourseService.updateCourse(courseForm.id, courseForm.code, courseForm.name, courseForm.type,
            courseForm.abd, courseForm.coordinator, courseForm.bolognaLink, courseForm.category, courseForm.plan,
            courseForm.equivalentCourse)
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
        setCourseForm({
            ...courseForm,
            id: course.id,
            code: course.code,
            name: course.name,
            type: course.type,
            abd: course.abd,
            coordinator: course.coordinator,
            bolognaLink: course.bolognaLink,
            category: course.category,
            plan: course.plan,
            equivalentCourse: course.equivalentCourse,
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
                                <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                        onClick={newAddForm} className="btn btn-success">
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
                                                <tr>
                                                    <td><input className="form-control input-sm" value={courseForm.code}
                                                               onChange={onChangeCode}/></td>
                                                    <td><input className="form-control input-sm" value={courseForm.name}
                                                               onChange={onChangeName}/></td>
                                                    <td><input className="form-control input-sm" value={courseForm.type}
                                                               onChange={onChangeType}/></td>
                                                    <td><input className="form-control input-sm" value={courseForm.abd}
                                                               onChange={onChangeAbd}/></td>
                                                    <td><Select className="form-control" name="coordinator"
                                                                options={academicianOptions}
                                                                onChange={handleCoordinatorTypeSelect}
                                                                value={academicianOptions.filter(function (option) {
                                                                    return option.value === selectedCoordinatorOption;
                                                                })}
                                                    />
                                                    </td>
                                                    <td><input className="form-control input-sm"
                                                               value={courseForm.bolognaLink}
                                                               onChange={onChangeBolognaLink}/></td>
                                                    <td><input className="form-control input-sm" value={courseForm.category}
                                                               onChange={onChangeCategory}/></td>
                                                    <td><Select className="form-control" name="plan"
                                                                options={planOptions}
                                                                onChange={handlePlanSelect}
                                                                value={planOptions.filter(function (option) {
                                                                    return option.value === selectedPlanOption;
                                                                })}
                                                    /></td>
                                                    <td><Select className="form-control" name="equivalentCourse"
                                                                options={equivalentCourseOptions}
                                                                onChange={handleEquivalentCourseSelect}
                                                                value={equivalentCourseOptions.filter(function (option) {
                                                                    return option.value === selectedEquivalentCourseOption;
                                                                })}
                                                                defaultValue={null}
                                                                />
                                                    </td>
                                                    <td>
                                                        <button
                                                            disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                                            className="btn btn-success"
                                                            onClick={() => addCourse()}>SAVE
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
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
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
                                        <td>{(course.equivalentCourse != null) ? course.equivalentCourse.name : null}</td>
                                        <td>
                                            <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                                    className="btn btn-danger" onClick={() => onDelete(course.id)}>DELETE
                                            </button>
                                        </td>
                                        <td>
                                            <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"}
                                                    className="btn btn-primary"
                                                    onClick={() => newUpdateForm(course)}>UPDATE
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
                            <h1 id="id">{courseForm.id}</h1>
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
                            <label htmlFor="type">Type</label>
                            <input
                                type="text"
                                className="form-control"
                                id="type"
                                required
                                value={courseForm.type}
                                onChange={onChangeType}
                                name="type"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="abd">ABD</label>
                            <input
                                type="text"
                                className="form-control"
                                id="abd"
                                required
                                value={courseForm.abd}
                                onChange={onChangeAbd}
                                name="abd"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="coordinator">Coordinator</label>
                            <Select className="form-control" name="coordinator"
                                    options={academicianOptions}
                                    onChange={handleCoordinatorTypeSelect}
                                    value={academicianOptions.filter(function (option) {
                                        return option.value === selectedCoordinatorOption;
                                    })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="bolognaLink">Bologna Link</label>
                            <input
                                type="text"
                                className="form-control"
                                id="bolognaLink"
                                required
                                value={courseForm.bolognaLink}
                                onChange={onChangeBolognaLink}
                                name="bolognaLink"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="category">Category</label>
                            <input
                                type="text"
                                className="form-control"
                                id="category"
                                required
                                value={courseForm.category}
                                onChange={onChangeCategory}
                                name="category"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="plan">Plan</label>
                            <Select className="form-control" name="plan"
                                    options={planOptions}
                                    onChange={handlePlanSelect}
                                    value={planOptions.filter(function (option) {
                                        return option.value === selectedPlanOption;
                                    })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="equivalentCourse">Equivalent Course</label>
                            <Select className="form-control" name="equivalentCourse"
                                    options={equivalentCourseOptions}
                                    onChange={handleEquivalentCourseSelect}
                                    value={equivalentCourseOptions.filter(function (option) {
                                        return option.value === selectedEquivalentCourseOption;
                                    })}
                            />
                        </div>

                        <button disabled={AuthService.getCurrentUser().roles[0] != "MUDEKMEMBER"} onClick={updateCourse}
                                className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}
            <div>
                <br/>
                <br/>

            </div>
        </div>

    );
};

export default CourseOperations;
