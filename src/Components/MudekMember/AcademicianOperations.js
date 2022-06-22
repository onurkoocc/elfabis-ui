import React, {useState, useEffect} from "react";
import AcademicianService from "../../Services/academician.service";
import RoleService from "../../Services/role.service";
import Select from 'react-select';

const AcademicianOperations = () => {
    const [users, setUsers] = useState([]);
    const [roles, setRoles] = useState([]);
    const [errors, setErrors] = useState("");
    const [updatePage, setUpdatePage] = useState(false);
    const [addPage, setAddPage] = useState(false);
    const [selectedRoleOption, setSelectedRoleOption] = useState("none");
    const userTmp = {
        id: "",
        username: "",
        email: "",
        role: "",
        name: "",
        title: "",
        abd: "",
        abbr: "",
    };
    const [userForm, setUserForm] = useState(userTmp);

    useEffect(() => {
        AcademicianService.getAllAcademicians().then(
            (data) => {
                setUsers(data);
            },
            (error) => {
                const errors =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrors(errors);
            }
        );
    }, [updatePage]);

    useEffect(() => {
        RoleService.getAllRoles().then(
            (data) => {
                setRoles(data);
            },
            (error) => {
                const errors =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrors(errors);
            }
        );
    }, [updatePage, addPage]);

    const onDelete = (userId) => {
        AcademicianService.deleteAcademician(userId).then(
            () => {
                window.location.reload();
            },
            (error) => {
                const errors =
                    (error.response &&
                        error.response.data &&
                        error.response.data.message) ||
                    error.message ||
                    error.toString();

                setErrors(errors);
            }
        );
    };


    const onChangeName = event => {
        setUserForm({...userForm, name: event.target.value})
    }
    const onChangeUsername = event => {
        setUserForm({...userForm, username: event.target.value})
    }
    const onChangeRole = event => {
        setUserForm({...userForm, role: event.target.value})
    }
    const onChangeEmail = event => {
        setUserForm({...userForm, email: event.target.value})
    }
    const onChangeTitle = event => {
        setUserForm({...userForm, title: event.target.value})
    }
    const onChangeAbbr = event => {
        setUserForm({...userForm, abbr: event.target.value})
    }
    const onChangeAbd = event => {
        setUserForm({...userForm, abd: event.target.value})
    }

    const addAcademician = () => {
        AcademicianService.addAcademician(userForm.username, userForm.email, userForm.role, userForm.name, userForm.title, userForm.abd, userForm.abbr)
            .then(data => {
                setUserForm(userTmp);
                setAddPage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };

    const updateAcademician = () => {

        AcademicianService.updateAcademician(userForm.id, userForm.username, userForm.email, userForm.role, userForm.name, userForm.title, userForm.abd, userForm.abbr)
            .then(data => {
                setUserForm(userTmp);
                setUpdatePage(false);
                console.log(data);
            })
            .catch(e => {
                console.log(e);
            });
    };
    const newUpdateForm = (user) => {
        setUserForm(userTmp);
        setUserForm({
            ...userForm,
            id: user.id,
            username: user.username,
            email: user.email,
            role: user.role.name,
            name: user.name,
            title: user.title,
            abd: user.abd,
            abbr: user.abbr,
        });
        setUpdatePage(true);
    };

    const newAddForm = () => {
        setUserForm(userTmp);
        setAddPage(true);
    };

    const roleOptions = [];
    roles.map((role) => roleOptions.push({value: role.id, label: role.name}));
    const handleRoleSelect = e => {
        setSelectedRoleOption(e.value);
        setUserForm({...userForm, role: {id: e.value, name: e.label}});
    };

    return (
        <div className="container">

            {!updatePage ? (
                    <div className="card">
                        <h3 className="card-header text-center">Users</h3>
                        <div className="list-group-flush">
                            {errors}
                            <div className="text-right">
                                <button onClick={newAddForm} className="btn btn-success">
                                    Add Academician
                                </button>
                            </div>
                            {addPage &&
                                <div className="card">
                                    <div className="list-group-flush">
                                        <form>
                                            <table className="table">
                                                <thead>
                                                <tr>
                                                    <th>TITLE</th>
                                                    <th>NAME</th>
                                                    <th>USERNAME</th>
                                                    <th>EMAİL</th>
                                                    <th>ROLE</th>
                                                    <th>ABD</th>
                                                    <th>ABBR</th>
                                                    <th>ADD</th>
                                                </tr>
                                                </thead>
                                                <tbody>
                                                <tr>
                                                    <td><input className="form-control input-sm" value={userForm.title}
                                                               onChange={onChangeTitle}/></td>
                                                    <td><input className="form-control input-sm" value={userForm.name}
                                                               onChange={onChangeName}/></td>
                                                    <td><input className="form-control input-sm" value={userForm.username}
                                                               onChange={onChangeUsername}/></td>
                                                    <td><input className="form-control input-sm" value={userForm.email}
                                                               onChange={onChangeEmail}/></td>
                                                    <td><Select className="form-control" name="role"
                                                                options={roleOptions}
                                                                onChange={handleRoleSelect}
                                                                value={roleOptions.filter(function (option) {
                                                                    return option.value === selectedRoleOption;
                                                                })}
                                                    /></td>
                                                    <td><input className="form-control input-sm" value={userForm.abd}
                                                               onChange={onChangeAbd}/></td>
                                                    <td><input className="form-control input-sm" value={userForm.abbr}
                                                               onChange={onChangeAbbr}/></td>
                                                    <td>
                                                        <button className="btn btn-success"
                                                                onClick={() => addAcademician()}>SAVE
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
                                    <th>TITLE</th>
                                    <th>NAME</th>
                                    <th>USERNAME</th>
                                    <th>EMAİL</th>
                                    <th>ROLE</th>
                                    <th>ABD</th>
                                    <th>ABBR</th>
                                    <th>DELETE</th>
                                    <th>UPDATE</th>
                                </tr>
                                </thead>
                                <tbody>
                                {users.map(user => (
                                    <tr key={user.id}>
                                        <td>{user.id}</td>
                                        <td>{user.title}</td>
                                        <td>{user.name}</td>
                                        <td>{user.username}</td>
                                        <td>{user.email}</td>
                                        <td>{user.role.name}</td>
                                        <td>{user.abd}</td>
                                        <td>{user.abbr}</td>
                                        <td>
                                            <button className="btn btn-danger" onClick={() => onDelete(user.id)}>DELETE
                                            </button>
                                        </td>
                                        <td>
                                            <button className="btn btn-primary" onClick={() => newUpdateForm(user)}>UPDATE
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
                            <h1 id="id">{userForm.id}</h1>
                        </div>
                        <div className="form-group">
                            <label htmlFor="title">Title</label>
                            <input
                                type="text"
                                className="form-control"
                                id="title"
                                required
                                value={userForm.title}
                                onChange={onChangeTitle}
                                name="title"
                            />
                        </div>
                        <div className="form-group">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                className="form-control"
                                id="name"
                                required
                                value={userForm.name}
                                onChange={onChangeName}
                                name="name"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="username">Username</label>
                            <input
                                type="text"
                                className="form-control"
                                id="surname"
                                required
                                value={userForm.username}
                                onChange={onChangeUsername}
                                name="username"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="email">E-mail</label>
                            <input
                                type="text"
                                className="form-control"
                                id="email"
                                required
                                value={userForm.email}
                                onChange={onChangeEmail}
                                name="email"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="role">Role</label>
                            <Select className="form-control" name="role"
                                    options={roleOptions}
                                    onChange={handleRoleSelect}
                                    value={roleOptions.filter(function (option) {
                                        return option.value === selectedRoleOption;
                                    })}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="abd">ABD</label>
                            <input
                                type="text"
                                className="form-control"
                                id="abd"
                                required
                                value={userForm.abd}
                                onChange={onChangeAbd}
                                name="abd"
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="abbr">ABBR</label>
                            <input
                                type="text"
                                className="form-control"
                                id="abbr"
                                required
                                value={userForm.abbr}
                                onChange={onChangeAbbr}
                                name="abbr"
                            />
                        </div>


                        <button onClick={() => updateAcademician()} className="btn btn-success">
                            Save
                        </button>
                    </div>
                )}

        </div>

    );
};
export default AcademicianOperations;

