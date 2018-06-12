import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';

class Checkout extends Component{
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    };

    ccntinuedPurchaseHandler = () => {
        this.props.history.push('checkout/contact-form');
};

    cancelledPurchaseHandler = () => {
        this.props.history.goBack();
    };

    render(){
        return (
            <div>
                <CheckoutSummary
                    ingredients = {this.state.ingredients}
                    cancelledPurchase = {this.cancelledPurchaseHandler}
                    continuedPurchase = {this.ccntinuedPurchaseHandler}

                />
            </div>
        );
    }

}

export default Checkout;