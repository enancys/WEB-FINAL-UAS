import React, { useEffect, useState } from 'react';
import ComponentNavbar from '../../components/user/ComponentNavbar';
import ComponentFooter from '../../components/user/ComponentFooter';
import bgHero from './../../assets/heroBackground_images.jpg';

const AboutMePage= () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true'); 
    }, []);

    return (
        <div className="flex flex-col min-h-screen pt-5"
                style={{
                    backgroundImage: `url(${bgHero})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    backgroundRepeat: 'no-repeat',
                }}>
            <ComponentNavbar isLoggedIn={isLoggedIn} />

            <main className="flex-grow px-4 py-12 flex flex-col items-center m-5">
            <div className="bg-transparent shadow-lg rounded-2xl p-8 max-w-4xl w-full text-center">
                <h2 className="text-3xl font-bold mb-6 text-light pt-30">Apa itu WannaEAT?</h2>
                <p className="text-lg text-light leading-relaxed mb-4">
                <strong>WannaEAT</strong> adalah aplikasi rekomendasi makanan berbasis preferensi pribadi. Kami memahami bahwa setiap orang punya selera dan kebutuhan unik — dari pantangan bahan tertentu, pilihan diet, hingga kategori atau masakan favorit.
                </p>
                <p className="text-lg text-light leading-relaxed">
                Dengan WannaEAT, kamu akan mendapatkan saran makanan yang lebih relevan dan sesuai dengan selera serta gaya hidupmu. Kami percaya bahwa makan bukan hanya tentang mengisi perut, tapi juga tentang pengalaman yang menyenangkan dan sehat.
                </p>
            </div>

            <div className="bg-transparent shadow-md rounded-xl p-8 mt-12 max-w-3xl w-full text-center">
                <h3 className="text-2xl font-semibold text-light mb-6">Dibuat Oleh</h3>
                <div className="flex flex-col md:flex-row items-center justify-center gap-6">
                <div className="w-32 h-32 rounded-full overflow-hidden border shadow">
                    <img
                    src="/img/imgProf.jpg"
                    alt="Foto Profil"
                    className="w-full h-full object-cover"
                    />
                </div>
                <div className="text-center md:text-left">
                    <h4 className="text-xl font-bold text-light">Muhamad Arif Fatkhur Rozak</h4>
                    <p className="text-light">
                    Mahasiswa Universitas PGRI Madiun. Tertarik pada pengembangan web, data, dan teknologi yang mempermudah hidup sehari-hari.
                    </p>
                    <div className="mt-2 text-sm text-blue-600">
                    <a href="mailto:emailkamu@example.com" className="hover:underline">muhamadariffr27@gmail.com</a>
                    </div>
                </div>
                </div>
            </div>
            </main>

            <ComponentFooter />
        </div>
    );

}

export default AboutMePage;