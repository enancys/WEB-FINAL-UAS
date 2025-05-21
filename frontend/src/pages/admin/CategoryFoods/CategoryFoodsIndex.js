import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoryFoodsIndex = () => {
    const [categoryFoodsData, setCategoryFoodsData] = useState([]);
    const laodCategoryFoodsData = () => {
        axios.get('http://127.0.0.1:8000/api/category_food')
            .then(Response => {
                setCategoryFoodsData(Response.data.data);
            })
            .catch(Error => {
                alert('Eror Fetching Data: ', Error);
            });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data categoryFoodsData?')) {
            axios.delete(`http://127.0.0.1:8000/api/category_food/${id}`)
                .then(() => 
                    {
                        alert('Data deleted successfully');
                        laodCategoryFoodsData();
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
        laodCategoryFoodsData();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 mb-4 text-gray-800">
                Category Foods Data
            </h1>
            <Link 
                to="/admin/category_food/create" 
                className="btn btn-primary mb-3">
                <i className="fas fa-plus mr-2"></i>
                Create
            </Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div className="table-responsive" >
                        <table 
                            className="table table-bordered table-striped" 
                            width="100%" 
                            cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Food_id</th>
                                    <th>Food Name</th>
                                    <th>Category Id</th>
                                    <th>Category Name</th>
                                    <th style={{ width: "200px"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categoryFoodsData.map((categoryFoodData, index) => (
                                    <tr key={index}>
                                        <td>{categoryFoodData.id}</td>
                                        <td>{categoryFoodData.food?.id}</td>
                                        <td>{categoryFoodData.food?.name}</td>
                                        <td>{categoryFoodData.category?.id}</td>
                                        <td>{categoryFoodData.category?.name}</td>
                                        <td>
                                            <Link 
                                                to={`/admin/category_food/update/${categoryFoodData.id}`} 
                                                className="btn btn-sm btn-info mr-2">
                                                    <i className="fas fa-edit"></i>
                                                    Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(categoryFoodData.food_id)}
                                                className="btn btn-sm btn-danger ml-1"
                                                >
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


export default CategoryFoodsIndex;