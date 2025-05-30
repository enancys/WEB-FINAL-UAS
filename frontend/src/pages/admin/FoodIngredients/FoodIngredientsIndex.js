import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FoodIngredientsIndex = () => {
    const [food_ingredients, setFood_ingredients] = useState([]);
    const loadFood_ingredients = () => {
        axios.get('http://127.0.0.1:8000/api/food_ingredients')
            .then(Response => {
                setFood_ingredients(Response.data.data);
            })
            .catch(Error => {
                alert('Eror Fetching Data: ', Error);
            });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data food_ingredients?')) {
            axios.delete(`http://127.0.0.1:8000/api/food_ingredients/${id}`)
                .then(() => {
                    alert('Data deleted successfully');
                    loadFood_ingredients();
                })
                .catch(Error => {
                    alert('Error deleting the data: ', Error);
                });
        }
    };

    useEffect(() => {
        loadFood_ingredients();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-4">Food Ingredients Data</h1>
            <Link 
                to="/admin/food_ingredients/create" 
                className="btn btn-primary mb-3">
                    <i className="fas fa-plus mr-2"></i>
                    Create
            </Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div 
                        className="table-responsive"
                        style={{
                            maxHeight: "500px",
                            overflowY: "auto",
                            overflowX: "auto"
                        }}
                    >
                        <table 
                            className="table table-bordered table-striped table-hover" 
                            width="100%" 
                            cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Food_id</th>
                                    <th>Food Name</th>
                                    <th>Ingredient_id</th>
                                    <th>Ingredient Name</th>
                                    <th>Quantity</th>
                                    <th>Unit</th>
                                    <th style={{ width: "200px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {food_ingredients.map((food_ingredientss, index) => (
                                    <tr key={index}>
                                        <td>{food_ingredientss.id}</td>
                                        <td>{food_ingredientss.food?.id}</td>
                                        <td>{food_ingredientss.food?.name}</td>
                                        <td>{food_ingredientss.ingredient?.id}</td>
                                        <td>{food_ingredientss.ingredient?.name}</td>
                                        <td>{food_ingredientss.quantity}</td>
                                        <td>{food_ingredientss.unit}</td>
                                        <td>
                                            <Link to={`/admin/food_ingredients/update/${food_ingredientss.id}`} className="btn btn-sm btn-info mr-2"
                                            >
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(food_ingredientss.food_id)}
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


export default FoodIngredientsIndex;