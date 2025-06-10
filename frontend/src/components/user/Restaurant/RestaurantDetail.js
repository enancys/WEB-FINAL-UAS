import { useParams } from "react-router-dom";
import { useEffect, useState, useRef } from "react";
import axios from "axios";
import FoodCard from "../../FoodCard";
import ComponentNavbar from "../ComponentNavbar";
import ComponentFooter from "../ComponentFooter";
import bgHero from './../../../assets/heroBackground_images.jpg';
import './RestaurantDetail.css';
const RestaurantDetail = () => {
    const { id } = useParams();
    const [foods, setFoods] = useState([]);
    const [restaurant, setRestaurant] = useState({});
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, SetSortOrder] = useState('asc');
    const scrollRef = useRef(null);
    const [currentIndex, setCurrentIndex] = useState(0);
    // const totalImages = restaurant.image_url.length();
    const totalImages = 4;

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

        if (sortBy === 'rating') {
            varA = parseFloat(a.restaurant?.rating || 0);
            varB = parseFloat(b.restaurant?.rating || 0);
        } else if (sortBy === 'price') {
            varA = parseFloat(a.price || 0);
            varB = parseFloat(b.price || 0);
        } else {
            varA = a[sortBy]?.toString().toLowerCase() || '';
            varB = b[sortBy]?.toString().toLowerCase() || '';
        }
        if (varA < varB) return sortOrder === 'asc' ? -1 : 1;
        if (varA < varB) return sortOrder === 'asc' ? 1 : -1;
        return 0;
    })

    const scrollNext = () => {
        setCurrentIndex((prev) => (prev + 1) % totalImages);
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: window.innerWidth, behavior: 'smooth' });
        }
    };

    const scrollPrev = () => {
        setCurrentIndex((prev) => (prev - 1 + totalImages) % totalImages);
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -window.innerWidth, behavior: 'smooth' });
        }
    };



    return (
        <div className="container-fluid p-0 position-relative">
            <ComponentNavbar style={{ position: 'fixed', top: 0, width: '100%', zIndex: 1000 }} />
            <div
                className="carousel-wrapper position-relative"
                style={{
                    height: '340px',
                    marginTop: '88px', 
                    zIndex: 1 
                }}
            >
                <button
                    className="btn btn-dark position-absolute top-50 start-0 translate-middle-y"
                    style={{ zIndex: 2 }}
                    onClick={scrollPrev}
                >
                    ‹
                </button>

                <button
                    className="btn btn-dark position-absolute top-50 end-0 translate-middle-y"
                    style={{ zIndex: 2 }}
                    onClick={scrollNext}
                >
                    ›
                </button>

                <div
                    className="d-flex flex-nowrap overflow-hidden"
                    ref={scrollRef}
                    style={{ scrollBehavior: 'smooth', height: '340px' }}
                >
                    {restaurant?.name ? (
                        <div className="flex-shrink-0" style={{ width: '100vw', height: '100%' }}>
                            <img
                                src={`http://localhost:8000${restaurant.image_url || '/default-image.jpg'}`}
                                className="img-fluid w-100 h-100"
                                alt={restaurant.name}
                                style={{ objectFit: 'cover' }}
                            />
                        </div>
                    ) : (
                        <p className="text-muted">Memuat informasi restoran...</p>
                    )}
                </div>
            </div>

            <div className="container mt-4 mb-5">
                <div className="position-relative justify-content-center bottom-0 start-50 translate-middle-x mb-3 d-flex gap-2">
                    {[...Array(totalImages)].map((_, index) => (
                        <div
                            key={index}
                            className={`rounded-circle ${index === currentIndex ? 'bg-dark' : 'bg-secondary'}`}
                            style={{ width: '10px', height: '10px', opacity: 0.9 }}
                        ></div>
                    ))}
                </div>
                <h1 className="mb-3">{restaurant.name}</h1>

                <p>
                    <strong className="text-success">Buka hingga {restaurant.opening_hours}</strong>{" "}
                </p>

                <p className="mb-3">
                    <i className="bi bi-geo-alt me-2"></i>
                    {restaurant.location}
                </p>

                <div className="d-flex flex-wrap align-items-center gap-4">
                    <a href={restaurant.website_url} className="text-decoration-none fw-semibold">
                        <i className="bi bi-globe me-1"></i>Situs Web
                    </a>

                    <a href="https://menu-link.com" className="text-decoration-none fw-semibold">
                        <i className="bi bi-card-text me-1"></i>Menu
                    </a>

                    <a href="{restaurant.phone}" className="text-decoration-none fw-semibold">
                        <i className="bi bi-telephone me-1"></i>{restaurant.phone}
                    </a>
                </div>
                <div className="d-flex gap-3 mt-4">
                    <button className="btn btn-outline-primary d-flex align-items-center gap-2">
                        <i className="bi bi-heart-fill"></i>
                        Like
                    </button>
                    <button className="btn btn-outline-primary d-flex align-items-center gap-2">
                        <i className="bi bi-star-fill"></i>
                        Review
                    </button>
                </div>
                <p className="mt-4">{restaurant.description}</p>
                <div className="separator-line"></div>
            </div>
            <div className="container mt-4 mb-5">
                <h2 className="mb-3">Menu yang tersedia:</h2>

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
                        <option value="price">Harga</option>
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
            <ComponentFooter/>
        </div>



        // <div className="pt-5">
        //     <ComponentNavbar />

        //     <div className="container mt-4 py-5">

        // {restaurant?.name ? (
        //     <div className="card mb-5 shadow-lg border-0 p-0">
        //         <img
        //             src={`http://localhost:8000${restaurant.image_url || '/default-image.jpg'}`}
        //             className="card-img-top"
        //             alt={restaurant.name}
        //             style={{ height: '250px', objectFit: 'cover', width: '100%', display: 'block' }}
        //         />
        //         <div className="card-body">
        //             <h2 className="card-title fw-bold text-primary">{restaurant.name}</h2>
        //             <p className="card-text"><strong>Deskripsi:</strong> {restaurant.description}</p>
        //             <p className="card-text"><strong>Lokasi:</strong> {restaurant.location}</p>
        //             <p className="card-text"><strong>Jam Buka:</strong> {restaurant.opening_hours}</p>
        //             <p className="card-text"><strong>Telepon:</strong> {restaurant.phone}</p>
        //             <p className="card-text"><strong>Rating:</strong> {restaurant.rating}</p>
        //             {restaurant.website_url && (
        //                 <a
        //                     href={restaurant.website_url.startsWith("http") ? restaurant.website_url : `http://${restaurant.website_url}`}
        //                     className="btn btn-outline-primary mt-2"
        //                     target="_blank"
        //                     rel="noopener noreferrer"
        //                 >
        //                     Kunjungi Website
        //                 </a>
        //             )}
        //         </div>
        //     </div>
        // ) : (
        //     <p className="text-muted">Memuat informasi restoran...</p>
        // )}

        //         <div className="mb-4">
        //             <input
        //                 type="text"
        //                 className="form-control"
        //                 placeholder="Cari makanan..."
        //                 value={searchQuery}
        //                 onChange={handleSearchChange}
        //             />
        //         </div>

        //         <div className="d-flex mb-4 gap-3">
        //             <select
        //                 className="form-select w-auto"
        //                 value={sortBy}
        //                 onChange={(e) => setSortBy(e.target.value)}
        //             >
        //                 <option value="name">Nama</option>
        //                 <option value="price">harga</option>
        //                 <option value="rating">Rating</option>
        //             </select>
        //             <select
        //                 className="form-select w-auto"
        //                 value={sortOrder}
        //                 onChange={(e) => SetSortOrder(e.target.value)}
        //             >
        //                 <option value="asc">Naik</option>
        //                 <option value="desc">Turun</option>

        //             </select>
        //         </div>

        //     <h4 className="mb-3">Menu yang tersedia:</h4>
        //     <div className="row">
        //         {sortedFoods.length > 0 ? (
        //             sortedFoods.map(food => (
        //                 <FoodCard key={food.id} food={food} />
        //             ))
        //         ) : (
        //             <p className="text-muted">Tidak ada makanan ditemukan.</p>
        //         )}
        //     </div>
        // </div>

        //     <ComponentFooter />
        // </div>
    );
};

export default RestaurantDetail;
