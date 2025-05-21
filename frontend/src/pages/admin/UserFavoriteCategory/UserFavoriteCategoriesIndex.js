import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const UserFavoriteCategoriesIndex = () => {
    const [favCategory, setFavCategory] = useState([]);
    const loadCategory = () => {
        axios.get('http://127.0.0.1:8000/api/user_favorite_category')
        .then(Response => {
            setFavCategory(Response.data.data);
        })
        .catch((error) => {
            console.error('Error Fetching Data:', error); // Ini lebih aman
            alert('Gagal mengambil data. Cek console untuk detail.');
        });
    };

    const handleDelete = (id) => {
        if(window.confirm('Are you sure want to delete this data favCategory?')) {
            axios.delete(`http://127.0.0.1:8000/api/user_favorite_category${id}`)
            .then(() => {
                alert('Data deleted successfully');
                loadCategory();
            })
            .catch(Error => {
                alert('Error deleting the data: ', Error);
            });
        }
    };

    useEffect(() => {
        loadCategory();
    }, []);

    console.log(favCategory);

    return (

        <div className="container-fluid">
            <h1 className="h3 text-bg-gray-800 mb-2">User Favorite Categories Data</h1>
            <Link to="/admin/user_favorite_categories/create" className="btn btn-primary mb-2">Create</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <div className="table-table-responsive">
                        <table className="table table-bordered" width="100%" cellSpacing="0">
                            <thead>
                                <tr>
                                    <th>ID</th>
                                    <th>User Preference ID</th>
                                    <th>User Preference Name</th>
                                    <th>Category ID</th>
                                    <th>Category Name</th>
                                    <th>Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                {favCategory.map((favCategorys, index) => (

                                    <tr key={index}>
                                        <td>{favCategorys.id}</td>
                                        <td>{favCategorys.user_preference_id}</td>
                                        <td>{favCategorys.user_preference?.user?.name}</td>
                                        <td>{favCategorys.category_id}</td>
                                        <td>{favCategorys.category?.name}</td>
                                        <td>
                                            <Link to={`/admin/user_favorite_categories/update/${favCategorys.id}`} className="btn btn-sm btn-info">Edit</Link>
                                            <button 
                                                onClick={() => handleDelete(favCategorys.id)}
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


export default UserFavoriteCategoriesIndex;