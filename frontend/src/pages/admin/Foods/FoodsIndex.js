import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FoodsIndex = () => {
    const [foods, setFoods] = useState([]);
    const loadFoods = () => {
        axios.get('http://127.0.0.1:8000/api/foods')
        .then(Response => {
            setFoods(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data foods?')) {
            axios.delete(`http://127.0.0.1:8000/api/foods/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadFoods();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadFoods();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-4">Foods Data</h1>
            <Link to="/admin/foods/create" className="btn btn-primary mb-3">
                <i className="fas fa-plus mr-2"></i>
                Create
            </Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table 
                            className="table table-bordered table-striped table-hover" 
                            width="100%" 
                            cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th>Description</th>
                                    <th>Price</th>
                                    <th>Image_url</th>
                                    <th>Rest ID</th>
                                    <th>Rest Name</th>
                                    <th>Cui ID</th>
                                    <th>Cui Name</th>
                                    <th style={{ width: "200px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {foods.map((food, index) => (
                                    <tr key={index}>
                                        <td>{food.id}</td>
                                        <td>{food.name}</td>
                                        <td style={{ wordBreak: "break-word", maxWidth: "150px", whiteSpace: "normal" }}>
                                            {food.description}
                                        </td>
                                        <td>{food.price}</td>
                                        <td style={{ wordBreak: "break-word", maxWidth: "150px", whiteSpace: "normal" }}>
                                            {food.image_url}
                                        </td>
                                        <td>{food.restaurant?.id}</td>  
                                        <td>{food.restaurant?.name}</td>
                                        <td>{food.cuisine?.id}</td>
                                        <td>{food.cuisine?.name}</td>

                                        <td>
                                            <Link to={`/admin/foods/update/${food.id}`} className="btn btn-sm btn-info">
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(food.id)}
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


export default FoodsIndex;