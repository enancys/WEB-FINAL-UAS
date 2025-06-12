import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import RestaurantCard from '../../../components/user/Restaurant/RestaurantCard';
import ComponentNavbar from '../../../components/user/ComponentNavbar';
import ComponentFooter from '../../../components/user/ComponentFooter';

const SellerMenu = () => {
    const navigate = useNavigate();
    const [restaurant, setRestaurant] = useState(null);
    const [loading, setLoading] = useState(true);
    const id = localStorage.getItem('id');

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const token = localStorage.getItem('token');

                const response = await axios.get(`http://localhost:8000/api/restaurant/user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });

                if (response.data && response.data.restaurant) {
                    setRestaurant(response.data.restaurant);
                } else {
                    setRestaurant(null);
                }
            } catch (error) {
                console.error('Error fetching restaurant:', error);
                setRestaurant(null);
            } finally {
                setLoading(false);
            }
        };

        fetchRestaurant();
    }, [id]);

    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center vh-100">
                <div className="spinner-border text-primary" role="status" />
            </div>
        );
    }

    return (
        <>
            <ComponentNavbar />

            <div className="container mt-5 py-5">
                <h1 className="text-center mb-4 fw-bold text-primary">Your Restaurant</h1>

                {restaurant ? (
                    <>
                        <div className="d-flex justify-content-center mb-4">
                            <div style={{ maxWidth: '500px', width: '100%' }}>
                                <RestaurantCard restaurant={restaurant} />
                            </div>
                        </div>

                        <div className="d-flex justify-content-center gap-3 mt-3 flex-wrap">
                            <button
                                className="btn btn-warning px-4"
                                onClick={() => navigate(`/edit-restaurant/${restaurant.id}`)}
                            >
                                ✏️ Edit Restaurant
                            </button>
                            <button
                                className="btn btn-success px-4"
                                onClick={() => navigate('/register-restaurant')}
                            >
                                ➕ Add Another Restaurant
                            </button>
                        </div>
                    </>
                ) : (
                    <div className="text-center">
                        <p className="fs-5 text-muted">You haven't registered a restaurant yet.</p>
                        <button
                            className="btn btn-success px-5"
                            onClick={() => navigate('/register-restaurant')}
                        >
                            ➕ Register Restaurant
                        </button>
                    </div>
                )}
            </div>

            <ComponentFooter />
        </>
    );
};

export default SellerMenu;
    