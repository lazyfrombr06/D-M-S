import React, { useState, useEffect } from 'react';
import { FaArrowAltCircleUp } from "react-icons/fa";
import './GotoTop.css'
function GoToTop() {
    const [showButton, setShowButton] = useState(false);

    const handleButtonClick = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        const handleScroll = () => {
            if (window.pageYOffset > 300) {
                setShowButton(true);
            } else {
                setShowButton(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <button onClick={handleButtonClick} style={{ display: showButton ? 'block' : 'none' }} className='button-of-go-to-top' > <FaArrowAltCircleUp style={{position:'relative',top:'3'}}/></button>
    );
}

export default GoToTop


// Now Import this as import GoToTopButton from './GoToTopButton.js' and use in app.js or where you want this button.... I used It on Footer.js