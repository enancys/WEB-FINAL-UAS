import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserFavoriteIngredientsIndex = () => {

    const [UserFavoriteIngredientsData, setUserFavoriteIngredientsData] = useState([]);
    const loadUserFavoriteIngredientData = () => {

        axios.get('http://127.0.0.1:8000/api/user_favorite_ingredients')
        .then(Response => {
            setUserFavoriteIngredientsData(Response.data);
        })
        .catch(Error => {
            alert('Eror Fetchting Data: ',Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data?')) {
            axios.delete(`http://127.0.0.1:8000/api/user_favorite_ingredients/${id}`)
            .then(() => {
                alert('Data deleted Successfully');
                loadUserFavoriteIngredientData();
            })
            .catch(Error => {
                alert('Error Deleting the data: ', Error);
            });
        } 
    };

    useEffect(() => {
        loadUserFavoriteIngredientData();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User Favorite Ingredients Data</h1>
            <Link to="/admin/user_favorite_ingredients/create" className="btn btn-primary mb-2">Create</Link>

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
                                {UserFavoriteIngredientsData.map((userFavoriteIngredient, index) => (
                                    <tr key={index}>
                                        <td>{userFavoriteIngredient.id}</td>
                                        <td>{userFavoriteIngredient.user_preference_id}</td>
                                        <td>{userFavoriteIngredient.user_preference?.user?.name || '-'}</td>
                                        <td>{userFavoriteIngredient.ingredient_id}</td>
                                        <td>{userFavoriteIngredient.ingredient?.name}</td>
                                        <td>
                                            <Link to={`/admin/user_favorite_ingredients/update/${userFavoriteIngredient.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(userFavoriteIngredient.restaurant_id)}
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

export default UserFavoriteIngredientsIndex;