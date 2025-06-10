import React from 'react';
import RestaurantList from '../../components/user/Restaurant/RestaurantList';
import ComponentFooter from '../../components/user/ComponentFooter';
import ComponentNavbar from '../../components/user/ComponentNavbar';

const RestaurantPage = () => {
    return (
        <div>
            <ComponentNavbar/>
            <div className="py-5 text-dark mt-5">
                <div className="container">
                    <div className="card shadow-sm rounded-5">

                        <div className="card-body">

                            <h2 className="mb-4 text-center text-black">Rekomendasi Restaurants</h2>
                            <RestaurantList />
                        </div>
                    </div>
                </div>
            </div>
        <ComponentFooter/>
        </div>
    );
}

export default RestaurantPage;
