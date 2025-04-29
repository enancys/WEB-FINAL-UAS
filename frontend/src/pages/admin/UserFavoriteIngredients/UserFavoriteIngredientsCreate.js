import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const UserFavoriteIngredientsCreate = () => {
    const navigate = useNavigate();
    const [favIngredientsData, setFavCategoriesData] = useState({
        user_preference_id: "",
        ingredient_id: "",
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFavCategoriesData({...favIngredientsData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        axios.post('http://127.0.0.1:8000/api/user_favorite_ingredients', favIngredientsData)
        .then(Response => {
            setSuccessMessage('fav_category_ingredients added successfully!');
            setTimeout(() => {
                navigate('/admin/user_favorite_ingredients');
            }, 1500);
        })
        .catch(error => {
            console.error('Error adding favorite category:', error.response || error.message);
            setError('Failed to add favorite category. Please check the form data and try again.');
        });        
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New fav_category_ingredients</h1>
            <Link to="/admin/user_favorite_ingredients" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Preferenes ID:</label>
                            <input type="text"
                                name="user_preference_id"
                                value={favIngredientsData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Ingredient ID:</label>
                            <input type="text"
                                name="ingredient_id"
                                value={favIngredientsData.ingredient_id}
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

export default UserFavoriteIngredientsCreate;