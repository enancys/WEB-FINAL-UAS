import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserDislikedIngredientsCreate = () => {
    const navigate = useNavigate();
    const [userDislikedIngredientsData, setUserDislikedIngredientsData] = useState({
        user_preference_id: "",
        ingredient_id: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDislikedIngredientsData({...userDislikedIngredientsData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        axios.post('http://127.0.0.1:8000/api/user_disliked_ingredients', userDislikedIngredientsData)
        .then(Response => {
            setSuccessMessage('user_disliked_ingredients added successfully!');
            setTimeout(() => {
                navigate('/admin/user_disliked_ingredients');
            }, 1500); 
        })
        .catch(Error => {
            console.error('Error adding user_disliked_ingredients:', Error);
            setError('Failed to add user_disliked_ingredients. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New Tags</h1>
            <Link to="/admin/user_disliked_ingredients" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Preference ID:</label>
                            <input type="text"
                                name="user_preference_id"
                                value={userDislikedIngredientsData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Ingredient ID:</label>
                            <input type="text"
                                name="ingredient_id"
                                value={userDislikedIngredientsData.ingredient_id}
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

export default UserDislikedIngredientsCreate;