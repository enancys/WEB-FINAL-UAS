import React, {useEffect, useState } from "react";
import axios from "axios";
import FoodPreferencesCard from "./FoodPreferencesCard";
import ComponentNavbar from "./user/ComponentNavbar";
import ComponentFooter from "./user/ComponentFooter";
import FoodList from "./FoodList";

const FoodPrefrencesList = ({id}) => {

    const [foods, setFoods] = useState([]);
    console.log('ID PREF USER: ', id);

    useEffect(() => {   
        axios.get(`http://127.0.0.1:8000/api/recomendation/${id}`)
        .then((response) => {
            console.log("Data dari API:", response.data); 
            setFoods(response.data.recommendations);
        })
        .catch((error) => {
            console.log("Gagal Memuat Data ", error);
        })
    }, [id]);

    return (
        <div>
            <ComponentNavbar />
            <div className="container mt-5">
                <h2>Rekomendasi Makanan Anda</h2>
                <div className="row">
                    {foods.length > 0 ? (
                        foods.map((food) => (
                            <FoodPreferencesCard key={food.id} food={food} />
                        ))
                    ) : (
                        <p>Tidak ada rekomendasi saat ini.</p>
                    )}
                </div>
    
                <hr className="my-5" />
    
                <FoodList />
            </div>
            <ComponentFooter />
        </div>
    );
};



export default FoodPrefrencesList;