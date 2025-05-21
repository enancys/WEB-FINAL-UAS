import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestaurantFoodsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Restaurant Foods ID:', id);
    const [restaurant_foodsData, setRestaurant_foodsData] = useState({
        restaurant_id: "",
        food_id: "",
        price: "",
    });
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/foods')
            .then(
                (resFoods) => {
                    setFoods(resFoods.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat data foods: ', error);
                }
            );
        axios.get('http://127.0.0.1:8000/api/restaurants')
            .then(
                (resRest) => {
                    setRestaurants(resRest.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat data restaurant: ', error);
                }
            );
    }, []);

    const getRestaurant_foods = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/restaurant_foods/${id}`)
        .then(Response => {
            const { restaurant_id, food_id, price } = Response.data.data;
            setRestaurant_foodsData({ restaurant_id, food_id, price });
        })
        .catch(Error => {
            alert('Error fetching resturant_foods details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getRestaurant_foods();
    }, [getRestaurant_foods]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRestaurant_foodsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/restaurant_foods/${id}`, restaurant_foodsData)
        .then(Response => {
            alert('resturant_foods updated successfully: ', Response.data.data);
            navigate('/admin/restaurant_foods');
        })
        .catch(Error => {
            console.error('Error updating resturant_foods: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Restaurant Foods</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                                <label>Restaurant: </label>
                                <select 
                                    name="restaurant_id"
                                    value={restaurant_foodsData.restaurant_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Restaurants</option>
                                        {restaurants.map(restaurant => 
                                            (
                                                <option key={restaurant.id}
                                                    value={restaurant.id}>{restaurant.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Food: </label>
                                <select 
                                    name="food_id"
                                    value={restaurant_foodsData.food_id}
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
                        <div className="form-group">
                            <label>Price:</label>
                            <input type="numeric"
                                name="price"
                                value={restaurant_foodsData.price}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
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

export default RestaurantFoodsUpdate;