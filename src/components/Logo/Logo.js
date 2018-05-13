import React from 'react';
import Logo from '../../assets/images/127 burger-logo.png';
import classes from './Logo.css';

const logo = () => {
    return (
        <div className={classes.Logo}>
            <img src={Logo} alt="Logo of the Burger Builder App"/>
        </div>
    )
};

export default logo;