import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserDislikedIngredientsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Restaurant ID:', id);
    const [userDislikedIngredientsData, setUserDislikedIngredientsData] = useState({
        user_preference_id: "",
        ingredient_id: "",
    });

    const getUserDislikedIngredientsData = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_disliked_ingredients/${id}`)
        .then(Response => {
            const { user_preference_id, ingredient_id } = Response.data.data;
            setUserDislikedIngredientsData({ user_preference_id, ingredient_id });
        })
        .catch(Error => {
            alert('Error fetching user_disliked_ingredients details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getUserDislikedIngredientsData();
    }, [getUserDislikedIngredientsData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserDislikedIngredientsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/user_disliked_ingredients/${id}`, userDislikedIngredientsData)
        .then(Response => {
            alert('user_disliked_ingredients updated successfully: ', Response.data.data);
            navigate('/admin/user_disliked_ingredients');
        })
        .catch(Error => {
            console.error('Error updating user_disliked_ingredients: ', Error);
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
                                value={userDislikedIngredientsData.user_preference_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text"
                                name="ingredient_id"
                                value={userDislikedIngredientsData.ingredient_id}
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

export default UserDislikedIngredientsUpdate;