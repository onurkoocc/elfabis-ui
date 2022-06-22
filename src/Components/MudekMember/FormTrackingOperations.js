import React, {useState, useEffect, Component} from "react";
import CheckButton from "react-validation/build/button";
import Select from 'react-select';
import AcademicianService from "../../Services/academician.service";
import FormTrackingService from "../../Services/formTracking.service";
import GivenCourseService from "../../Services/givenCourse.service";
import EventBus from "../../Common/EventBus";
import {isEmail} from "validator";
import Input from "react-validation/build/input";

const FormTrackingOperations = () => {
    const [formTrackings, setFormTrackings] = useState([]);
    const [selectedGivenCourseOption, setSelectedGivenCourseOption] = useState("none");
    const [selectedCommissionOption, setSelectedCommissionOption] = useState([]);
    const [givenCourses, setGivenCourses] = useState([]);
    const [commissions, setCommissions] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
    const formTrackingTmp = {
        id: "",
        givenCourse: {id: "", name: ""},
        commission: [],
        area1: false,
        area2: false,
        area3: false,
        area4: false,
        area5: false,
        area6: false,
        area7: false,
        area8: false,
        area9: false,
        area10: false,
        area11: false,
        area12: false,
        area13: false,
        form2: false,
        form3: false,
        pc: false,
    };
    const [formTrackingForm, setFormTrackingForm] = useState(formTrackingTmp);
    useEffect(() => {
        FormTrackingService.getAllFormTrackings().then(
            (data) => {
                setFormTrackings(data);
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
        AcademicianService.getAllCommissioners().then(
            (data) => {
                setCommissions(data);
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

    const commissionOptions = [];
    commissions.map((academician) => commissionOptions.push({value: academician.id, label: academician.username}));

    const givenCourseOptions = [];
    givenCourses.map((givenCourse) =>
        givenCourseOptions.push({
            value: givenCourse.id,
            label: givenCourse.course != null ? givenCourse.course.name : ""
        }));

    const onDelete = (formTrackingId) => {
        FormTrackingService.deleteFormTracking(formTrackingId).then(
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
    const onChangeArea1 = event => {
        setFormTrackingForm({...formTrackingForm, area1: !formTrackingForm.area1})
    }
    const onChangeArea2 = event => {
        setFormTrackingForm({...formTrackingForm, area2: !formTrackingForm.area2})
    }
    const onChangeArea3 = event => {
        setFormTrackingForm({...formTrackingForm, area3: !formTrackingForm.area3})
    }
    const onChangeArea4 = event => {
        setFormTrackingForm({...formTrackingForm, area4: !formTrackingForm.area4})
    }
    const onChangeArea5 = event => {
        setFormTrackingForm({...formTrackingForm, area5: !formTrackingForm.area5})
    }
    const onChangeArea6 = event => {
        setFormTrackingForm({...formTrackingForm, area6: !formTrackingForm.area6})
    }
    const onChangeArea7 = event => {
        setFormTrackingForm({...formTrackingForm, area7: !formTrackingForm.area7})
    }
    const onChangeArea8 = event => {
        setFormTrackingForm({...formTrackingForm, area8: !formTrackingForm.area8})
    }
    const onChangeArea9 = event => {
        setFormTrackingForm({...formTrackingForm, area9: !formTrackingForm.area9})
    }
    const onChangeArea10 = event => {
        setFormTrackingForm({...formTrackingForm, area10: !formTrackingForm.area10})
    }
    const onChangeArea11 = event => {
        setFormTrackingForm({...formTrackingForm, area11: !formTrackingForm.area11})
    }
    const onChangeArea12 = event => {
        setFormTrackingForm({...formTrackingForm, area12: !formTrackingForm.area12})
    }
    const onChangeArea13 = event => {
        setFormTrackingForm({...formTrackingForm, area13: !formTrackingForm.area13})
    }
    const onChangeForm2 = event => {
        setFormTrackingForm({...formTrackingForm, form2: !formTrackingForm.form2})
    }
    const onChangeForm3 = event => {
        setFormTrackingForm({...formTrackingForm, form3: !formTrackingForm.form3})
    }
    const onChangePc = event => {
        setFormTrackingForm({...formTrackingForm, pc: !formTrackingForm.pc})
    }

    const handleGivenCourseSelect = e => {
        setSelectedGivenCourseOption(e.value);
        setFormTrackingForm({...formTrackingForm, givenCourse: {id: e.value, name: e.label}});
    };

    const handleCommissionSelect = e => {
        setSelectedCommissionOption(e.value);
        const commissionTmp = formTrackingForm.commission;
        commissionTmp.push({id: e.value, username: e.label});
        setFormTrackingForm({...formTrackingForm, commission: commissionTmp});
    };

    const addFormTracking = () => {
        var data = {
            givenCourseId: formTrackingForm.givenCourse.id,
            commission: formTrackingForm.commission,
            area1: formTrackingForm.area1.valueOf(),
            area2: formTrackingForm.area2.valueOf(),
            area3: formTrackingForm.area3.valueOf(),
            area4: formTrackingForm.area4.valueOf(),
            area5: formTrackingForm.area5.valueOf(),
            area6: formTrackingForm.area6.valueOf(),
            area7: formTrackingForm.area7.valueOf(),
            area8: formTrackingForm.area8.valueOf(),
            area9: formTrackingForm.area9.valueOf(),
            area10: formTrackingForm.area10.valueOf(),
            area11: formTrackingForm.area11.valueOf(),
            area12: formTrackingForm.area12.valueOf(),
            area13: formTrackingForm.area13.valueOf(),
            form2: formTrackingForm.form2.valueOf(),
            form3: formTrackingForm.form3.valueOf(),
            pc: formTrackingForm.pc.valueOf(),
        };

        FormTrackingService.addFormTracking(formTrackingForm.givenCourse.id,
            formTrackingForm.commission, formTrackingForm.area1.valueOf(),
            formTrackingForm.area2.valueOf(), formTrackingForm.area3.valueOf(),
            formTrackingForm.area4.valueOf(), formTrackingForm.area5.valueOf(),
            formTrackingForm.area6.valueOf(), formTrackingForm.area7.valueOf(),
            formTrackingForm.area8.valueOf(), formTrackingForm.area9.valueOf(),
            formTrackingForm.area10.valueOf(), formTrackingForm.area11.valueOf(),
            formTrackingForm.area12.valueOf(), formTrackingForm.area13.valueOf(),
            formTrackingForm.form2.valueOf(), formTrackingForm.form3.valueOf(),
            formTrackingForm.pc.valueOf())
            .then(data => {
                setFormTrackingForm(formTrackingTmp);
                setAddPage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateFormTracking = () => {
        var data = {
            id: formTrackingForm.id,
            givenCourse: formTrackingForm.givenCourse,
            commission: formTrackingForm.commission,
            area1: formTrackingForm.area1,
            area2: formTrackingForm.area2,
            area3: formTrackingForm.area3,
            area4: formTrackingForm.area4,
            area5: formTrackingForm.area5,
            area6: formTrackingForm.area6,
            area7: formTrackingForm.area7,
            area8: formTrackingForm.area8,
            area9: formTrackingForm.area9,
            area10: formTrackingForm.area10,
            area11: formTrackingForm.area11,
            area12: formTrackingForm.area12,
            area13: formTrackingForm.area13,
            form2: formTrackingForm.form2,
            form3: formTrackingForm.form3,
            pc: formTrackingForm.pc,
        };

        FormTrackingService.updateFormTracking(
            formTrackingForm.id, formTrackingForm.givenCourse,
            formTrackingForm.commission, formTrackingForm.area1,
            formTrackingForm.area2, formTrackingForm.area3,
            formTrackingForm.area4, formTrackingForm.area5,
            formTrackingForm.area6, formTrackingForm.area7,
            formTrackingForm.area8, formTrackingForm.area9,
            formTrackingForm.area10, formTrackingForm.area11,
            formTrackingForm.area12, formTrackingForm.area13,
            formTrackingForm.form2, formTrackingForm.form3,
            formTrackingForm.pc)
            .then(data => {
                setFormTrackingForm(formTrackingTmp);
                setUpdatePage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUpdateForm = (formTracking) => {
        setFormTrackingForm(formTrackingTmp);
        setFormTrackingForm({
            ...formTrackingForm,
            id: formTracking.id,
            givenCourse: formTracking.givenCourse,
            commission: formTracking.commission,
            area1: formTracking.area1,
            area2: formTracking.area2,
            area3: formTracking.area3,
            area4: formTracking.area4,
            area5: formTracking.area5,
            area6: formTracking.area6,
            area7: formTracking.area7,
            area8: formTracking.area8,
            area9: formTracking.area9,
            area10: formTracking.area10,
            area11: formTracking.area11,
            area12: formTracking.area12,
            area13: formTracking.area13,
            form2: formTracking.form2,
            form3: formTracking.form3,
            pc: formTracking.pc,
        });
        setUpdatePage(true);
    };

    const newAddForm = () => {
        setFormTrackingForm(formTrackingTmp);
        setAddPage(true);
    };

    return (
        <div className="container">

            {!updatePage ? (
                    <div className="card">
                        <h3 className="card-header text-center">Form Trackings</h3>
                        <div className="list-group-flush">
                            {errors}
                            <div className="text-right">
                                <button onClick={newAddForm} className="btn btn-success">
                                    Add Form Tracking
                                </button>
                            </div>
                            {addPage &&
                                <div className="card">
                                    <div className="list-group-flush">
                                        <form>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>GIVEN COURSE</th>
                                                    <th>COMMISSION</th>
                                                    <th>AREA1</th>
                                                    <th>AREA2</th>
                                                    <th>AREA3</th>
                                                    <th>AREA4</th>
                                                    <th>AREA5</th>
                                                    <th>AREA6</th>
                                                    <th>AREA7</th>
                                                    <th>AREA8</th>
                                                    <th>AREA9</th>
                                                    <th>AREA10</th>
                                                    <th>AREA11</th>
                                                    <th>AREA12</th>
                                                    <th>AREA13</th>
                                                    <th>FORM2</th>
                                                    <th>FORM3</th>
                                                    <th>PC</th>
                                                    <th>ADD</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><Select className="form-control" name="givenCourse"
                                                                options={givenCourseOptions}
                                                                onChange={handleGivenCourseSelect}
                                                                value={givenCourseOptions.filter(function (option) {
                                                                    return option.value === selectedGivenCourseOption;
                                                                })}
                                                    /></td>
                                                    <td><Select className="form-control" name="commission"
                                                                options={commissionOptions}
                                                                onChange={handleCommissionSelect}
                                                                value={commissionOptions.filter(function (option) {
                                                                    return option.value === selectedCommissionOption;
                                                                })}
                                                    /></td>
                                                    <td><input
                                                        type="checkbox"
                                                        value={formTrackingForm.area1}
                                                        checked={formTrackingForm.area1}
                                                        onChange={onChangeArea1}
                                                    /></td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area2}
                                                            checked={formTrackingForm.area2}
                                                            onChange={onChangeArea2}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area3}
                                                            checked={formTrackingForm.area3}
                                                            onChange={onChangeArea3}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area4}
                                                            checked={formTrackingForm.area4}
                                                            onChange={onChangeArea4}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area5}
                                                            checked={formTrackingForm.area5}
                                                            onChange={onChangeArea5}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area6}
                                                            checked={formTrackingForm.area6}
                                                            onChange={onChangeArea6}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area7}
                                                            checked={formTrackingForm.area7}
                                                            onChange={onChangeArea7}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area8}
                                                            checked={formTrackingForm.area8}
                                                            onChange={onChangeArea8}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area9}
                                                            checked={formTrackingForm.area9}
                                                            onChange={onChangeArea9}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area10}
                                                            checked={formTrackingForm.area10}
                                                            onChange={onChangeArea10}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area11}
                                                            checked={formTrackingForm.area11}
                                                            onChange={onChangeArea11}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area12}
                                                            checked={formTrackingForm.area12}
                                                            onChange={onChangeArea12}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.area13}
                                                            checked={formTrackingForm.area13}
                                                            onChange={onChangeArea13}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.form2}
                                                            checked={formTrackingForm.form2}
                                                            onChange={onChangeForm2}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.form3}
                                                            checked={formTrackingForm.form3}
                                                            onChange={onChangeForm3}
                                                        />
                                                    </td>
                                                    <td>
                                                        <input
                                                            type="checkbox"
                                                            value={formTrackingForm.pc}
                                                            checked={formTrackingForm.pc}
                                                            onChange={onChangePc}
                                                        />
                                                    </td>
                                                    <td>
                                                        <button className="btn btn-success"
                                                                onClick={() => addFormTracking()}>SAVE
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
                                    <th>GIVEN COURSE</th>
                                    <th>COMMISSION</th>
                                    <th>AREA1</th>
                                    <th>AREA2</th>
                                    <th>AREA3</th>
                                    <th>AREA4</th>
                                    <th>AREA5</th>
                                    <th>AREA6</th>
                                    <th>AREA7</th>
                                    <th>AREA8</th>
                                    <th>AREA9</th>
                                    <th>AREA10</th>
                                    <th>AREA11</th>
                                    <th>AREA12</th>
                                    <th>AREA13</th>
                                    <th>FORM2</th>
                                    <th>FORM3</th>
                                    <th>PC</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {formTrackings.map(formTracking => (
                                    <tr key={formTracking.id}>
                                        <td>{formTracking.id}</td>
                                        <td>{formTracking.givenCourse != null ? formTracking.givenCourse.course.name : null}</td>
                                        <td>{formTracking.commission != null ? (formTracking.commission.map(academician => academician.username + "\n")) : null}</td>
                                        <td>{formTracking.area1.toString()}</td>
                                        <td>{formTracking.area2.toString()}</td>
                                        <td>{formTracking.area3.toString()}</td>
                                        <td>{formTracking.area4.toString()}</td>
                                        <td>{formTracking.area5.toString()}</td>
                                        <td>{formTracking.area6.toString()}</td>
                                        <td>{formTracking.area7.toString()}</td>
                                        <td>{formTracking.area8.toString()}</td>
                                        <td>{formTracking.area9.toString()}</td>
                                        <td>{formTracking.area10.toString()}</td>
                                        <td>{formTracking.area11.toString()}</td>
                                        <td>{formTracking.area12.toString()}</td>
                                        <td>{formTracking.area13.toString()}</td>
                                        <td>{formTracking.form2.toString()}</td>
                                        <td>{formTracking.form3.toString()}</td>
                                        <td>{formTracking.pc.toString()}</td>
                                        <td>
                                            <button className="btn btn-danger"
                                                    onClick={() => onDelete(formTracking.id)}>DELETE
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary"
                                                    onClick={() => newUpdateForm(formTracking)}>UPDATE
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
                            <h1 id="id">{formTrackingForm.id}</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="givenCourse">Given Course</label>
                            <Select className="form-control" name="givenCourse"
                                    options={givenCourseOptions}
                                    onChange={handleGivenCourseSelect}
                                    value={givenCourseOptions.filter(function (option) {
                                        return option.value === selectedGivenCourseOption;
                                    })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="commission">Commission</label>
                            <Select className="form-control" name="commission"
                                    options={commissionOptions}
                                    onChange={handleCommissionSelect}
                                    value={commissionOptions.filter(function (option) {
                                        return option.value === selectedCommissionOption;
                                    })}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area1">Area1</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area1}
                                checked={formTrackingForm.area1}
                                onChange={onChangeArea1}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area2">Area2</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area2}
                                checked={formTrackingForm.area2}
                                onChange={onChangeArea2}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area3">Area3</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area3}
                                checked={formTrackingForm.area3}
                                onChange={onChangeArea3}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area4">Area4</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area4}
                                checked={formTrackingForm.area4}
                                onChange={onChangeArea4}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area5">Area5</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area5}
                                checked={formTrackingForm.area5}
                                onChange={onChangeArea5}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area6">Area6</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area6}
                                checked={formTrackingForm.area6}
                                onChange={onChangeArea6}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area7">Area7</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area7}
                                checked={formTrackingForm.area7}
                                onChange={onChangeArea7}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area8">Area8</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area8}
                                checked={formTrackingForm.area8}
                                onChange={onChangeArea8}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area9">Area9</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area9}
                                checked={formTrackingForm.area9}
                                onChange={onChangeArea9}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area10">Area10</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area10}
                                checked={formTrackingForm.area10}
                                onChange={onChangeArea10}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area11">Area11</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area11}
                                checked={formTrackingForm.area11}
                                onChange={onChangeArea11}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area12">Area12</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area12}
                                checked={formTrackingForm.area12}
                                onChange={onChangeArea12}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="area13">Area13</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.area13}
                                checked={formTrackingForm.area13}
                                onChange={onChangeArea13}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form2">Form2</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.form2}
                                checked={formTrackingForm.form2}
                                onChange={onChangeForm2}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="form3">Form3</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.form3}
                                checked={formTrackingForm.form3}
                                onChange={onChangeForm3}
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="pc">PC</label>
                            <input
                                type="checkbox"
                                value={formTrackingForm.pc}
                                checked={formTrackingForm.pc}
                                onChange={onChangePc}
                            />
                        </div>
                        <button onClick={updateFormTracking} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}

        </div>

    );
};
export default FormTrackingOperations;

