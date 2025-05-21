import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoriesUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    console.log('categories ID:', id);
    const [categoriesData, setCategoriesData] = useState({
        name: "",
    });

    const getCategories = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/categories/${id}`)
        .then(Response => {
            const { name } = Response.data.data;
            setCategoriesData({ name });
        })
        .catch(Error => {
            alert('Error fetching categories details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getCategories();
    }, [getCategories]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoriesData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        axios.put(`http://127.0.0.1:8000/api/categories/${id}`, categoriesData)
        .then(Response => {
            setSuccessMessage('categories added successfully!');
            setTimeout(() => {
                navigate('/admin/categories');
            }, 1500); 
        })
        .catch(Error => {
            console.error('Error updating categories: ', Error);
            setError('Failed to update categories. Please check the form data and try again.');
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-4">Edit Book</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={categoriesData.name}
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

export default CategoriesUpdate;