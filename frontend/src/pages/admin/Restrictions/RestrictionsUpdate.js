import React, { useState, useEffect, useCallback } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";

const RestrictionsUpdate = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    console.log('restrictions ID:', id);
    const [restrictionsData, setrestrictionssData] = useState({
        name: "",

    });

    const getRestrictions = useCallback(() => {
        axios.get(`http://127.0.0.1:8000/api/restrictions/${id}`)
        .then(Response => {
            const { name } = Response.data;
            setrestrictionssData({ name });
        })
        .catch(Error => {
            alert('Error fetching restrictions details: ', Error);
        });
    }, [id]);

    useEffect(() => {
        getRestrictions();
    }, [getRestrictions]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setrestrictionssData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        axios.put(`http://127.0.0.1:8000/api/restrictions/${id}`, restrictionsData)
        .then(Response => {
            alert('restrictions updated successfully: ', Response.data);
            navigate('/admin/restrictions');
        })
        .catch(Error => {
            console.error('Error updating restrictions: ', Error);
        });
    }

    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Edit Restrictions Data</h1>
            <div className="card shadow mb-4">
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={restrictionsData.name}
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

export default RestrictionsUpdate;