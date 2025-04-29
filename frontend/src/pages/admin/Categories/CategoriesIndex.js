import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const CategoriesIndex = () => {
    const [categories, setCategories] = useState([]);
    const loadCategories = () => {
        axios.get('http://127.0.0.1:8000/api/categories')
        .then(Response => {
            setCategories(Response.data);
        })
        .catch(Error => {
            alert('Eror Fetching Data: ', Error);
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data categories?')) {
            axios.delete(`http://127.0.0.1:8000/api/categories/${id}`)
            .then(() => {
                alert('Data Categories deleted successfully');
                loadCategories();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadCategories();
    }, []);

    return (
        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">categories Data</h1>
            <Link to="/admin/categories/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>Id</th>
                                    <th>Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {categories.map((category, CategoriesIndex) => (
                                    <tr key={CategoriesIndex}>
                                        <td>{category.id}</td>
                                        <td>{category.name}</td>
                                        <td>
                                            <Link to={`/admin/categories/update/${category.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(category.id)}
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


export default CategoriesIndex;