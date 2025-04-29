import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const FoodTagsCreate = () => {
    const navigate = useNavigate();
    const [foodTagsData, setFoodTagsData] = useState({
        food_id: "",
        tag_id: "",

    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFoodTagsData({...foodTagsData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null); 

        axios.post('http://127.0.0.1:8000/api/food_tags', foodTagsData)
        .then(Response => {
            setSuccessMessage('User added successfully!');
            setTimeout(() => {
                navigate('/admin/food_tags');
            }, 1500); 
        })
        .catch(Error => {
            console.error('Error adding food_tags:', Error);
            setError('Failed to add food_tags. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New food_tags</h1>
            <Link to="/admin/food_tags" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Food ID:</label>
                            <input type="text"
                                name="food_id"
                                value={foodTagsData.food_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Tag ID:</label>
                            <input type="text"
                                name="tag_id"
                                value={foodTagsData.tag_id}
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

export default FoodTagsCreate;