import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserDislikedIngredientsIndex = () => {
    const [userDislikedIngredientsData, setUserDislikedIngredientsData] = useState([]);
    const loadDislikedIngredientsData = () => {
        axios.get('http://127.0.0.1:8000/api/user_disliked_ingredients')
        .then(Response => {
            setUserDislikedIngredientsData(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data userDislikedIngredientsData?')) {
            axios.delete(`http://127.0.0.1:8000/api/user_disliked_ingredients/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadDislikedIngredientsData();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadDislikedIngredientsData();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User Disliked Ingredients Data</h1>
            <Link to="/admin/user_disliked_ingredients/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Preference ID</th>
                                    <th>User Preference Name</th>
                                    <th>Ingredient ID</th>
                                    <th>Ingredient Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {userDislikedIngredientsData.map((userDislikedIngredientsData, index) => (
                                    <tr key={index}>
                                        <td>{userDislikedIngredientsData.id}</td>
                                        <td>{userDislikedIngredientsData.user_preference_id}</td>
                                        <td>{userDislikedIngredientsData.user_preference?.user?.name || '-'}</td>
                                        <td>{userDislikedIngredientsData.ingredient_id}</td>
                                        <td>{userDislikedIngredientsData.ingredient?.name}</td>
                                        <td>
                                            <Link to={`/admin/user_dietary_restrictions/update/${userDislikedIngredientsData.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(userDislikedIngredientsData.restaurant_id)}
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


export default UserDislikedIngredientsIndex;