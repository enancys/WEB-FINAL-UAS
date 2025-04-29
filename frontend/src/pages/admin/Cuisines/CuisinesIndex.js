import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CuisinesIndex = () => {
    const [cuisines, setCuisines] = useState([]);
    const loadCuisines = () => {
        axios.get('http://127.0.0.1:8000/api/cuisines')
        .then(Response => {
            setCuisines(Response.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data cuisines?')) {
            axios.delete(`http://127.0.0.1:8000/api/cuisines/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadCuisines();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadCuisines();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">Cuisines Data</h1>
            <Link to="/admin/cuisines/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuisines.map((cuisiness, index) => (
                                    <tr key={index}>
                                        <td>{cuisiness.id}</td>
                                        <td>{cuisiness.name}</td>
                                        <td>{cuisiness.description}</td>
                                        <td>
                                            <Link to={`/admin/cuisines/update/${cuisiness.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(cuisiness.id)}
                                                className="btn btn-sm btn-danger ml-1">Delete</button>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};


export default CuisinesIndex;