import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const IngredientsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('Ingredients ID:', id);
    const [ingredientsData, setingredientsData] = useState({
        name: "",
    });

    const getIngredients = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/ingredients/${id}`)
        .then(Response => {
            const { name } = Response.data.data;
            setingredientsData({ name });
        })
        .catch(Error => {
            alert('Error fetching ingredients details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getIngredients();
    }, [getIngredients]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setingredientsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/ingredients/${id}`, ingredientsData)
        .then(Response => {
            alert('ingredients updated successfully: ', Response.data.data);
            navigate('/admin/ingredients');
        })
        .catch(Error => {
            console.error('Error updating ingredients: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Ingredients</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={ingredientsData.name}
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

export default IngredientsUpdate;