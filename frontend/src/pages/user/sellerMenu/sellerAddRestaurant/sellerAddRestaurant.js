import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from 'axios';

const SellerAddRestaurant = () => {
    const navigate = useNavigate();
    const userId =  localStorage.getItem('id'); // Ambil dari localStorage

    const [restaurantsData, setRestaurantsData] = useState({
        name: "",
        location: "",
        phone: "",
        website_url: "",
        opening_hours: "",
        cuisine_id: "",
        rating: "",
        description: "",
        image_url: "",
        user_id: userId
    });
    const [error, setError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [imageFile, setImageFile] = useState(null);
    const [cuisines, setCuisines] = useState([]);


    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setRestaurantsData({ ...restaurantsData, [name]: value });
    };

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/cuisines')
            .then((cuisinesData) => {
                setCuisines(cuisinesData.data.data);
            })
            .catch((error) => {
                console.log('Gagal memuat data cuisines: ', error);
            });
    }, []);

    const handleFileChange = (event) => {
        if (event.target.files && event.target.files.length > 0) {
            setImageFile(event.target.files[0]);
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        setError(null);
        setSuccessMessage(null);

        const formData = new FormData();



        const userId = localStorage.getItem("id");
        formData.append("name", restaurantsData.name);
        formData.append("location", restaurantsData.location);
        formData.append("phone", restaurantsData.phone);
        formData.append("website_url", restaurantsData.website_url);
        formData.append("opening_hours", restaurantsData.opening_hours);
        if (restaurantsData.cuisine_id) {
            formData.append("cuisine_id", parseInt(restaurantsData.cuisine_id));
        }
        if (restaurantsData.rating) {
            formData.append("rating", parseFloat(restaurantsData.rating));
        }
        formData.append("description", restaurantsData.description);
        if (imageFile) {
            formData.append("image_url", imageFile);
        }
        formData.append("user_id", userId);
console.log("Submitting with user_id:", userId);


  for (let [key, value] of formData.entries()) {
    console.log(`${key}:`, value);
}

        axios.post('http://127.0.0.1:8000/api/restaurants', formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            }
        })
            .then(response => {
                setSuccessMessage('Restaurant added successfully!');
                setTimeout(() => {
                    navigate('/admin/restaurants');
                }, 1500);
            })
            .catch(error => {
                console.error('Error adding restaurant:', error.response?.data || error);
                setError('Gagal menambahkan restoran. Silakan cek kembali data.');
            });
    };
        if (!userId) {
        return (
            <div className="container mt-5">
                <div className="alert alert-danger">
                    User ID tidak ditemukan. Silakan <Link to="/login">login ulang</Link>.
                </div>
            </div>
        );
    }


    return (
        <div className="container-fluid">
            <h1 className="h3 text-gray-800 mb-2">Register Your Restaurant</h1>
            <Link to="/seller/menu" className="btn btn-secondary mb-2">Back to Menu</Link>
            <div className="card shadow mb-4">
                <div className="card-body">
                    {error && <div className="alert alert-danger">{error}</div>}
                    {successMessage && <div className="alert alert-success">{successMessage}</div>}
                    <form onSubmit={handleSubmit}>
                        {/* form input sama persis seperti sebelumnya */}
                        {/* ... */}
                        <div className="form-group">
                            <label>Name:</label>
                            <input type="text"
                                name="name"
                                value={restaurantsData.name}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Location:</label>
                            <input type="text"
                                name="location"
                                value={restaurantsData.location}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Phone:</label>
                            <input type="text"
                                name="phone"
                                value={restaurantsData.phone}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Website Url:</label>
                            <input type="text"
                                name="website_url"
                                value={restaurantsData.website_url}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Opeing Hours:</label>
                            <input type="text"
                                name="opening_hours"
                                value={restaurantsData.opening_hours}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Cuisine: </label>
                            <select
                                name="cuisine_id"
                                value={restaurantsData.cuisine_id}
                                onChange={handleInputChange}
                                className="form-control"
                                required
                            >
                                <option
                                    value="">Pilih Restaurants</option>
                                {cuisines.map(cuisine =>
                                (
                                    <option key={cuisine.id}
                                        value={cuisine.id}>{cuisine.name}
                                    </option>
                                ))
                                }
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Rating:</label>
                            <input type="number" step="0.01"
                                name="rating"
                                value={restaurantsData.rating}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>description:</label>
                            <input type="text"
                                name="description"
                                value={restaurantsData.description}
                                onChange={handleInputChange}
                                className="form-control"
                                required />
                        </div>
                        <div className="form-group">
                            <label>Image Url:</label>
                            <input type="file"
                                name="image_url"
                                onChange={handleFileChange}
                                className="form-control"
                                required />
                        </div>
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default SellerAddRestaurant;
