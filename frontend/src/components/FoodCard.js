const FoodCard = ({ food }) => {
    console.log(food.image_url);   
    console.log(food);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img 
                    src={`http://localhost:8000${food.image_url}`}

                    className="card-img-top"
                    alt={food.name}
                    style={{ height: '200px', objectFit: 'cover' }}
                />
                {console.log('Image Path:', food.image_url)}
        
            <div className="card-body">
                <h5 className="card-title">{food.name}</h5>
                <p className="card-text">{food.description}</p>
                <p className="card-text">
                    <strong>Harga:</strong> Rp {food.price}
                </p>
                <p className="card-text text-muted">
                <small><strong>Restoran:</strong> {food.restaurant?.name || food.restaurant_name}</small><br />
                <small><strong>Masakan:</strong> {food.cuisine?.name || food.cuisine_name}</small>
                </p>
                <a
                    href={`https://wa.me/${food.restaurant?.phone.replace(/^0/, '62')}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-success"
                    >
                    Pesan via WhatsApp
                </a>

            </div>
        </div>
        </div>
    );
};

export default FoodCard;
