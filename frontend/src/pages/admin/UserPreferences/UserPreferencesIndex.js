import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserPreferencesIndex = () => {
    const [user_preferences, setUser_preferences] = useState([]);
    const loadUser_preferences = () => {
        axios.get('http://127.0.0.1:8000/api/user_preferences')
        .then(Response => {
            setUser_preferences(Response.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data user_preferences?')) {
            axios.delete(`http://127.0.0.1:8000/api/user_preferences/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadUser_preferences();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadUser_preferences();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User_preferences Data</h1>
            <Link to="/admin/user_preferences/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User_ID</th>
                                    <th>User Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user_preferences.map((user_preferencess, index) => (
                                    <tr key={index}>
                                        <td>{user_preferencess.id}</td>
                                        <td>{user_preferencess.user?.id}</td>
                                        <td>{user_preferencess.user?.name}</td>

                                        <td>
                                            <Link to={`/admin/user_preferences/update/${user_preferencess.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(user_preferencess.id)}
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


export default UserPreferencesIndex;