import React, { Component } from 'react';
import Auxi from '../../../hoc/Auxi/Auxi';
import Button from '../../UI/Button/Button';

class OrderSummary extends Component {

    componentWillUpdate(){
        console.log("order summary will update");
    }

    render() {
        const ingredients = Object.keys(this.props.ingredients).map(igKey => {
            return <li key={igKey}><span
                style={{textTransform: 'capitalize'}}>{igKey}</span>: <b>{this.props.ingredients[igKey]}</b></li>
        });
        return (
            <Auxi>
                <h3>Your Order</h3>
                <p>Your delicious Burger with following ingredients:</p>
                <ul>
                    {ingredients}
                </ul>
                <p><strong>Total Price: ${this.props.price.toFixed(2)}</strong></p>
                <p>Continue to Checkout?</p>
                <Button btnType="Success" clicked={this.props.purchaseContinued}    >
                    CONTINUE
                </Button>
                <Button btnType="Danger" clicked={this.props.purchaseCancelled}>
                    CANCEL
                </Button>
            </Auxi>

        );
    }
}

export default OrderSummary;