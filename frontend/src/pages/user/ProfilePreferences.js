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

                console.log(favRes.data.data);
                setCategories(catRes.data.data);
                setCuisines(cuiRes.data.data);
                setFavIngredients(favRes.data.data);
                setDisIngredients(disRes.data.data);
                setRestrictions(resRes.data.data);
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
                for (const disIngId of selectedDisIngredients) {
                    await axios.post('http://127.0.0.1:8000/api/user_disliked_ingredients', {
                        user_preference_id: preferenceId,
                        ingredient_id: disIngId,
                    });
                }
            }

            if (selectedRestriction.length > 0) {
                for (const ResId of selectedRestriction) {
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
            <div className="container mt-5 mb-5 py-5">
                <div className='card shadow p-4'>
                    <h2 className='mb-4 text-center'>Pengaturan Preferensi Makanan</h2>
                    <form>

                        <div className="mb-4">
                            <label className="form-label fw-semibold text-dark mb-2 d-block">
                                <i className="fas fa-tags me-2 text-primary"></i>
                                Kategori
                            </label>

                            <div className="position-relative">
                                <select
                                    className="form-select py-2 px-3 border-2 border-primary rounded-3 shadow-sm"
                                    multiple
                                    value={selectedCategory}
                                    onChange={(e) => setSelectedCategory(Array.from(e.target.selectedOptions, opt => opt.value))}
                                    style={{
                                        minHeight: '120px',
                                        backgroundColor: 'rgba(245, 245, 245, 0.8)',
                                        cursor: 'pointer'
                                    }}
                                >
                                    {categories.map((item) => (
                                        <option
                                            key={item.id}
                                            value={item.id}
                                            className="px-3 py-2 my-1 rounded-2"
                                            style={{
                                                transition: 'all 0.2s',
                                                borderLeft: '3px solid transparent'
                                            }}
                                        >
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                                <div className="position-absolute top-0 end-0 mt-2 me-2">
                                    <i className="fas fa-chevron-down text-muted"></i>
                                </div>
                            </div>

                            <div className="mt-3">
                                <div className="d-flex align-items-center mb-2">
                                    <i className="fas fa-check-circle text-success me-2"></i>
                                    <strong className="text-dark">Yang Dipilih:</strong>
                                </div>

                                <div className="d-flex flex-wrap gap-2">
                                    {selectedCategory.length === 0 ? (
                                        <div className="text-muted fst-italic">
                                            <i className="fas fa-info-circle me-1"></i>
                                            Belum memilih kategori
                                        </div>
                                    ) : (
                                        selectedCategory.map((id) => {
                                            const cat = categories.find(cat => cat.id.toString() === id);
                                            return cat ? (
                                                <span
                                                    key={id}
                                                    className="badge rounded-pill py-2 px-3 d-flex align-items-center"
                                                    style={{
                                                        backgroundColor: '#e3f2fd',
                                                        color: '#0d6efd',
                                                        fontSize: '0.9rem',
                                                        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
                                                    }}
                                                >
                                                    {cat.name}
                                                    <button
                                                        type="button"
                                                        className="btn-close btn-close-white ms-2"
                                                        style={{
                                                            fontSize: '0.6rem',
                                                            opacity: '0.7'
                                                        }}
                                                        onClick={() => setSelectedCategory(selectedCategory.filter(c => c !== id))}
                                                        aria-label={`Hapus ${cat.name}`}
                                                    ></button>
                                                </span>
                                            ) : null;
                                        })
                                    )}
                                </div>
                            </div>
                        </div>

                        {/* Cuisine */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Jenis Masakan</label>
                            <select className="form-select" multiple value={selectedCuisine}
                                onChange={(e) => setSelectedCuisine(Array.from(e.target.selectedOptions, opt => opt.value))}>
                                {cuisines.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <div className="mt-2">
                                <strong>Yang Dipilih:</strong>{" "}
                                {selectedCuisine.length === 0 ? <em>Tidak ada</em> :
                                    selectedCuisine.map((id) => {
                                        const cui = cuisines.find(cui => cui.id.toString() === id);
                                        return cui ? <span key={id} className='badge bg-success me-1 mb-1'>{cui.name}</span> : null;
                                    })}
                            </div>
                        </div>

                        {/* Bahan Favorit */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Bahan Favorit</label>
                            <select className="form-select" multiple value={selectedFavIngredients}
                                onChange={(e) => setSelectedFavIngredients(Array.from(e.target.selectedOptions, opt => opt.value))}>
                                {favIngredients.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <div className="mt-2">
                                <strong>Yang Dipilih:</strong>{" "}
                                {selectedFavIngredients.length === 0 ? <em>Tidak ada</em> :
                                    selectedFavIngredients.map((id) => {
                                        const ing = favIngredients.find(i => i.id.toString() === id);
                                        return ing ? <span key={id} className='badge bg-info text-dark me-1 mb-1'>{ing.name}</span> : null;
                                    })}
                            </div>
                        </div>

                        {/* Bahan Dihindari */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Bahan Dihindari</label>
                            <select className="form-select" multiple value={selectedDisIngredients}
                                onChange={(e) => setSelectedDisIngredients(Array.from(e.target.selectedOptions, opt => opt.value))}>
                                {disIngredients.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <div className="mt-2">
                                <strong>Yang Dipilih:</strong>{" "}
                                {selectedDisIngredients.length === 0 ? <em>Tidak ada</em> :
                                    selectedDisIngredients.map((id) => {
                                        const ing = disIngredients.find(i => i.id.toString() === id);
                                        return ing ? <span key={id} className='badge bg-danger me-1 mb-1'>{ing.name}</span> : null;
                                    })}
                            </div>
                        </div>

                        {/* Restriksi */}
                        <div className="mb-4">
                            <label className="form-label fw-semibold">Pantangan / Restriksi</label>
                            <select className="form-select" multiple value={selectedRestriction}
                                onChange={(e) => setSelectedRestriction(Array.from(e.target.selectedOptions, opt => opt.value))}>
                                {restrictions.map((item) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))}
                            </select>
                            <div className="mt-2">
                                <strong>Yang Dipilih:</strong>{" "}
                                {selectedRestriction.length === 0 ? <em>Tidak ada</em> :
                                    selectedRestriction.map((id) => {
                                        const res = restrictions.find(r => r.id.toString() === id);
                                        return res ? <span key={id} className='badge bg-warning text-dark me-1 mb-1'>{res.name}</span> : null;
                                    })}
                            </div>
                        </div>
                    </form>
                    <div className="text-center">
                        <button className="btn btn-primary mt-3 px-4" onClick={handleSavePreferences}>
                            Simpan Preferensi
                        </button>
                    </div>
                </div>
            </div>
            <ComponentFooter />
        </div>
    );
};


export default ProfilePreferences;
