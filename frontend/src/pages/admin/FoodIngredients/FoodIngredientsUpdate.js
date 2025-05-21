import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodIngredientsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Food_ingredients ID:', id);
    const [food_ingredients, setFood_ingredients] = useState({
        food_id: "",
        ingredient_id: "",
        quantity: "",
        unit: "",
    });

    const getFood_ingredients = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/food_ingredients/${id}`)
        .then(Response => {
            const { food_id, ingredient_id, quantity, unit  } = Response.data.data;
            setFood_ingredients({ food_id, ingredient_id, quantity, unit });
        })
        .catch(Error => {
            alert('Error fetching food_ingredients details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getFood_ingredients();
    }, [getFood_ingredients]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFood_ingredients(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/food_ingredients/${id}`, food_ingredients)
        .then(Response => {
            alert('food_ingredients updated successfully: ', Response.data.data);
            navigate('/admin/Food_ingredients');
        })
        .catch(Error => {
            console.error('Error updating food_ingredients: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Book</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>food_id:</label>
                            <input type="text"
                                name="food_id"
                                value={food_ingredients.food_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>ingredient_id:</label>
                            <input type="text"
                                name="ingredient_id"
                                value={food_ingredients.ingredient_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                step="0.01"
                                name="quantity"
                                value={food_ingredients.quantity}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>

                        <div className="form-group">
                            <label>Unit :</label>
                            <input type="text"
                                name="unit"
                                value={food_ingredients.unit}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <button type="submit"
                            className="btn btn-primary">Update
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodIngredientsUpdate;