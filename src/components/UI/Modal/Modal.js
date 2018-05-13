import React from 'react';
import classes from './Modal.css';
import Auxi from '../../../hoc/Auxi';
import Backdrop from '../Backdrop/Backdrop';

const modal = (props) => {
    return (
        <Auxi>
            <Backdrop clicked = {props.handleBackdrop} show={props.show}/>
            <div
                className={classes.Modal}
                style={{transform: props.show ? 'translateY(0)' : 'translateY(-100vh)',
                        opacity: props.show ? '1' : '0'}}
            >
                {props.children}
                </div>
        </Auxi>
    )

};

export default modal;