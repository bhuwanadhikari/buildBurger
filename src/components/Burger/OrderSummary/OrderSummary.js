import React from 'react';
import Auxi from '../../../hoc/Auxi';
import Button from '../../UI/Button/Button';

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return <li key ={igKey}><span style={{textTransform:'capitalize'}} >{igKey}</span>: <b>{props.ingredients[igKey]}</b> </li>
    });

    return (
        <Auxi>
            <h3>Your Order</h3>
            <p>Your delicious Burger with following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
            <p><strong>Total Price: ${props.price.toFixed(2)}</strong></p>
            <p>Continue to Checkout?</p>
            <Button btnType = "Success" clicked = {props.purchaseContinued} >
                CONTINUE
            </Button>
            <Button btnType = "Danger" clicked = {props.purchaseCancelled}>
                CANCEL
            </Button>
        </Auxi>
    )
};

export default orderSummary;