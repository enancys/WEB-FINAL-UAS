import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserFavoriteIngredientsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('User fav:', id);
    const [userData, setUserData] = useState({
        user_preference_id: "",
        ingredient_id: "",
    });

    const getUser = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_favorite_ingredients/${id}`)
        .then(Response => {
            const { user_preference_id, ingredient_id } = Response.data;
            setUserData({ user_preference_id, ingredient_id });
        })
        .catch(Error => {
            alert('Error fetching user details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getUser();
    }, [getUser]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_favorite_ingredients/${id}`, userData)
        .then(Response => {
            alert('Data updated successfully: ', Response.data);
            navigate('/admin/user_favorite_ingredients');
        })
        .catch(Error => {
            console.error('Error updating user: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Users</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>User Preference ID:</label>
                            <input type="text"
                                name="user_preference_id"
                                value={userData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Ingredient ID:</label>
                            <input type="text"
                                name="ingredient_id"
                                value={userData.ingredient_id}
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

export default UserFavoriteIngredientsUpdate;