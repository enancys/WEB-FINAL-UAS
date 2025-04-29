import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RestrictionsIndex = () => {
    const [restrictions, setRestrictionsData] = useState([]);
    const loadRestrictionsData = () => {
        axios.get('http://127.0.0.1:8000/api/restrictions')
        .then(Response => {
            setRestrictionsData(Response.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data restrictions?')) {
            axios.delete(`http://127.0.0.1:8000/api/restrictions/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadRestrictionsData();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadRestrictionsData();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">restrictions Data</h1>
            <Link to="/admin/restrictions/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restrictions.map((restriction, index) => (
                                    <tr key={index}>
                                        <td>{restriction.id}</td>
                                        <td>{restriction.name}</td>
                                        <td>
                                            <Link to={`/admin/restrictions/update/${restriction.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(restriction.restaurant_id)}
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


export default RestrictionsIndex;