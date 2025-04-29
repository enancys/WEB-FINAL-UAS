import React, { useEffect, useState } from 'react';
import ComponentNavbar from '../../components/user/ComponentNavbar';
import ComponentFooter from '../../components/user/ComponentFooter';
import ComponentHeroSection from '../../components/user/ComponentHeroSection';

const AboutMePage= () => {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
    const loginStatus = localStorage.getItem('isLoggedIn');
    setIsLoggedIn(loginStatus === 'true'); 
    }, []);

    return (
        <div>
            
        </div>
    );
}

export default AboutMePage;