import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const RestaurantsCreate = () => {
    const navigate = useNavigate();
    const [restaurantsData, setRestaurantsData] = useState({
        name: "",
        location: "",
        phone: "",
        website_url: "",
        opening_hours: "",
        cuisine_id : null,
        rating: null,
        description: "",
        image_url: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRestaurantsData({...restaurantsData, [name]: value});
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
    
        formData.append('name', restaurantsData.name);
        formData.append('location', restaurantsData.location);
        formData.append('phone', restaurantsData.phone);
        formData.append('website_url', restaurantsData.website_url);
        formData.append('opening_hours', restaurantsData.opening_hours);
    
        if (restaurantsData.cuisine_id !== "" && restaurantsData.cuisine_id !== null) {
            formData.append('cuisine_id', parseInt(restaurantsData.cuisine_id)); 
        }
    
        if (restaurantsData.rating !== "" && restaurantsData.rating !== null) {
            formData.append('rating', parseFloat(restaurantsData.rating)); 
        }
    
        if (restaurantsData.description) {
            formData.append('description', restaurantsData.description);
        }
    
        if (imageFile) { 
            formData.append('image_url', imageFile);
        }
    
        axios.post('http://127.0.0.1:8000/api/restaurants', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
        .then(response => {
            setSuccessMessage('Restaurants added successfully!');
            setTimeout(() => {
                navigate('/admin/restaurants');
            }, 1500);
        })
        .catch(error => {
            console.error('Error adding restaurants:', error.response ? error.response.data : error);
            setError('Failed to add restaurants. Please check the form data and try again.');
        });
    };
    

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New restaurants</h1>
            <Link to="/admin/restaurants" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={restaurantsData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text"
                                name="location"
                                value={restaurantsData.location}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text"
                                name="phone"
                                value={restaurantsData.phone}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Website Url:</label>
                            <input type="text"
                                name="website_url"
                                value={restaurantsData.website_url}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Opeing Hours:</label>
                            <input type="text"
                                name="opening_hours"
                                value={restaurantsData.opening_hours}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Cuisines_ID:</label>
                            <input type="number"
                                name="cuisine_id"
                                value={restaurantsData.cuisine_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Rating:</label>
                            <input type="number" step="0.01"
                                name="rating"
                                value={restaurantsData.rating}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>description:</label>
                            <input type="text"
                                name="description"
                                value={restaurantsData.description}
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
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RestaurantsCreate;