import React from 'react';
import Auxi from '../../../hoc/Auxi';

const orderSummary = (props) => {

    const ingredients = Object.keys(props.ingredients).map(igKey => {
        return <li key ={igKey}><span style={{}} >{igKey}</span>: <b>{props.ingredients[igKey]}</b> </li>
    });

    return (
        <Auxi>
            <h3>Your Order</h3>
            <p>Your delicious Burger with following ingredients:</p>
            <ul>
                {ingredients}
            </ul>
        </Auxi>
    )
};

export default orderSummary;