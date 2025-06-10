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
            <div className="card h-100 shadow-sm rounded-4 d-flex flex-column " onClick={handleClick} style={{ cursor: 'pointer' }}>
                <img
                    src={imageUrl}
                    className="card-img-top rounded-top-4"
                    alt={restaurant.name}
                    style={{ height: '220px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title fw-bold text-bolder mb-2 text-primary">{restaurant.name}</h5>
                    <p className="card-text text-muted small">{restaurant.description}</p>
                    <p className="card-text mb-1"><strong>Rating:</strong> {restaurant.rating}</p>
                </div>
            </div>
        );
    };

    export default RestaurantCard;
