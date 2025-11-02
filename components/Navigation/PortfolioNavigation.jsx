import Link from 'next/link';
import React, { useState, useEffect } from 'react';

const BlogNavigation = () => {
    const [isFixed, setIsFixed] = useState(false);
    const [activeLink, setActiveLink] = useState('portfolio');

    // array of navigation items with their corresponding IDs and icons
    const navItems = [
        { label: 'Home', id: '/', icon: 'fas fa-home' },
        { label: 'Portfolio', id: 'portfolio', icon: 'fas fa-briefcase' },
    ];

    // function to handle the scroll event
    const handleScroll = () => {
        const scrollY = window.scrollY;

        // Determine which link is active based on the scroll position
        for (const item of navItems) {
            const element = document.getElementById(item.id);
            if (element && scrollY >= element.offsetTop) {
                setActiveLink(item.id);
            }
        }

        // Calculate headerHeight and update isFixed - avec vérification de l'existence
        const headerElement = document.getElementById('header');
        if (!headerElement) return; // Sortir si l'élément n'existe pas encore
        
        const headerHeight = headerElement.clientHeight;
        const windowWidth = window.innerWidth;

        if (windowWidth < 992) {
            if (scrollY >= headerHeight) {
                setIsFixed(true);
            } else {
                setIsFixed(false);
            }
        }
    };

    // Add a scroll event listener when the component mounts
    useEffect(() => {
        // Vérifier que nous sommes côté client et que l'élément existe
        if (typeof window === 'undefined') return;
        
        // Attendre que le DOM soit complètement chargé
        const initNavigation = () => {
            const headerElement = document.getElementById('header');
            if (!headerElement) {
                // Réessayer après un court délai si l'élément n'existe pas encore
                setTimeout(initNavigation, 100);
                return;
            }

            window.addEventListener('scroll', handleScroll);

            // Get the initial headerHeight
            const initialHeaderHeight = headerElement.clientHeight;

            // Check and update isFixed initially
            const windowWidth = window.innerWidth;
            if (windowWidth < 992) {
                if (window.scrollY >= initialHeaderHeight) {
                    setIsFixed(true);
                }
            }
        };

        initNavigation();

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [handleScroll]);

    return (
        <div className="nav-wrapper">
            <div className={`section-nav ${isFixed ? 'fixed' : ''}`}>
                <ul className="nav">
                    {navItems.map((item) => (
                        <li className="nav-item" key={item.id}>
                            <Link
                                href={`${activeLink === item.id ? '#' : '/'}`}
                                className={`nav-link ${activeLink === item.id ? 'active' : ''}`}
                            >
                                <span className="nav-link-desktop">{item.label}</span>
                                <span className="nav-link-mobile">
                                    <i className={item.icon}></i>
                                </span>
                                <span className="nav-circle"></span>
                            </Link>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default BlogNavigation