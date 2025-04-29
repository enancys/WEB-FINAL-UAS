import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const FoodTagsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('food_tags ID:', id);
    const [foodTagsData, setFoodTagsData] = useState({
        food_id: "",
        tag_id: "",
    });

    const getFoods = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/food_tags/${id}`)
        .then(Response => {
            const { food_id, tag_id } = Response.data;
            setFoodTagsData({ food_id, tag_id });
        })
        .catch(Error => {
            alert('Error fetching food_tags details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getFoods();
    }, [getFoods]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFoodTagsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/food_tags/${id}`, foodTagsData)
        .then(Response => {
            alert('food_tags updated successfully: ', Response.data);
            navigate('/admin/food_tags');
        })
        .catch(Error => {
            console.error('Error updating food_tags: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Food Tags</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Food ID:</label>
                            <input type="text"
                                name="food_id"
                                value={foodTagsData.food_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required/>
                        </div>
                        <div className="form-group">
                            <label>Tag ID:</label>
                            <input type="text"
                                name="tag_id"
                                value={foodTagsData.tag_id}
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

export default FoodTagsUpdate;