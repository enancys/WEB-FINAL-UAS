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
    const [foods, setFoods] = useState([]);
    const [tags, setTags] = useState([]);

    const getFoods = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/food_tags/${id}`)
        .then(Response => {
            const { food_id, tag_id } = Response.data.data;
            setFoodTagsData({ food_id, tag_id });
        })
        .catch(Error => {
            alert('Error fetching food_tags details: ', Error);
        });
    }, [id]);

        useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/tags')
            .then(
                (resTags) => {
                    setTags(resTags.data.data);
                    console.log('Respon dari data tags: ', resTags.data.data);
                }
            )
            .catch(
                (error) => {
                    console.log('Gagal memuat Data tags: ', error);
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
            alert('food_tags updated successfully: ', Response.data.data);
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
                            <label>Tags: </label>
                                <select 
                                    name="tag_id"
                                    value={foodTagsData.tag_id}
                                    onChange={handleInputChange}
                                    className="form-control"
                                    required
                                >
                                    <option
                                        value="">Pilih Tags</option>
                                        {tags.map(tag => 
                                            (
                                                <option key={tag.id}
                                                    value={tag.id}>{tag.name}
                                                </option>
                                            ))
                                        }
                                </select>
                            </div>
                            <div className="form-group">
                                <label>Food: </label>
                                <select 
                                    name="food_id"
                                    value={foodTagsData.food_id}
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

export default FoodTagsUpdate;