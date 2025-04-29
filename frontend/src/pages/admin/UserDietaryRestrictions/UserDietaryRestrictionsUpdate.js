import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDietaryRestrictionsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Restaurant ID:', id);
    const [userDietaryRestrictionsData, setUserDietaryRestrictionsData] = useState({
        user_preference_id: "",
        restriction_id: "",
    });

    const getUserDietaryRestrictions = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_dietary_resctrictions/${id}`)
        .then(Response => {
            const { user_preference_id, restriction_id } = Response.data;
            setUserDietaryRestrictionsData({ user_preference_id, restriction_id });
        })
        .catch(Error => {
            alert('Error fetching user_dietary_resctrictions details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getUserDietaryRestrictions();
    }, [getUserDietaryRestrictions]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDietaryRestrictionsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_dietary_resctrictions/${id}`, userDietaryRestrictionsData)
        .then(Response => {
            alert('user_dietary_resctrictions updated successfully: ', Response.data);
            navigate('/admin/user_dietary_restrictions');
        })
        .catch(Error => {
            console.error('Error updating user_dietary_resctrictions: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Book</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Preference ID:</label>
                            <input type="text"
                                name="user_preference_id"
                                value={userDietaryRestrictionsData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text"
                                name="restriction_id"
                                value={userDietaryRestrictionsData.restriction_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <button type="submit"
                            className="btn btn-primary">Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default UserDietaryRestrictionsUpdate;