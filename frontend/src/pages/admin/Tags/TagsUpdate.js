import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const TagsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('tags ID:', id);
    const [tagsData, setTagsData] = useState({
        name: "",
    });

    const getTags = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/tags/${id}`)
        .then(Response => {
            const { name } = Response.data;
            setTagsData({ name });
        })
        .catch(Error => {
            alert('Error fetching tags details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getTags();
    }, [getTags]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTagsData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/tags/${id}`, tagsData)
        .then(Response => {
            alert('tags updated successfully: ', Response.data);
            navigate('/admin/tags');
        })
        .catch(Error => {
            console.error('Error updating tags: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Tags</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={tagsData.name}
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

export default TagsUpdate;