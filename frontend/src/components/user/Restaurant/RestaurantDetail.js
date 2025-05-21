import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";
import FoodCard from "../../FoodCard";
import ComponentNavbar from "../ComponentNavbar";
import ComponentFooter from "../ComponentFooter";

const RestaurantDetail = () => {
    const { id } = useParams();
    const [foods, setFoods] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, SetSortOrder] = useState('asc');

    useEffect(() => {
        axios.get('http://127.0.0.1:8000/api/restaurant_foods')
            .then((res) => {
                const filtered = res.data.data.filter(item => item.restaurant_id.toString() === id);
                
                setFoods(filtered.map(item => ({
                    ...item.food,
                    restaurant_name: item.restaurant?.name ?? '',
                    cuisine_name: item.food.cuisine?.name ?? '',
                    cuisine: item.food.cuisine ?? null,
                    ingredients: item.food.ingredients ?? [],
                    restaurant: item.restaurant,
                })));


                if (filtered.length > 0) {
                    setRestaurant(filtered[0].restaurant);
                }
            })
            .catch((err) => console.error('Gagal ambil data:', err));
    }, [id]);

    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    const filteredFoods = foods.filter(food =>
        food.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        food.description.toLowerCase().includes(searchQuery.toLowerCase())
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
        if(varA < varB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    })

    return (
        <div>
            <ComponentNavbar />

            <div className="container mt-4">

                {restaurant?.name ? (
                    <div className="card mb-5 shadow-lg border-0 rounded-4">
                        <img
                            src={`http://localhost:8000${restaurant.image_url || '/default-image.jpg'}`}
                            className="card-img-top rounded-top-4"
                            alt={restaurant.name}
                            style={{ height: '250px', objectFit: 'cover' }}
                        />
                        <div className="card-body">
                            <h2 className="card-title fw-bold text-primary">{restaurant.name}</h2>
                            <p className="card-text"><strong>Deskripsi:</strong> {restaurant.description}</p>
                            <p className="card-text"><strong>Lokasi:</strong> {restaurant.location}</p>
                            <p className="card-text"><strong>Jam Buka:</strong> {restaurant.opening_hours}</p>
                            <p className="card-text"><strong>Telepon:</strong> {restaurant.phone}</p>
                            <p className="card-text"><strong>Rating:</strong> {restaurant.rating}</p>
                            {restaurant.website_url && (
                                <a
                                    href={restaurant.website_url.startsWith("http") ? restaurant.website_url : `http://${restaurant.website_url}`}
                                    className="btn btn-outline-primary mt-2"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    Kunjungi Website
                                </a>
                            )}
                        </div>
                    </div>
                ) : (
                    <p className="text-muted">Memuat informasi restoran...</p>
                )}

                <div className="mb-4">
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Cari makanan..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                    />
                </div>

                <div className="d-flex mb-4 gap-3">
                    <select
                        className="form-select w-auto"
                        value={sortBy}
                        onChange={(e) => setSortBy(e.target.value)}
                    >
                        <option value="name">Nama</option>
                        <option value="price">harga</option>
                        <option value="rating">Rating</option>
                    </select>
                    <select
                        className="form-select w-auto"
                        value={sortOrder}
                        onChange={(e) => SetSortOrder(e.target.value)}
                    >
                        <option value="asc">Naik</option>
                        <option value="desc">Turun</option>

                    </select>
                </div>

                <h4 className="mb-3">Menu yang tersedia:</h4>
                <div className="row">
                    {sortedFoods.length > 0 ? (
                        sortedFoods.map(food => (
                            <FoodCard key={food.id} food={food} />
                        ))
                    ) : (
                        <p className="text-muted">Tidak ada makanan ditemukan.</p>
                    )}
                </div>
            </div>

            <ComponentFooter />
        </div>
    );
};

export default RestaurantDetail;
