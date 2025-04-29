import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserFavoriteCuisinesUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Restaurant ID:', id);
    const [userFavoriteCuisinesData, setUserFavoriteCuisinesData] = useState({
        user_preference_id: "",
        cuisine_id: "",
    });

    const getUserFavoriteCuisinesData = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_favorite_cuisines/${id}`)
        .then(Response => {
            const { user_preference_id, cuisine_id } = Response.data;
            setUserFavoriteCuisinesData({ user_preference_id, cuisine_id });
        })
        .catch(Error => {
            alert('Error fetching user_favorite_cuisines details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getUserFavoriteCuisinesData();
    }, [getUserFavoriteCuisinesData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFavoriteCuisinesData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_favorite_cuisines/${id}`, userFavoriteCuisinesData)
        .then(Response => {
            alert('user_favorite_cuisines updated successfully: ', Response.data);
            navigate('/admin/user_favorite_cuisines');
        })
        .catch(Error => {
            console.error('Error updating user_favorite_cuisines: ', Error);
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
                                value={userFavoriteCuisinesData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Cuisine ID:</label>
                            <input type="text"
                                name="cuisine_id"
                                value={userFavoriteCuisinesData.cuisine_id}
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

export default UserFavoriteCuisinesUpdate;