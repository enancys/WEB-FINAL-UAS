import React, { useEffect, useState } from 'react';
import ComponentNavbar from '../../components/user/ComponentNavbar';
import ComponentFooter from '../../components/user/ComponentFooter';
import axios from 'axios'; 
import { useNavigate } from 'react-router-dom';

const ProfilePreferences = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [categories, setCategories] = useState([]);
    const [cuisines, setCuisines] = useState([]);
    const [favIngredients, setFavIngredients] = useState([]);
    const [disIngredients, setDisIngredients] = useState([]);
    const [restrictions, setRestrictions] = useState([]);

    const [selectedCategory, setSelectedCategory] = useState('');
    const [selectedCuisine, setSelectedCuisine] = useState('');
    const [selectedFavIngredients, setSelectedFavIngredients] = useState('');
    const [selectedDisIngredients, setSelectedDisIngredients] = useState('');
    const [selectedRestriction, setSelectedRestriction] = useState('');

    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const [catRes, cuiRes, ingFavRes, ingDisRes, resRes] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/categories'),
                axios.get('http://127.0.0.1:8000/api/cuisines'),
                axios.get('http://127.0.0.1:8000/api/ingredients'),
                axios.get('http://127.0.0.1:8000/api/ingredients'),
                axios.get('http://127.0.0.1:8000/api/restrictions'),
                ]);
        
                console.log(ingFavRes.data); 
                setCategories(catRes.data);
                setCuisines(cuiRes.data);
                setFavIngredients(ingFavRes.data);
                setDisIngredients(ingDisRes.data);
                setRestrictions(resRes.data);
            } catch (err) {
                console.error('Gagal mengambil data preferensi:', err);
            }
        };
        
        fetchPreferences();
    }, []);

    const handleSavePreferences = async () => {
        try {
            if (!userId) {
                alert('User ID tidak ditemukan. Silakan login ulang.');
                return;
            }
    
            const res = await axios.get(`http://127.0.0.1:8000/api/user_preferences/by_user/${userId}`);
            
            if (!res.data.id) {
                alert('Preferensi tidak ditemukan. Memulai preferensi baru...');
                return;
            }
    
            const preferenceId = res.data.id;
    
            console.log('Data yang dikirim:', {
                user_preference_id: preferenceId,
                category_id: selectedCategory,
                cuisine_id: selectedCuisine,
                ingredient_id: selectedFavIngredients,
                restriction_id: selectedRestriction,
            });
    
            if (selectedCategory) {
                await axios.post('http://127.0.0.1:8000/api/user_favorite_categories', {
                    user_preference_id: preferenceId,
                    category_id: selectedCategory,
                });
            }
            if (selectedCuisine) {
                await axios.post('http://127.0.0.1:8000/api/user_favorite_cuisines', {
                    user_preference_id: preferenceId,
                    cuisine_id: selectedCuisine,
                });
            }
    
            if (selectedFavIngredients) {
                await axios.post('http://127.0.0.1:8000/api/fav_category_ingredients', {
                    user_preference_id: preferenceId,
                    ingredient_id: selectedFavIngredients,
                });

            }

            if (selectedDisIngredients) {
                await axios.post('http://127.0.0.1:8000/api/user_disliked_ingredients', {
                    user_preference_id: preferenceId,
                    ingredient_id: selectedDisIngredients,
                });
            }
    
            if (selectedRestriction) {
                await axios.post('http://127.0.0.1:8000/api/user_dietary_resctrictions', { 
                    user_preference_id: preferenceId,
                    restriction_id: selectedRestriction,
                });
            }
    
            alert('Preferensi berhasil disimpan!');
        } catch (error) {
            console.error('Gagal menyimpan preferensi:', error.response?.data || error.message);
            alert('Terjadi kesalahan saat menyimpan preferensi.');
        }
    };
    


    return (
        <div>
            <ComponentNavbar />
            <div className="container mt-5 mb-5">
            <h2>Pengaturan Preferensi Makanan</h2>
            <form>
                <div className="form-group">
                <label htmlFor="category">Kategori</label>
                <select
                    className="form-control"
                    id="categories"
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                >
                    <option value="">-- Pilih Kategori --</option>
                    {categories.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="cuisine">Jenis Masakan (Cuisine)</label>
                <select
                    className="form-control"
                    id="cuisines"
                    value={selectedCuisine}
                    onChange={(e) => setSelectedCuisine(e.target.value)}
                >
                    <option value="">-- Pilih Masakan --</option>
                    {cuisines.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="ingredient">Bahan Makanan Favorit</label>
                <select
                    className="form-control"
                    id="favIngredients"
                    value={selectedFavIngredients}
                    onChange={(e) => setSelectedFavIngredients(e.target.value)}
                >
                    <option value="">-- Pilih Bahan --</option>
                    {favIngredients.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="ingredient">Bahan Makanan Dihindari</label>
                <select
                    className="form-control"
                    id="disIngredients"
                    value={selectedDisIngredients}
                    onChange={(e) => setSelectedDisIngredients(e.target.value)}
                >
                    <option value="">-- Pilih Bahan --</option>
                    {disIngredients.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                </div>

                <div className="form-group">
                <label htmlFor="restriction">Pantangan / Restriksi</label>
                <select
                    className="form-control"
                    id="restrictions"
                    value={selectedRestriction}
                    onChange={(e) => setSelectedRestriction(e.target.value)}
                >
                    <option value="">-- Pilih Restriksi --</option>
                    {restrictions.map((item) => (
                    <option key={item.id} value={item.id}>{item.name}</option>
                    ))}
                </select>
                </div>
            </form>
            <button className="btn btn-primary mt-3" onClick={handleSavePreferences}>
                Simpan Preferensi
            </button>
            </div>

            <ComponentFooter />
        </div>
        );
    };
    

export default ProfilePreferences;
