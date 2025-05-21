import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const RestaurantFoodsCreate = () => {
    const navigate = useNavigate();
    const [restaurant_foodsData, setRestaurant_foodsData] = useState({
        restaurant_id: "",
        food_id: "",
        price: "",
    });
    const [restaurants, setRestaurants] = useState([]);
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

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
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRestaurant_foodsData({...restaurant_foodsData, [name]: value});
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); // Reset error saat submit
        setSuccessMessage(null); // Reset success message

        axios.post('http://127.0.0.1:8000/api/restaurant_foods', restaurant_foodsData)
        .then(Response => {
            setSuccessMessage('restaurant_foods added successfully!');
            setTimeout(() => {
                navigate('/admin/restaurant_foods');
            }, 1500); // Redirect setelah 1.5 detik
        })
        .catch(Error => {
            console.error('Error adding restaurant_foods:', Error);
            setError('Failed to add restaurant_foods. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New restaurant_foods</h1>
            <Link to="/admin/restaurant_foods" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
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

export default RestaurantFoodsCreate;