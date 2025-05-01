import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
    const [restaurant, setRestaurant] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');


    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/restaurants')
        .then((response) => {
            setRestaurant(response.data);
        })
        .catch((error) => {
            console.error('Gagal memuat data makanan:', error);
        });    
    }, []);

    const filteredRestaurants = restaurant.filter(r =>
        r.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        r.location.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (r.cuisine?.name?.toLowerCase() || '').includes(searchQuery.toLowerCase())
    );

    return (
        <div className="container mt-5">
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Cari restoran berdasarkan nama, lokasi, atau jenis masakan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />

            <div className="d-flex overflow-auto"
                style={{
                    scrollSnapType: 'x mandatory',
                    gap: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                {filteredRestaurants.map((restaurant) => (
                <div
                    key={restaurant.id}
                    className="flex-shrink-0"
                    style={{
                        scrollSnapAlign: 'start',
                        width: '100%',
                        minWidth: '300px',   
                        maxWidth: '400px',    
                    }}
                >
                    <RestaurantCard restaurant={restaurant} />
                </div>
                ))}
            </div>
        </div>
    );
};

export default RestaurantList;
