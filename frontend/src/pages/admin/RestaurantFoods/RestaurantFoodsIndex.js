import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantFoodsIndex = () => {
    const [restaurant_foods, setRestaurant_foods] = useState([]);

    const loadRestaurant_foods = () => {
        axios.get('http://127.0.0.1:8000/api/restaurant_foods')
        .then(Response => {
            setRestaurant_foods(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data restaurant_foods?')) {
            axios.delete(`http://127.0.0.1:8000/api/restaurant_foods/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadRestaurant_foods();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadRestaurant_foods();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-4">Restaurant Foods Data</h1>
            <Link to="/admin/restaurant_foods/create" className="btn btn-primary mb-3"><i className="fas fa-plus mr-2"></i>Create</Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered table-striped table-hover" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Restaurant ID</th>
                                    <th>Restaurant Name</th>
                                    <th>Food ID</th>
                                    <th>Food Name</th>
                                    <th>Price</th>
                                    <th style={{ width: "200px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurant_foods.map((restaurant_foodss, index) => (
                                    <tr key={index}>
                                        <td>{restaurant_foodss.id}</td>
                                        <td>{restaurant_foodss.restaurant?.id}</td>
                                        <td>{restaurant_foodss.restaurant?.name}</td>
                                        <td>{restaurant_foodss.food?.id}</td>
                                        <td>{restaurant_foodss.food?.name}</td>
                                        <td>{restaurant_foodss.price}</td>
                                        <td>
                                            <Link to={`/admin/restaurant_foods/update/${restaurant_foodss.id}`} className="btn btn-sm btn-info">
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(restaurant_foodss.restaurant_id)}
                                                className="btn btn-sm btn-danger ml-1">
                                                    <i className="fas fa-trash"></i>    
                                                    Delete
                                                </button>
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


export default RestaurantFoodsIndex;