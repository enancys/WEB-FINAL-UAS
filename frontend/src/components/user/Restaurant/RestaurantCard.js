import { useNavigate } from 'react-router-dom';


const RestaurantCard = ({ restaurant }) => {

    const navigate = useNavigate();


    const handleClick = () => {
        navigate(`/restaurant/${restaurant.id}`);
    };

    return (
        <div className="mb-4 d-flex" style={{ width: '400px', cursor: 'pointer'}} onClick={handleClick}> 
            <div className="card shadow-sm d-flex flex-column w-100" style={{ height: '600px' }}>
                <img 
                    src={`http://localhost:8000${restaurant.image_url}`}
                    className="card-img-top"
                    alt={restaurant.name}
                    style={{ height: '200px', objectFit: 'fit' }}
                />
                            
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">{restaurant.name}</h5>
                    <p className="card-text"><strong>Lokasi:</strong> {restaurant.location}</p>
                    <p className="card-text"><strong>Telepon:</strong> {restaurant.phone}</p>
                    <p className="card-text"><strong>Masakan:</strong> {restaurant.cuisine?.name || restaurant.cuisine_name}</p>
                    <p className="card-text"><strong>Jam Buka:</strong> {restaurant.opening_hours}</p>
                    <p className="card-text"><strong>Rating:</strong> {restaurant.rating}</p>
                    <p className="card-text">{restaurant.description}</p>

                    <div className="mt-auto">
                        {restaurant.website_url && (
                            <a 
                                href={restaurant.website_url.startsWith("http") ? restaurant.website_url : `http://${restaurant.website_url}`}
                                className="btn btn-primary btn-sm w-100"
                                target="_blank"
                                rel="noopener noreferrer">
                                Kunjungi Website
                            </a>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RestaurantCard;
