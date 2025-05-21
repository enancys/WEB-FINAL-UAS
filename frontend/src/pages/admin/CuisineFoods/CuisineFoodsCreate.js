import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const CuisineFoodsCreate = () => {

    const navigate = useNavigate();
    const [cuisineFoodData, setCuisineFoodData] = useState({
        cuisine_id: "",
        food_id: ""
    });
    const [cuisine, setCuisine] = useState([]);
    const [foods, setFoods] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setCuisineFoodData({
            ...cuisineFoodData, [name]: value
        });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cuisines')
            .then(
                (resCui) => {
                    setCuisine(resCui.data.data);
                    console.log('Respon dari data cuisine: ', resCui.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat Data cuisine: ', error);
                }
            );
        axios.get('http://127.0.0.1:8000/api/foods')
            .then(
                (resFoods) => {
                    setFoods(resFoods.data.data);
                    console.log('Respon dari data foods: ', resFoods.data.data);
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

        axios.post('http://127.0.0.1:8000/api/cuisine_food', cuisineFoodData)
            .then(() => {
                setSuccessMessage('Data cuisine food berhasil ditambahkan');
                setTimeout(() => {
                    navigate('/admin/cuisine_food');
                }, 1500);
            }
        )
        .catch(Error => {
            setError('Failed to add food_ingredient. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-4">
                New Data Cuisine Food
            </h1>
            <Link to="/admin/cuisine_food"
                className="btn btn-secondary mb-3">
                    Back
                </Link>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>Cuisine: </label>
                                <select 
                                    name="cuisine_id"
                                    value={cuisineFoodData.cuisine_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih cuisine</option>
                                        {cuisine.map(cat => 
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
                                    value={cuisineFoodData.food_id}
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

export default CuisineFoodsCreate;