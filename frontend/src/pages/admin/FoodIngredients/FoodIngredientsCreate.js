import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const FoodIngredientsCreate = () => {
    const navigate = useNavigate();
    const [food_ingredientsData, setFood_ingredientsData] = useState({
        food_id: "",
        ingredient_id: "",
        quantity: "",
        unit: "",
    });
    const [foods, setFoods] = useState([]);
    const [ingredients, setIngredients] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFood_ingredientsData({...food_ingredientsData, [name]: value});
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/foods')
        .then((resFood) => {
            setFoods(resFood.data.data);
            console.log('Respon data foods ', resFood.data.data);
        })
        .catch((erorr) => console.log("gagal Memuat Data Foods", erorr));

        axios.get('http://127.0.0.1:8000/api/ingredients')
        .then((resIngredient) => setIngredients(resIngredient.data.data))
        .catch((erorr) => console.log("Gagal memuat data ingredient", erorr));
    }, []);



    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null); // Reset error saat submit
        setSuccessMessage(null); // Reset success message

        axios.post('http://127.0.0.1:8000/api/food_ingredients', food_ingredientsData)
        .then(Response => {
            setSuccessMessage('food_ingredient added successfully!');
            setTimeout(() => {
                navigate('/admin/food_ingredients');
            }, 1500); // Redirect setelah 1.5 detik
        })
        .catch(Error => {
            console.error('Error adding food_ingredient:', Error);
            setError('Failed to add food_ingredient. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Add New food_ingredient</h1>
            <Link to="/admin/food_ingredients" className="btn btn-secondary mb-2">Back</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        <div className="form-group"> 
                            <label>Food:</label>
                            <select
                                name="food_id"
                                value={food_ingredientsData.food_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value="">Pilih Makanan</option>
                                {foods.map(food => (
                                    <option key={food.id} value={food.id}>{food.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Ingredient:</label>
                            <select
                                name="ingredient_id"
                                value={food_ingredientsData.ingredient_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option value="">Pilih Bahan</option>
                                {ingredients.map(ingredient => (
                                    <option key={ingredient.id} value={ingredient.id}>{ingredient.name}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Quantity:</label>
                            <input
                                type="number"
                                step="0.01"
                                name="quantity"
                                value={food_ingredientsData.quantity}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <div className="form-group">
                            <label>Unit:</label>
                            <input
                                type="text"
                                name="unit"
                                value={food_ingredientsData.unit}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default FoodIngredientsCreate;