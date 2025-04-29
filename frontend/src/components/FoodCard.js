const FoodCard = ({ food }) => {
    console.log(food.image_url);    
    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-sm">
                <img 
                    src={`http://localhost:8000/images/${food.image_url}`}
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
                    <small><strong>Restoran:</strong> {food.restaurant_name}</small><br />
                    <small><strong>Masakan:</strong> {food.cuisine_name}</small>
                </p>
            </div>
        </div>
        </div>
    );
};

export default FoodCard;
