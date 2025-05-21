import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IngredientRestrictionsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();

    const [ingredient, setIngredient] = useState([]);
    const [restriction, setRestriction] = useState([]);
    const [ingredientRestData, setIngredientRestData] = useState(
        {
            'ingredient_id': "",
            'restriction_id': "",
        }
    );

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/ingredients')
            .then(
                (resIng) => 
                    {
                        setIngredient(resIng.data.data);
                    }
            )
            .catch(
                (error) => 
                    {
                        console.log('Gagal memuat Data ingredient: ', error);
                    }
            );
        axios.get('http://127.0.0.1:8000/api/restrictions')
            .then(
                (resRes) => 
                    {
                        setRestriction(resRes.data.data);
                        console.log('Respon dari data restriction: ', resRes.data);
                    }
            )
            .catch(
                (error) => 
                    {
                        console.log('Gagal memuat data restriction: ', error);
                    }
            );
    }, []);

    const getIngredientRestData = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/ingredient_restrictions/${id}`)
            .then(Response => 
                {
                    const { restriction_id, ingredient_id } = Response.data.data;
                    setIngredientRestData({ restriction_id, ingredient_id });
                }
            )
            .catch(Error => 
                {
                    alert('Error fetching ingredientRestData details: ', Error);
                }
            );
    }, [id]);

    useEffect(() => {
        getIngredientRestData();
    }, [getIngredientRestData]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setIngredientRestData(prevState => (
            {
                ...prevState,
                [name]: value
            })
        );
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/ingredient_restrictions/${id}`, ingredientRestData)
            .then(Response => 
                {
                    alert('ingredientRestData updated successfully: ', Response.data.data);
                    navigate('/admin/ingredient_restrictions');
                }
            )
            .catch(Error => 
                {
                    console.error('Error updating ingredientRestData: ', Error);
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
                                <label>ingredient: </label>
                                <select 
                                    name="ingredient_id"
                                    value={ingredientRestData.ingredient_id}
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
                                    value={ingredientRestData.restriction_id}
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
};

export default IngredientRestrictionsUpdate;