import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('foods ID:', id);
    const [foodsData, setFoodsData] = useState({
        name: "",
        description: "",
        price: "",
        image_url: "",
        restaurant_id: "",
        cuisine_id: "",
    });

        const [error, setError] = useState(null);
        const [successMessage, setSuccessMessage] = useState(null);
        const [imageFile, setImageFile] = useState(null);

    const getFoods = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/foods/${id}`)
        .then(Response => {
            const { name, description, price, image_url, restaurant_id, cuisine_id  } = Response.data;
            setFoodsData({ name, description, price, image_url, restaurant_id, cuisine_id });
        })
        .catch(Error => {
            alert('Error fetching food details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getFoods();
    }, [getFoods]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFoodsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    // Handle file input change for image upload
    const handleFileChange = (event) => {
        setImageFile(event.target.files[0]);  
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);
    
        const formData = new FormData();

        console.log(formData);
        
        formData.append('name', foodsData.name);
        formData.append('description', foodsData.description);
        formData.append('price', foodsData.price);

        if (foodsData.restaurant_id !== "" && foodsData.restaurant_id !== null) {
            formData.append('restaurant_id', parseFloat(foodsData.restaurant_id)); 
        }
        if (foodsData.cuisine_id !== "" && foodsData.cuisine_id !== null) {
            formData.append('cuisine_id', parseInt(foodsData.cuisine_id)); 
        }
        
        if (imageFile) { 
            formData.append('image_url', imageFile);  
        }
        formData.forEach((value, key) => {
            console.log(key, value);  
        });
    
        axios.post(`http://127.0.0.1:8000/api/foods/${id}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
                'X-HTTP-Method-Override': 'PUT',  
            }
        })
        .then(response => {
            setSuccessMessage('foods updated successfully!');
            setTimeout(() => {
                navigate('/admin/foods');
            }, 1500);
        })
        .catch(error => {
            console.error('Error updating foods:', error.response ? error.response.data : error);
            setError('Failed to update foods. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Foods</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
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
                            <input type="text"
                                name="price"
                                value={foodsData.price}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Image:</label>
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
                        <button type="submit"
                            className="btn btn-primary">Update</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodsUpdate;
