import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CuisinesUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Cuisines ID:', id);
    const [cuisinesData, setCuisinesData] = useState({
        name: "",
        description: "",
    });

    const getCuisines = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/cuisines/${id}`)
        .then(Response => {
            const { name, description } = Response.data.data;
            setCuisinesData({ name, description });
        })
        .catch(Error => {
            alert('Error fetching cuisines details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getCuisines();
    }, [getCuisines]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCuisinesData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/cuisines/${id}`, cuisinesData)
        .then(Response => {
            alert('cuisines updated successfully: ', Response.data.data);
            navigate('/admin/cuisines');
        })
        .catch(Error => {
            console.error('Error updating cuisines: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Cuisines</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={cuisinesData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Description:</label>
                            <input type="text"
                                name="description"
                                value={cuisinesData.description}
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

export default CuisinesUpdate;