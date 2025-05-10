import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CuisineFoodsIndex = () => {
    const [cuisineFoodsData, setCuisineFoodsData] = useState([]);
    const loadCuisineFoodsData = () => {
        axios.get('http://127.0.0.1:8000/api/cuisine_food')
            .then(Response => 
                {
                    setCuisineFoodsData(Response.data.data);
                }
            )
            .catch(Error => 
                {
                    alert('Eror Fetching Data: ', Error);
                }
            );
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data cuisineFoodsData?')) {
            axios.delete(`http://127.0.0.1:8000/api/cuisine_food/${id}`)
                .then(() => 
                    {
                        alert('Data deleted successfully');
                        loadCuisineFoodsData();
                    }
                )
                .catch(Error => 
                    {
                        alert('Error deleting the data: ', Error);
                    }
                );
        }
    };

    useEffect(() => {
        loadCuisineFoodsData();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">
                cuisine Foods Data
            </h1>
            <Link 
                to="/admin/cuisine_food/create" 
                className="btn btn-primary mb-2">
                Create
            </Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div 
                        className="table-responsive" 
                        style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table 
                            className="table table-bordered" 
                            width="100%" 
                            cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Food_id</th>
                                    <th>Food Name</th>
                                    <th>Cuisine Id</th>
                                    <th>Cuisine Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cuisineFoodsData.map((cuisineFoodData, index) => (
                                    <tr key={index}>
                                        <td>{cuisineFoodData.id}</td>
                                        <td>{cuisineFoodData.food?.id}</td>
                                        <td>{cuisineFoodData.food?.name}</td>
                                        <td>{cuisineFoodData.cuisine?.id}</td>
                                        <td>{cuisineFoodData.cuisine?.name}</td>
                                        <td>
                                            <Link 
                                                to={`/admin/cuisine_food/update/${cuisineFoodData.id}`} 
                                                className="btn btn-sm btn-info">
                                                    Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(cuisineFoodData.food_id)}
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


export default CuisineFoodsIndex;