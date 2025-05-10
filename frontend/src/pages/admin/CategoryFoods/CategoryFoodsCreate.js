import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CategoryFoodsCreate = () => {

    const navigate = useNavigate();
    const [categoryFoodsData, setCategoryFoodsData] = useState({
        'category_id': "",
        'food_id': ""
    });
    const [category, setCategory] = useState([]);
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryFoodsData({
            ...
            categoryFoodsData, [name]: value
        });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/categories')
            .then(
                (resCategory) => {
                    setCategory(resCategory.data);
                    console.log('Respon dari data category: ', resCategory.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat Data Category: ', error);
                }
            );
        axios.get('http://127.0.0.1:8000/api/foods')
            .then(
                (resFoods) => {
                    setFoods(resFoods.data);
                    console.log('Respon dari data foods: ', resFoods.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat data foods: ', error);
                }
            );
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post('http://127.0.0.1:8000/api/category_food')
            .then(Response => {
                setSuccessMessage('Data category food berhasil ditambahkan');
                setTimeout(() => {
                    navigate('/admin/category_food');
                }, 1500);
            }
        )
        .catch(Error => {
            setError('Failed to add food_ingredient. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">
                New Data Category Food
            </h1>
            <Link to="/admin/category_food"
                className="btn btn-secondary mb-2">
                    Back
                </Link>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}


                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Category: </label>
                                <select 
                                    name="category_id"
                                    value={categoryFoodsData.category_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Category</option>
                                        {category.map(cat => 
                                            (
                                                <option key={cat.id}
                                                    value={cat.id}>{cat.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Food: </label>
                                <select 
                                    name="food_id"
                                    value={categoryFoodsData.food_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Food</option>
                                        {foods.map(food => 
                                            (
                                                <option key={food.id}
                                                    value={food.id}>{food.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <button 
                                type="submit" 
                                className="btn btn-success">
                                Submit
                            </button>
                        </form>
                    </div>
                </div>
        </div>
    ); 
}

export default CategoryFoodsCreate;