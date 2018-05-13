import React from 'react';
import Auxi from '../../hoc/Auxi';
import classes from './Layout.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';



const layout = (props) => (
    <Auxi>
        <Toolbar/>
        <main className={classes.Content}>
            {props.children}
        </main>
    </Auxi>
);

export default layout;