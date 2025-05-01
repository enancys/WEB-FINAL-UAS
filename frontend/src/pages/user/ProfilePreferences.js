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

    // const [selectedCategory, setSelectedCategory] = useState('');
    // const [selectedCuisine, setSelectedCuisine] = useState('');
    // const [selectedFavIngredients, setSelectedFavIngredients] = useState('');
    // const [selectedDisIngredients, setSelectedDisIngredients] = useState('');
    // const [selectedRestriction, setSelectedRestriction] = useState('');

    const [selectedCategory, setSelectedCategory] = useState([]);
    const [selectedCuisine, setSelectedCuisine] = useState([]);
    const [selectedFavIngredients, setSelectedFavIngredients] = useState([]);
    const [selectedDisIngredients, setSelectedDisIngredients] = useState([]);
    const [selectedRestriction, setSelectedRestriction] = useState([]);


    

    const userId = localStorage.getItem('id');

    useEffect(() => {
        const fetchPreferences = async () => {
            try {
                const [catRes, cuiRes, favRes, disRes, resRes] = await Promise.all([
                axios.get('http://127.0.0.1:8000/api/categories'),
                axios.get('http://127.0.0.1:8000/api/cuisines'),
                axios.get('http://127.0.0.1:8000/api/ingredients'),
                axios.get('http://127.0.0.1:8000/api/ingredients'),
                axios.get('http://127.0.0.1:8000/api/restrictions'),
                ]);
        
                console.log(favRes.data); 
                setCategories(catRes.data);
                setCuisines(cuiRes.data);
                setFavIngredients(favRes.data);
                setDisIngredients(disRes.data);
                setRestrictions(resRes.data);
            } catch (err) {
                console.error('Gagal mengambil data preferensi:', err);
            }
        };
        
        fetchPreferences();
    }, []);
    const navigate = useNavigate();

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
    
            if (selectedCategory.length > 0) {
                for (const catId of selectedCategory) {
                    await axios.post('http://127.0.0.1:8000/api/user_favorite_category', {
                        user_preference_id: preferenceId,
                        category_id: catId,
                    });
                }
            }

            if (selectedCuisine.length > 0) {
                for (const cuiId of selectedCuisine) {
                    await axios.post('http://127.0.0.1:8000/api/user_favorite_cuisines', {
                        user_preference_id: preferenceId,
                        cuisine_id: cuiId,
                    });
                }
            }
            
            if (selectedFavIngredients.length > 0) {
                for (const favIngId of selectedFavIngredients) {
                    await axios.post('http://127.0.0.1:8000/api/user_favorite_ingredients', {
                        user_preference_id: preferenceId,
                        ingredient_id: favIngId,
                    });
                }
            }

            if (selectedDisIngredients.length > 0) {
                for(const disIngId of selectedDisIngredients) {
                    await axios.post('http://127.0.0.1:8000/api/user_disliked_ingredients', {
                        user_preference_id: preferenceId,
                        ingredient_id: disIngId,
                    });
                }
            }
            
            if (selectedRestriction.length > 0) {
                for(const ResId of selectedRestriction) {
                    await axios.post('http://127.0.0.1:8000/api/user_dietary_resctrictions', { 
                        user_preference_id: preferenceId,
                        restriction_id: ResId,
                    });
                }
            }

            
            // if (selectedCuisine) {
            //     await axios.post('http://127.0.0.1:8000/api/user_favorite_cuisines', {
            //         user_preference_id: preferenceId,
            //         cuisine_id: selectedCuisine,
            //     });
            // }
    
            // if (selectedFavIngredients) {
            //     await axios.post('http://127.0.0.1:8000/api/user_favorite_ingredients', {
            //         user_preference_id: preferenceId,
            //         ingredient_id: selectedFavIngredients,
            //     });

            // }

            // if (selectedDisIngredients) {
            //     await axios.post('http://127.0.0.1:8000/api/user_disliked_ingredients', {
            //         user_preference_id: preferenceId,
            //         ingredient_id: selectedDisIngredients,
            //     });
            // }
    
            // if (selectedRestriction) {
            //     await axios.post('http://127.0.0.1:8000/api/user_dietary_resctrictions', { 
            //         user_preference_id: preferenceId,
            //         restriction_id: selectedRestriction,
            //     });
            // }
    
            alert('Preferensi berhasil disimpan!');
            navigate('/foods'); 
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
                {/* Category */}
                <div className="form-group">
                    <label htmlFor="category">Kategori</label>
                    <select
                        className="form-control"
                        id="categories"
                        multiple
                        value={selectedCategory}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                            setSelectedCategory(selected);
                        }}
                    >
                    {categories.map((item) => (
                        <option key={item.id} value={item.id}>
                        {item.name}
                        </option>
                    ))}
                    </select>
                    <div className='mt-2'>
                        <strong>Yang Dipilih:</strong>
                        {selectedCategory.length === 0 ?
                            <em>Tidak ada yang dipilih</em> :
                            selectedCategory.map((id) => {
                                const category = categories.find(cat => cat.id.toString() === id);
                                return category ? (
                                    <span key={id} className='badge bg-secondary me-1'>{category.name}</span>
                                ) : null;
                            })
                        }
                    </div>
                </div>

                {/* Cuisines */}
                <div className="form-group">
                    <label htmlFor="cuisine">Jenis Masakan (Cuisine)</label>
                    <select
                        className="form-control"
                        id="cuisines"
                        multiple
                        value={selectedCuisine}
                        onChange={(e) => {

                            const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                            setSelectedCuisine(selected);

                        }}
                    >
                    {cuisines.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                    </select>
                    <div className='mt-2'>
                        <strong>Yang Dipilih:</strong>
                        {selectedCuisine.length === 0 ?
                            <em>Tidak ada yang dipilih</em> :
                            selectedCuisine.map((id) => {
                                const cuisine =  cuisines.find(cui => cui.id.toString() === id);
                                return cuisine ? (
                                    <span key={id} className='badge bg-secondary me-1'>{cuisine.name}</span>
                                ) : null                        
                            })}
                    </div>
                </div>

                {/* Fav Ingredients */}
                <div className="form-group">
                    <label htmlFor="ingredient">Bahan Makanan Favorit</label>
                    <select
                        className="form-control"
                        id="favIngredients"
                        multiple   
                        value={selectedFavIngredients}
                        onChange={(e) => {
                            const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                            setSelectedFavIngredients(selected);
                        }}
                    >
                    {favIngredients.map((item) => (
                        <option key={item.id} value={item.id}>
                            {item.name}
                        </option>
                    ))}
                    </select>
                    <div className='mt-2'>
                        <strong>Yang Dipilih:</strong>
                        {selectedFavIngredients.length === 0 ?
                            <em>Tidak ada yang dipilih</em> :
                            selectedFavIngredients.map((id) => {
                                const selectedIngredient  =  favIngredients.find(favIng => favIng.id.toString() === id);
                                return selectedIngredient ? (
                                    <span key={id} className='badge bg-secondary me-1'>{selectedIngredient.name}</span>
                                ) : null                        
                            })}
                    </div>
                </div>

                {/* Disliked Ingredients */}
                <div className="form-group">
                <label htmlFor="ingredient">Bahan Makanan Dihindari</label>
                <select
                    className="form-control"
                    id="disIngredients"
                    multiple
                    value={selectedDisIngredients}
                    onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                        setSelectedDisIngredients(selected);
                    }}
                >
                {disIngredients.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
                </select>
                <div className='mt-2'>
                    <strong>Yang Dipilih:</strong>
                    {selectedDisIngredients.length === 0 ?
                            <em>Tidak ada yang dipilih</em> :
                            selectedDisIngredients.map((id) => {
                                const selectedIngredient  =  disIngredients.find(disIng => disIng.id.toString() === id);
                                return selectedIngredient ? (
                                    <span key={id} className='badge bg-secondary me-1'>{selectedIngredient.name}</span>
                                ) : null                        
                            })}
                    </div>
                </div>
                
                {/* Resctrictions */}
                <div className="form-group">
                <label htmlFor="restriction">Pantangan / Restriksi</label>
                <select
                    className="form-control"
                    id="restrictions"
                    multiple
                    value={selectedRestriction}
                    onChange={(e) => {
                        const selected = Array.from(e.target.selectedOptions, opt => opt.value);
                        setSelectedRestriction(selected);
                    }}
                >
                {restrictions.map((item) => (
                    <option key={item.id} value={item.id}>
                        {item.name}
                    </option>
                ))}
                </select>
                    <div className='mt-2'>
                        <strong>Yang Dipilih:</strong>
                        {selectedRestriction.length === 0 ?
                            <em>Tidak ada yang dipilih</em> :
                            selectedRestriction.map((id) => {
                                const restriction  =  restrictions.find(resc => resc.id.toString() === id);
                                return restriction ? (
                                    <span key={id} className='badge bg-secondary me-1'>{restriction.name}</span>
                                ) : null                        
                            })}
                    </div>
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
