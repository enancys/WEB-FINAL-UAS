import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const RestaurantsIndex = () => {
    const [restaurants, setRestaurants] = useState([]);
    const loadRestaurants = () => {
        axios.get('http://127.0.0.1:8000/api/restaurants')
        .then(Response => {
            setRestaurants(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data restaurants?')) {
            axios.delete(`http://127.0.0.1:8000/api/restaurants/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadRestaurants();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadRestaurants();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-4">Restaurants Data</h1>
            <Link to="/admin/restaurants/create" className="btn btn-primary mb-3">
                <i className="fas fa-plus mr-2"></i> 
            Create</Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered table-striped table-hover" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Location</th>
                                    <th>Phone</th>
                                    <th>Website Url</th>
                                    <th>cuisine_id</th>
                                    <th>rating</th>
                                    <th>description</th>
                                    <th>Image Url</th>
                                    <th style={{ width: "200px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {restaurants.map((restaurant, index) => (
                                    <tr key={index}>
                                        <td>{restaurant.id}</td>
                                        <td>{restaurant.name}</td>
                                        <td>{restaurant.location}</td>
                                        <td>{restaurant.phone}</td>
                                        <td style={{ wordBreak: "break-word", maxWidth: "150px", whiteSpace: "normal" }}>
                                            {restaurant.website_url}
                                        </td>
                                        <td>{restaurant.cuisine?.id}</td>
                                        <td>{restaurant.cuisine?.name}</td>
                                        <td>{restaurant.rating}</td>
                                        <td style={{ wordBreak: "break-word", maxWidth: "150px", whiteSpace: "normal" }}>
                                            {restaurant.description}
                                        </td>
                                        <td style={{ wordBreak: "break-word", maxWidth: "150px", whiteSpace: "normal" }}>
                                            {restaurant.image_url}
                                        </td>
                                        <td>
                                            <Link to={`/admin/restaurants/update/${restaurant.id}`} className="btn btn-sm btn-info">
                                                <i className="fas fa-edit"></i>
                                            Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(restaurant.id)}
                                                className="btn btn-sm btn-danger ml-1">
                                                    <i className="fas fa-trash"></i>
                                                    Delete</button>
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


export default RestaurantsIndex;