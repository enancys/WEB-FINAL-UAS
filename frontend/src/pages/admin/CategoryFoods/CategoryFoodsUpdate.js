import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CategoryFoodsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('categoryFoodsData ID:', id);
    const [category, setCategory] = useState([]);
    const [foods, setFoods] = useState([]);
    const [categoryFoodsData, setCategoryFoodsData] = useState(
        {
            'category_id': "",
            'food_id': "",
        }
    );

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

    const getCategoryFoodsData = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/category_food/${id}`)
            .then(Response => 
                {
                    const { food_id, category_id } = Response.data.data;
                    setCategoryFoodsData({ food_id, category_id });
                }
            )
            .catch(Error => 
                {
                    alert('Error fetching categoryFoodsData details: ', Error);
                }
            );
    }, [id]);

    useEffect(() => {
        getCategoryFoodsData();
    }, [getCategoryFoodsData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCategoryFoodsData(prevState => (
            {
                ...prevState,
                [name]: value
            })
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/category_food/${id}`, categoryFoodsData)
            .then(Response => 
                {
                    alert('categoryFoodsData updated successfully: ', Response.data.data);
                    navigate('/admin/category_food');
                }
            )
            .catch(Error => 
                {
                    console.error('Error updating categoryFoodsData: ', Error);
                }
            );
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">
                Edit Book
            </h1>
            <div className="card shadow mb-4">
                <div className="card-body">
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
};

export default CategoryFoodsUpdate;