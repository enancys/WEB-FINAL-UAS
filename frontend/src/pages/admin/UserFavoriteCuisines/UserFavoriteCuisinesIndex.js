import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserFavoriteCuisinesIndex = () => {
    const [userFavoriteCuisinesData, setUserFavoriteCuisinesData] = useState([]);
    const loadUserFavoriteCuisines = () => {
        axios.get('http://127.0.0.1:8000/api/user_favorite_cuisines')
        .then(Response => {
            setUserFavoriteCuisinesData(Response.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data userFavoriteCuisinesData?')) {
            axios.delete(`http://127.0.0.1:8000/api/user_favorite_cuisines/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadUserFavoriteCuisines();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadUserFavoriteCuisines();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User Favorite Cuisines Data</h1>
            <Link to="/admin/user_favorite_cuisines/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Preference ID</th>
                                    <th>User Preference Name</th>
                                    <th>Cuisine ID</th>
                                    <th>Cuisine Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>

                            <tbody>
                                {userFavoriteCuisinesData.map((userFavoriteCuisinesData, index) => (
                                    <tr key={index}>
                                        <td>{userFavoriteCuisinesData.id}</td>
                                        <td>{userFavoriteCuisinesData.user_preference_id}</td>
                                        <td>{userFavoriteCuisinesData.user_preference?.user?.name || '-'}</td>
                                        <td>{userFavoriteCuisinesData.cuisine_id}</td>
                                        <td>{userFavoriteCuisinesData.cuisine?.name}</td>
                                        <td>
                                            <Link to={`/admin/user_favorite_cuisines/update/${userFavoriteCuisinesData.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(userFavoriteCuisinesData.restaurant_id)}
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


export default UserFavoriteCuisinesIndex;