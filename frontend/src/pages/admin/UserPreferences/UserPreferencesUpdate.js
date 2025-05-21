import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserPreferencesUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('user_preferences ID:', id);
    const [user_preferencesData, setUser_preferences] = useState({
        user_id: "",
        favorite_categories: "",
        disliked_ingredients: "",
        dietary_restrictions: "",
    });

    const getUser_preferences = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_preferences/${id}`)
        .then(Response => {
            const { name, user_id, favorite_categories, disliked_ingredients, dietary_restrictions, favorite_cuisines} = Response.data.data;
            setUser_preferences({ name, user_id, favorite_categories, disliked_ingredients, dietary_restrictions, favorite_cuisines});
        })
        .catch(Error => {
            alert('Error fetching user_preferences details: ', Error);
        });
    }, [id]);
    
    useEffect(() => {
        getUser_preferences();
    }, [getUser_preferences]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUser_preferences(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_preferences/${id}`, user_preferencesData)
        .then(Response => {
            alert('user_preferences updated successfully: ', Response.data.data);
            navigate('/admin/user_preferences');
        })
        .catch(Error => {
            console.error('Error updating user_preferences: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit User_Preferences</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User_ID:</label>
                            <input type="text"
                                name="user_id"
                                value={user_preferencesData.user_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>favorite_categories:</label>
                            <input type="text"
                                name="favorite_categories"
                                value={user_preferencesData.favorite_categories}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>disliked_ingredients:</label>
                            <input type="text"
                                name="disliked_ingredients"
                                value={user_preferencesData.disliked_ingredients}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>dietary_restrictions:</label>
                            <input type="text"
                                name="dietary_restrictions"
                                value={user_preferencesData.dietary_restrictions}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Favorite_cuisines:</label>
                            <input type="text"
                                name="favorite_cuisines"
                                value={user_preferencesData.favorite_cuisines}
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

export default UserPreferencesUpdate;