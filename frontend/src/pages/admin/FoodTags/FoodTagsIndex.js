import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const FoodTagsIndex = () => {
    const [food_tags, setFoodTags] = useState([]);
    const loadUser = () => {
        axios.get('http://127.0.0.1:8000/api/food_tags')
        .then(Response => {
            setFoodTags(Response.data.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data food_tags?')) {
            axios.delete(`http://127.0.0.1:8000/api/food_tags/${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadUser();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadUser();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-4">Food Tags Data</h1>
            <Link to="/admin/food_tags/create" className="btn btn-primary mb-3">
            <i className="fas fa-plus mr-2"></i>
            Create</Link>
            <div className="card shadow border-0 rounded">
                <div className="card-body">
                    <div className="table-responsive">
                        <table className="table table-bordered table-striped table-hover" 
                        width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>Food ID</th>
                                    <th>Food Name</th>
                                    <th>Tag ID</th>
                                    <th>Tag Name</th>
                                    <th style={{ width: "200px"}}>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {food_tags.map((food_tag, index) => (
                                    <tr key={index}>
                                        <td>{food_tag.id}</td>
                                        <td>{food_tag.food?.id}</td>
                                        <td>{food_tag.food?.name}</td>
                                        <td>{food_tag.tag?.id}</td>
                                        <td>{food_tag.tag?.name}</td>
                                        
                                        <td>
                                            <Link to={`/admin/food_tags/update/${food_tag.id}`} className="btn btn-sm btn-info">
                                                <i className="fas fa-edit"></i>
                                                Edit
                                            </Link>
                                            <button 
                                                onClick={() => handleDelete(food_tag.id)}
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


export default FoodTagsIndex;