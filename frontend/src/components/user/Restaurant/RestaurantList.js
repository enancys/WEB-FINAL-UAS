import React, { useEffect, useState } from 'react';
import axios from 'axios';
import RestaurantCard from './RestaurantCard';

const RestaurantList = () => {
    const [restaurant, setRestaurant] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, SetSortOrder] = useState('asc');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/restaurants')
        .then((response) => {
            setRestaurant(response.data.data);
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

    const sortedFoods = [...filteredRestaurants].sort((a,b) => {
        let varA = a[sortBy];
        let varB = b[sortBy];

        if(sortBy === 'rating') {
            varA = parseFloat(a.rating || 0);
            varB = parseFloat(b.rating || 0);
        } else if(sortBy === 'location') {
            varA = a.location || 0;
            varB = b.location || 0;
        } else {
            varA = a[sortBy]?.toString().toLowerCase() || '';
            varB = b[sortBy]?.toString().toLowerCase() || '';
        }

        if(varA < varB) return sortOrder === 'asc' ? -1 : 1;
        if(varA > varB) return sortOrder === 'asc' ? 1 : -1;

        return 0;
    });
    

    return (
        <div className="container mt-5">
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Cari restoran berdasarkan nama, lokasi, atau jenis masakan..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
            <div className='d-flex mb-4 gap-3'>
                <select
                    className='form-select w-auto'
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                >
                    <option value="name">Nama</option>
                    <option value="rating">Rating</option>
                    <option value="location">Location</option>
                </select>
                <select
                    className='form-select w-auto'
                    value={sortOrder}
                    onChange={(e) => SetSortOrder(e.target.value)}
                >
                    <option value='asc'>Naik</option>
                    <option value='desc'>Turun</option>

                </select>
            </div>

            <div className="d-flex overflow-auto"
                style={{
                    scrollSnapType: 'x mandatory',
                    gap: '1rem',
                    paddingBottom: '1rem',
                }}
            >
                {sortedFoods.map((restaurant) => (
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
