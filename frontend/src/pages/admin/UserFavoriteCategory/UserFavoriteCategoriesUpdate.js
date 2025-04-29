import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const UserUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('User ID:', id);
    const [userData, setUserData] = useState({
        user_preference_id: "",
        category_id: "",
    });

    const getUser = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/user_favorite_category/${id}`)
        .then(Response => {
            const { user_preference_id, category_id } = Response.data;
            setUserData({ user_preference_id, category_id });
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
        axios.put(`http://127.0.0.1:8000/api/user_favorite_category/${id}`, userData)
        .then(Response => {
            alert('User updated successfully: ', Response.data);
            navigate('/admin/user_favorite_categories');
        })
        .catch(Error => {
            console.error('Error updating user: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Favorite Categories</h1>
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
                            <label>Categories ID:</label>
                            <input type="text"
                                name="category_id"
                                value={userData.category_id}
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

export default UserUpdate;