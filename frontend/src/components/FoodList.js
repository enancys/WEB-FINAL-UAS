import React, { useEffect, useState } from 'react';
import axios from 'axios';
import FoodCard from './FoodCard';

const FoodList = () => {
    const [foods, setFoods] = useState([]);

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/foods')
        .then((response) => {
            setFoods(response.data);
            })
            .catch((error) => {
            console.error('Gagal memuat data makanan:', error);
            });
        }, []);

    return (
        <div className="container mt-5">
            <h2 className="mb-4">Daftar Makanan</h2>
                <div className="row">
                    {foods.map((food) => (
                    <FoodCard key={food.id} food={food} />
                    ))}
            </div>
    </div>
    );
};

export default FoodList;
