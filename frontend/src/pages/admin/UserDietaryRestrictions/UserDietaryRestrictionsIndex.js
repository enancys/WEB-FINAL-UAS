import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDietaryRestrictionsIndex = () => {
    const [userDietaryRestrictionsData, setUserDietaryRestrictionsData] = useState([]);
    const loadUserDietaryRestrictions = () => {
        axios.get('http://127.0.0.1:8000/api/user_dietary_resctrictions')
        .then(Response => {
            setUserDietaryRestrictionsData(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data userDietaryRestrictionsData?')) {
            axios.delete(`http://127.0.0.1:8000/api/user_dietary_resctrictions/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadUserDietaryRestrictions();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadUserDietaryRestrictions();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User Dietary Restrictions Data</h1>
            <Link to="/admin/user_dietary_restrictions/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Preference ID</th>
                                    <th>User Preference Name</th>
                                    <th>Restriction ID</th>
                                    <th>Restriction Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDietaryRestrictionsData.map((userDietaryRestrictionsData, index) => (
                                    <tr key={index}>
                                        <td>{userDietaryRestrictionsData.id}</td>
                                        <td>{userDietaryRestrictionsData.user_preference_id}</td>
                                        <td>{userDietaryRestrictionsData.user_preference?.user?.name || '-'}</td>
                                        <td>{userDietaryRestrictionsData.restriction_id}</td>
                                        <td>{userDietaryRestrictionsData.restriction?.name}</td>
                                        <td>
                                            <Link to={`/admin/user_dietary_restrictions/update/${userDietaryRestrictionsData.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(userDietaryRestrictionsData.restaurant_id)}
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


export default UserDietaryRestrictionsIndex;