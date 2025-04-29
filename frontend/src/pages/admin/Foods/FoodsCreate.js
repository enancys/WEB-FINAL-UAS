import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const FoodsCreate = () => {
    const navigate = useNavigate();
    const [foodsData, setFoodsData] = useState({
        name: "",
        description: "",
        price: null,
        image_url: "",
        restaurant_id: null,
        cuisine_id : null
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFoodsData({...foodsData, [name]: value});
    };
    // Untuk Gambar
    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);
    
        // Validate required fields
        if (!imageFile) {
            setError('Please select an image file');
            return;
        }
    
        const formData = new FormData();
        formData.append('name', foodsData.name);
        formData.append('description', foodsData.description);
        formData.append('price', foodsData.price);
        formData.append('restaurant_id', foodsData.restaurant_id);
        formData.append('cuisine_id', foodsData.cuisine_id);
        
        // Key fix: Append the file with the correct field name
        formData.append('image_url', imageFile);
    
        // Debug: Log FormData contents
        for (let [key, value] of formData.entries()) {
            console.log(key, value);
        }
    
        try {
            const response = await axios.post('http://127.0.0.1:8000/api/foods', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    // Add if you need authentication
                    // 'Authorization': `Bearer ${token}`
                }
            });
    
            setSuccessMessage('Food added successfully!');
            console.log('Full response:', response.data);
            setTimeout(() => navigate('/admin/foods'), 1500);
        } catch (error) {
            console.error('Error details:', error.response?.data || error.message);
            setError(error.response?.data?.message || 'Failed to add food. Please try again.');
        }
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New Foods</h1>
            <Link to="/admin/foods" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={foodsData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                name="description"
                                value={foodsData.description}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="number"
                                name="price"
                                value={foodsData.price}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Image Url:</label>
                            <input type="file"
                                name="image_url"
                                onChange={handleFileChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Restaurant ID:</label>
                            <input type="number"
                                name="restaurant_id"
                                value={foodsData.restaurant_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Cuisine ID:</label>
                            <input type="number"
                                name="cuisine_id"
                                value={foodsData.cuisine_id}
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

export default FoodsCreate;
