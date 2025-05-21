import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const IngredientsIndex = () => {
    const [ingredients, setIngredients] = useState([]);
    const loadIngredients = () => {
        axios.get('http://127.0.0.1:8000/api/ingredients')
        .then(Response => {
            setIngredients(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data ingredients?')) {
            axios.delete(`http://127.0.0.1:8000/api/ingredients/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadIngredients();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadIngredients();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-4">Ingredients Data</h1>
            <Link to="/admin/ingredients/create" className="btn btn-primary mb-3"><i className="fas fa-plus mr-2"></i>Create</Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div className="table-responsive" style={{ overflowX: 'auto', maxHeight: '600px' }}>
                        <table className="table table-bordered table-striped table-hover" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Name</th>
                                    <th style={{ width: "200px" }}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {ingredients.map((ingredientss, index) => (
                                    <tr key={index}>
                                        <td>{ingredientss.id}</td>
                                        <td>{ingredientss.name}</td>
                                        <td>
                                            <Link to={`/admin/ingredients/update/${ingredientss.id}`} className="btn btn-sm btn-info"><i className="fas fa-edit"></i>Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(ingredientss.id)}
                                                className="btn btn-sm btn-danger ml-1"><i className="fas fa-trash"></i>Delete</button>
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


export default IngredientsIndex;