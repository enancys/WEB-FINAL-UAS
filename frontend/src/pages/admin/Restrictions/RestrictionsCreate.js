import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const RestrictionsCreate = () => {
    const navigate = useNavigate();
    const [restrictions, setRestrictionsData] = useState({
        name: ""
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRestrictionsData({...restrictions, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); 
        setSuccessMessage(null); 

        axios.post('http://127.0.0.1:8000/api/restrictions', restrictions)
        .then(Response => {
            setSuccessMessage('restrictions added successfully!');
            setTimeout(() => {
                navigate('/admin/restrictions');
            }, 1500); 
        })
        .catch(Error => {
            console.error('Error adding restrictions:', Error);
            setError('Failed to add restrictions. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New Restrictions Data</h1>
            <Link to="/admin/restrictions" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={restrictions.name}
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

export default RestrictionsCreate;