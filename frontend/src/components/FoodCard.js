import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const FoodCard = ({ food }) => {
    const [showModal, setShowModal] = useState(false);

    const imageUrl = food?.image_url
        ? `http://localhost:8000${food.image_url}`
        : 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS88AoVsxmTJpFnHlzAxJYlWG_s_RUMR7w0TA&s';

    const toggleModal = () => setShowModal(!showModal);

    return (
        <div className="col-md-4 mb-4">
            <div className="card h-100 shadow-lg border-0 rounded-4 d-flex flex-row">
                <div style={{ width: '180px', height: '100%', flexShrink: 0 }}>

                    <img
                        src={imageUrl}
                        className="img-fluid h-100 w-100 rounded-start-4"
                        alt={food.name || 'Makanan'}
                        style={{ objectFit: 'cover' }}
                    />
                </div>

                <div className="card-body d-flex flex-column justify-content-between">
                    <h5 className="card-title text-primary fw-bold">
                        {food.name}
                    </h5>
                    <p className="card-text">
                        {food.description.length > 100
                            ? `${food.description.substring(0, 100)}...`
                            : food.description}
                    </p>
                    <p className="card-text">
                        <strong>Price:</strong> Rp. {food.price}
                    </p>
                    <p className="card-text text-muted">
                    </p>
                    <button
                        type="button"
                        className="btn btn-primary mt-2 d-block text-center shadow-sm"
                        onClick={(e) => {
                            e.stopPropagation();
                            toggleModal();
                        }}
                    >
                        See More
                    </button>
                </div>
            </div>

            {showModal && (
                <div className="modal show" style={{ display: 'block', zIndex: 1050 }} tabIndex="-1" role="dialog">
                    <div className="modal-dialog modal-dialog-centered modal-lg" role="document">
                        <div className="modal-content">
                            <div className="modal-header">
                                <h5 className="modal-title">{food.name}</h5>
                                <button type="button" className="btn-close" onClick={toggleModal}></button>
                            </div>
                            <div className="modal-body" style={{ maxHeight: 'calc(100vh - 200px)', overflowY: 'auto' }}>
                                <img
                                    src={imageUrl}
                                    alt={food.name}
                                    className="img-fluid w-100 mb-3"
                                    style={{ objectFit: 'cover', maxHeight: '300px' }}
                                />
                                <p><strong>Deskripsi:</strong> {food.description}</p>
                                <p><strong>Harga:</strong> Rp. {food.price}</p>
                                <p>
                                    <strong>Restoran:</strong>{' '}
                                    <Link to={`/restaurant/${food.restaurant?.id}`} className="text-decoration-none text-primary">
                                        {food.restaurant?.name || food.restaurant_name}
                                    </Link>
                                </p>
                                <p><strong>Restoran Rating:</strong> {food.restaurant?.rating || '0.0'}</p>
                                <p><strong>Masakan:</strong> {food.cuisine?.name || food.cuisine_name}</p>
                                <p><strong>Ingredient:</strong>{' '}
                                    {food.ingredients?.map((ingredient, index) => (
                                        <span key={index}>
                                            {ingredient.name}{index < food.ingredients.length - 1 ? ', ' : ''}
                                        </span>
                                    ))}
                                </p>
                            </div>
                            <div className="modal-footer">
                                <button type="button" className="btn btn-secondary" onClick={toggleModal}>
                                    Tutup
                                </button>
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
                </div>
            )}
        </div>
    );
};

export default FoodCard;
