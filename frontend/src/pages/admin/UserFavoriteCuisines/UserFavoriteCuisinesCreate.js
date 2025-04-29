import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserFavoriteCuisinesCreate = () => {
    const navigate = useNavigate();
    const [userFavoriteCuisinesData, setUserFavoriteCuisinesData] = useState({
        user_preference_id: "",
        cuisine_id: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFavoriteCuisinesData({...userFavoriteCuisinesData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        axios.post('http://127.0.0.1:8000/api/user_favorite_cuisines', userFavoriteCuisinesData)
        .then(Response => {
            setSuccessMessage('user_favorite_cuisines added successfully!');
            setTimeout(() => {
                navigate('/admin/user_favorite_cuisines');
            }, 1500); 
        })
        .catch(Error => {
            console.error('Error adding user_favorite_cuisines:', Error);
            setError('Failed to add user_favorite_cuisines. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New User Favorite Cuisines</h1>
            <Link to="/admin/user_favorite_cuisines" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Preference ID:</label>
                            <input type="text"
                                name="user_preference_id"
                                value={userFavoriteCuisinesData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Cuisine ID:</label>
                            <input type="text"
                                name="cuisine_id"
                                value={userFavoriteCuisinesData.cuisine_id}
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

export default UserFavoriteCuisinesCreate;