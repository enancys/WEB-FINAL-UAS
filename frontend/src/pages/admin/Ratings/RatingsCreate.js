import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const RatingsCreate = () => {
    const navigate = useNavigate();
    const [ratingsData, setRatingsData] = useState({
        user_id: "",
        food_id: "",
        restaurant_id: "",
        rating: "",
        review: "",
        image_url: ""
    });
    const [users, setUsers] = useState([]);
    const [foods, setFoods] = useState([]);
    const [restaurants, setRestaurants] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRatingsData({...ratingsData, [name]: value});
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/users')
            .then(
                (resUsers) => {
                    setUsers(resUsers.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat Data User: ', error);
                }
            );
        axios.get('http://127.0.0.1:8000/api/foods')
            .then(
                (resFoods) => {
                    setFoods(resFoods.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat data foods: ', error);
                }
            );
        axios.get('http://127.0.0.1:8000/api/restaurants')
            .then(
                (resRest) => {
                    setRestaurants(resRest.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat data restaurant: ', error);
                }
            );
    }, []);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        const formData = new FormData();
    
        formData.append('user_id', ratingsData.user_id);
        formData.append('food_id', ratingsData.food_id);
        formData.append('restaurant_id', ratingsData.restaurant_id);
        formData.append('rating', ratingsData.rating);
        formData.append('review', ratingsData.review);

        if (imageFile) { 
            formData.append('image_url', imageFile);
        }
        axios.post('http://127.0.0.1:8000/api/ratings', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })

        .then(() => {
            setSuccessMessage('ratings added successfully!');
            setTimeout(response => {
                navigate('/admin/ratings');
            }, 1500);
        })
        .catch(error => {
            console.error('Error adding ratings:', error.response ? error.response.data.data : error);
            setError('Failed to add ratings. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New ratings</h1>
            <Link to="/admin/ratings" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                                <label>User: </label>
                                <select 
                                    name="user_id"
                                    value={ratingsData.user_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih User</option>
                                        {users.map(user => 
                                            (
                                                <option key={user.id}
                                                    value={user.id}>{user.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Food: </label>
                                <select 
                                    name="food_id"
                                    value={ratingsData.food_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Food</option>
                                        {foods.map(food => 
                                            (
                                                <option key={food.id}
                                                    value={food.id}>{food.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Restaurant: </label>
                                <select 
                                    name="restaurant_id"
                                    value={ratingsData.restaurant_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Restaurant</option>
                                        {restaurants.map(restaurant => 
                                            (
                                                <option key={restaurant.id}
                                                    value={restaurant.id}>{restaurant.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                        <div className="form-group">
                            <label>Rating:</label>
                            <input type="text"
                                name="rating"
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Review:</label>
                            <input type="text"
                                name="review"
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Image Url:</label>
                            <input type="file"
                                name="image_url"
                                onChange={handleFileChange}
                                className="form-control"
                                required/>
                        </div>
                        <button 
                            type="submit" 
                            className="btn btn-success">
                            Submit
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RatingsCreate;