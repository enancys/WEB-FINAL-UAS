import React, { useEffect, useState } from "react";
import axios from "axios";
import FoodPreferencesCard from "./FoodPreferencesCard";
import ComponentNavbar from "./user/ComponentNavbar";
import ComponentFooter from "./user/ComponentFooter";
import FoodList from "./FoodList";

const FoodPreferencesList = ({ id }) => {

    const [foods, setFoods] = useState([]);
    console.log('ID PREF USER: ', id);

    useEffect(() => {
        axios.get(`http://127.0.0.1:8000/api/recomendation/${id}`)
            .then((response) => {
                console.log("Data dari API:", response.data.data);
                setFoods(response.data.recommendations);
            })
            .catch((error) => {
                console.log("Gagal Memuat Data ", error);
            })
    }, [id]);

    return (
        <div>
            <ComponentNavbar />
            <div className="container mt-5 py-5">
                <div className="card shadow-sm rounded-5">
                    <div className="card-body">

                        <h2 className="mb-4">Rekomendasi Makanan Anda</h2>
                        <div className="row g-4">
                            {foods.length > 0 ? (
                                foods.map((food) => (
                                    <FoodPreferencesCard key={food.id} food={food} />
                                ))
                            ) : (
                                <p className="text-muted">Tidak ada rekomendasi saat ini.</p>
                            )}
                        </div>
                    </div>
                </div>

                <hr className="my-5" />

                <FoodList />
            </div>
            <ComponentFooter />
        </div>
    );
};



export default FoodPreferencesList;