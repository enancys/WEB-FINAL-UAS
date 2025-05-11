import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const IngredientRestrictionsCreate = () => {

    const navigate = useNavigate();
    const [ingredientRest, setIngredientRest] = useState({
        'ingredient_id': "",
        'restriction_id': ""
    });
    const [ingredient, setIngredient] = useState([]);
    const [restriction, setRestriction] = useState([]);
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setIngredientRest({
            ...
            ingredientRest, [name]: value
        });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ingredients')
            .then(
                (resIng) => {
                    setIngredient(resIng.data);
                    console.log('Respon dari data ingredient: ', resIng.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat Data ingredient: ', error);
                }
            );
        axios.get('http://127.0.0.1:8000/api/restrictions')
            .then(
                (resRes) => {
                    setRestriction(resRes.data);
                    console.log('Respon dari data restriction: ', resRes.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat data restriction: ', error);
                }
            );
    }, []);

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        axios.post('http://127.0.0.1:8000/api/ingredient_restrictions')
            .then(Response => {
                setSuccessMessage('Data ingredient Restriction berhasil ditambahkan');
                setTimeout(() => {
                    navigate('/admin/ingredient_restrictions');
                }, 1500);
            }
        )
        .catch(Error => {
            setError('Failed to add Restriction_ingredient. Please check the form data and try again.');
        });
    };

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">
                New Data ingredient Restriction
            </h1>
            <Link to="/admin/ingredient_restrictions"
                className="btn btn-secondary mb-2">
                    Back
                </Link>
                <div className="card shadow mb-4">
                    <div className="card-body">
                        {error && <div className="alert alert-danger">{error}</div>}
                        {successMessage && <div className="alert alert-success">{successMessage}</div>}

                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label>ingredient: </label>
                                <select 
                                    name="ingredient_id"
                                    value={ingredientRest.ingredient_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih ingredient</option>
                                        {ingredient.map(ing => 
                                            (
                                                <option key={ing.id}
                                                    value={ing.id}>{ing.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Restriction: </label>
                                <select 
                                    name="restriction_id"
                                    value={ingredientRest.restriction_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Restriction</option>
                                        {restriction.map(res => 
                                            (
                                                <option key={res.id}
                                                    value={res.id}>{res.name}
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

export default IngredientRestrictionsCreate;