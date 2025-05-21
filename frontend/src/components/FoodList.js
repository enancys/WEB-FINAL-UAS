import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';

const FoodList = () => {
    const [foods, setFoods] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy ,setSortBy] = useState('name');
    const [sortOrder, SetSortOrder] = useState('asc');

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.category?.name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.cuisine?.name?.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const sortedFoods = [...filteredFoods].sort((a, b) => {
        let varA = a[sortBy];
        let varB = b[sortBy];

        if(sortBy === 'rating') {
            varA = parseFloat(a.restaurant?.rating || 0);
            varB = parseFloat(b.restaurant?.rating || 0);
        } else if(sortBy === 'price') {
            varA = parseFloat(a.price || 0);
            varB = parseFloat(b.price || 0);
        } else {
            varA = a[sortBy]?.toString().toLowerCase() || '';
            varB = b[sortBy]?.toString().toLowerCase() || '';
        }

        if(varA < varB) return sortOrder === 'asc' ? -1 : 1;
        if(varA > varB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    });

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/foods')
        .then((response) => {
            setFoods(response.data.data);
            })
            .catch((error) => {
            console.error('Gagal memuat data makanan:', error);
            });
        }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Daftar Makanan</h2>
            <input
                type="text"
                className="form-control mb-4"
                placeholder="Cari makanan berdasarkan nama, kategori, atau masakan..."
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
                    <option value="price">Harga</option>
                    <option value="rating">Rating</option>
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
                <div className="row">
                    {sortedFoods.length > 0 ? (
                        sortedFoods.map((food) => (
                            <FoodCard key={food.id} food={food} />
                        ))
                    ) : (
                        <div className='col-12 text-center text-muted'>Tidak ada makanan yang cocok</div>
                    )}
            </div>
    </div>
    );
};

export default FoodList;
