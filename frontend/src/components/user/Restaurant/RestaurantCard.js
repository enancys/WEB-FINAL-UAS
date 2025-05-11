import { useNavigate } from 'react-router-dom';

const RestaurantCard = ({ restaurant }) => {
    const navigate = useNavigate();

    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    const imageUrl = restaurant.image_url
        ? `http://localhost:8000${restaurant.image_url}`
        : 'https://via.placeholder.com/400x200?text=No+Image';

    return (
        <div className="card h-100 shadow-sm rounded-4 border-0 d-flex flex-column" onClick={handleClick} style={{ cursor: 'pointer' }}>
            <img
                src={imageUrl}
                className="card-img-top rounded-top-4"
                alt={restaurant.name}
                style={{ height: '220px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <h5 className="card-title fw-bold text-primary mb-2">{restaurant.name}</h5>
                <p className="card-text mb-1"><strong>📍 Lokasi:</strong> {restaurant.location}</p>
                <p className="card-text mb-1"><strong>📞 Telepon:</strong> {restaurant.phone}</p>
                <p className="card-text mb-1"><strong>🍽️ Masakan:</strong> {restaurant.cuisine?.name || restaurant.cuisine_name}</p>
                <p className="card-text mb-1"><strong>🕒 Jam Buka:</strong> {restaurant.opening_hours}</p>
                <p className="card-text mb-2"><strong>⭐ Rating:</strong> {restaurant.rating}</p>
                <p className="card-text text-muted small">{restaurant.description}</p>

                <div className="mt-auto">
                    {restaurant.website_url && (
                        <a
                            href={restaurant.website_url.startsWith("http")
                                ? restaurant.website_url
                                : `http://${restaurant.website_url}`}
                            className="btn btn-outline-primary btn-sm w-100 rounded-pill mt-2"
                            target="_blank"
                            rel="noopener noreferrer"
                            onClick={(e) => e.stopPropagation()}
                        >
                            🌐 Kunjungi Website
                        </a>
                    )}
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
