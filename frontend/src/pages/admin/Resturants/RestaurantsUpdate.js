import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Restaurant ID:', id);
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
    
    const getRestaurants = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurants/${id}`)
        .then(Response => {
            const { name, location, phone, website_url, opening_hours, cuisine_id, rating, description,  image_url } = Response.data;
            setRestaurantsData({ name, location, phone, website_url, opening_hours, cuisine_id, rating, description, image_url });
        })
        .catch(Error => {
            alert('Error fetching restaurants details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getRestaurants();
    }, [getRestaurants]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRestaurantsData(prevState => ({
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
    
        axios.post(`http://127.0.0.1:8000/api/restaurants/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT',  
            }
        })
        .then(response => {
            setSuccessMessage('Restaurant updated successfully!');
            setTimeout(() => {
                navigate('/admin/restaurants');
            }, 1500);
        })
        .catch(error => {
            console.error('Error updating restaurants:', error.response ? error.response.data : error);
            setError('Failed to update restaurants. Please check the form data and try again.');
        });
    };
    

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Book</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
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
                        <button type="submit"
                            className="btn btn-primary">Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default RestaurantsUpdate;