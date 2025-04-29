import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserDietaryRestrictionsCreate = () => {
    const navigate = useNavigate();
    const [userDietaryRestrictionsData, setUserDietaryRestrictionsData] = useState({
        user_preference_id: "",
        restriction_id: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDietaryRestrictionsData({...userDietaryRestrictionsData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        axios.post('http://127.0.0.1:8000/api/user_dietary_resctrictions', userDietaryRestrictionsData)
        .then(Response => {
            setSuccessMessage('user_dietary_resctrictions added successfully!');
            setTimeout(() => {
                navigate('/admin/user_dietary_restrictions');
            }, 1500); 
        })
        .catch(Error => {
            console.error('Error adding user_dietary_resctrictions:', Error);
            setError('Failed to add user_dietary_resctrictions. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New User Dietary Restriction</h1>
            <Link to="/admin/user_dietary_restrictions" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Preference ID:</label>
                            <input type="text"
                                name="user_preference_id"
                                value={userDietaryRestrictionsData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Restrictions ID:</label>
                            <input type="text"
                                name="restriction_id"
                                value={userDietaryRestrictionsData.restriction_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>

                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDietaryRestrictionsCreate;