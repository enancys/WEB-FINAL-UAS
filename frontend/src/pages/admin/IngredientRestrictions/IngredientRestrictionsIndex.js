import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IngredientRestrictionsIndex = () => {
    const [ingredientRestData, setIngredinentRestData] = useState([]);
    const loadIngredientRestData = () => {
        axios.get('http://127.0.0.1:8000/api/ingredient_restrictions')
            .then(Response => 
                {
                    setIngredinentRestData(Response.data.data);
                }
            )
            .catch(Error => 
                {
                    alert('Eror Fetching Data: ', Error);
                }
            );
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data ingredientRestData?')) {
            axios.delete(`http://127.0.0.1:8000/api/ingredient_restrictions/${id}`)
                .then(() => 
                    {
                        alert('Data deleted successfully');
                        loadIngredientRestData();
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
        loadIngredientRestData();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">
                Ingredient Restrictions Foods Data
            </h1>
            <Link 
                to="/admin/ingredient_restrictions/create" 
                className="btn btn-primary mb-3">
                Create
            </Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div 
                        className="table-responsive" 
                        style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table 
                            className="table table-bordered table-striped table-hover" 
                            width="100%" 
                            cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Ingredient ID</th>
                                    <th>Ingredient Name</th>
                                    <th>Restriction Id</th>
                                    <th>Restriction Name</th>
                                    <th style={{ width: "200px" }}>Action</th>                                    
                                </tr>
                            </thead>
                            <tbody>
                                {ingredientRestData.map((ingResData, index) => (
                                    <tr key={index}>
                                        <td>{ingResData.id}</td>
                                        <td>{ingResData.ingredient?.id}</td>
                                        <td>{ingResData.ingredient?.name}</td>
                                        <td>{ingResData.restriction?.id}</td>
                                        <td>{ingResData.restriction?.name}</td>
                                        <td>
                                            <Link 
                                                to={`/admin/ingredient_restrictions/update/${ingResData.id}`} 
                                                className="btn btn-sm btn-info">
                                                    <i className="fas fa-edit"></i>
                                                    
                                                    Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(ingResData.id)}
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


export default IngredientRestrictionsIndex;