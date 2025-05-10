import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const CuisineFoodsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [cuisine, setCuisine] = useState([]);
    const [foods, setFoods] = useState([]);
    const [cuisineFoodsData, setCuisineFoodsData] = useState(
        {
            'cuisine_id': "",
            'food_id': "",
        }
    );

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cuisines')
            .then(
                (resCui) => 
                    {
                        setCuisine(resCui.data);
                        console.log('Respon dari data cuisine: ', resCui.data);
                    }
            )
            .catch(
                (error) => 
                    {
                        console.log('Gagal memuat Data cuisine: ', error);
                    }
            );
        axios.get('http://127.0.0.1:8000/api/foods')
            .then(
                (resFoods) => 
                    {
                        setFoods(resFoods.data);
                        console.log('Respon dari data foods: ', resFoods.data);
                    }
            )
            .catch(
                (error) => 
                    {
                        console.log('Gagal memuat data foods: ', error);
                    }
            );
    }, []);

    const getCuisineFoodsData = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/cuisine_food/${id}`)
            .then(Response => 
                {
                    const { food_id, cuisine_id } = Response.data.data;
                    setCuisineFoodsData({ food_id, cuisine_id });
                }
            )
            .catch(Error => 
                {
                    alert('Error fetching cuisineFoodsData details: ', Error);
                }
            );
    }, [id]);

    useEffect(() => {
        getCuisineFoodsData();
    }, [getCuisineFoodsData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCuisineFoodsData(prevState => (
            {
                ...prevState,
                [name]: value
            })
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/cuisine_food/${id}`, cuisineFoodsData)
            .then(Response => 
                {
                    alert('cuisineFoodsData updated successfully: ', Response.data.data);
                    navigate('/admin/cuisine_food');
                }
            )
            .catch(Error => 
                {
                    console.error('Error updating cuisineFoodsData: ', Error);
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
                                <label>cuisine: </label>
                                <select 
                                    name="cuisine_id"
                                    value={cuisineFoodsData.cuisine_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih cuisine</option>
                                        {cuisine.map(cui => 
                                            (
                                                <option key={cui.id}
                                                    value={cui.id}>{cui.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Food: </label>
                                <select 
                                    name="food_id"
                                    value={cuisineFoodsData.food_id}
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

export default CuisineFoodsUpdate;