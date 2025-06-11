import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

const SellerMenu = () => {
    const { id } = useParams(); 
    
    return (
        <div className=''>
            <h1>Register Your Restaurant</h1>
            
        </div>
    );
}

export default SellerMenu;
