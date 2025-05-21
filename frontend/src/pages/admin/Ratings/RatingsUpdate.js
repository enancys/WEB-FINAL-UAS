import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RatingsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Ratings ID:', id);
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

    const getRatings = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/ratings/${id}`)
        .then(Response => {
            const { user_id, food_id, restaurant_id, rating, review , image_url} = Response.data.data;
            setRatingsData({ user_id, food_id, restaurant_id, rating, review, image_url });
        })
        .catch(Error => {
            alert('Error fetching ratings details: ', Error);
        });
    }, [id]);

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

    useEffect(() => {
        getRatings();
    }, [getRatings]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRatingsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

        // Untuk Gambar
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
        
            axios.post(`http://127.0.0.1:8000/api/ratings/${id}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'X-HTTP-Method-Override': 'PUT',  
                }
            })
            .then(response => {
                setSuccessMessage('Ratings updated successfully!');
                setTimeout(() => {
                    navigate('/admin/ratings');
                }, 1500);
            })
            .catch(error => {
                console.error('Error updating ratings:', error.response ? error.Response.data.data : error);
                setError('Failed to update ratings. Please check the form data and try again.');
            });
        };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Book</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
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
                                value={ratingsData.rating}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Review:</label>
                            <input type="text"
                                name="review"
                                onChange={handleInputChange}
                                value={ratingsData.review}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Image Url:</label>
                            {ratingsData.image_url && (
                                <div className="mb-3">
                                    <label>Current Image:</label><br />
                                    <img
                                        src={`http://localhost:8000${ratingsData.image_url}`}
                                        alt="Current"
                                        style={{ maxWidth: '200px', height: 'auto' }}
                                    />
                                </div>
                            )}

                            <input type="file"
                                name="image_url"
                                onChange={handleFileChange}
                                className="form-control"
                            />
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

export default RatingsUpdate;