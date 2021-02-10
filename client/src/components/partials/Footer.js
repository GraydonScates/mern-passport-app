import React from 'react';

const Footer = props => {
    const year = new Date().getFullYear();

    return (
        <div>
            <p>&copy; {year} YOURNAME</p>
        </div>
    );
}

export default Footer;