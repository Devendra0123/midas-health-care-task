// src/components/ScrollToTopButton.tsx

import React, { useState, useEffect } from 'react';
import { Button, Tooltip } from 'antd';
import { UpOutlined } from '@ant-design/icons';

const ScrollToTopButton: React.FC = () => {
    const [visible, setVisible] = useState(false);

    // Show button when user scrolls down more than the viewport height
    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > window.innerHeight) {
                setVisible(true);
            } else {
                setVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility, { passive: true });

        return () => {
            window.removeEventListener('scroll', toggleVisibility);
        };
    }, []);

    // Scroll smoothly to the top
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth', // Smooth scroll
        });
    };

    if (!visible) {
        return null;
    }

    return (
        <div className="fixed bottom-8 right-8 z-50">
            <Tooltip title="Scroll to top">
                <Button
                    shape="circle"
                    icon={<UpOutlined />}
                    size="large"
                    onClick={scrollToTop}
                    aria-label="Scroll to top"
                    className='bg-teal text-white shadow-lg border-slate-500'
                />

            </Tooltip>

        </div>
    );
};

export default ScrollToTopButton;
