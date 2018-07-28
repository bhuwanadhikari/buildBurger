import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router-dom';
import ContactData from './ContactData/ContactData';

class Checkout extends Component{
    state = {
        ingredients: {
            salad: 1,
            meat: 1,
            bacon: 1,
            cheese: 1
        }
    };

    componentDidMount(){
        const query = new URLSearchParams(this.props.location.search);
        var ingredients = {};

        for(let param of query.entries()){
            ingredients[param[0]] = +param[1] // + is used to convert string const to number constant
        }
        console.log(ingredients);
        this.setState({ingredients: ingredients});

    }

    continuedPurchaseHandler = () => {
        this.props.history.push('checkout/contact-form');
    };

    cancelledPurchaseHandler = () => {
        this.props.history.goBack();
    };

    orderHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.props.ingredients,
            price: this.state.totalPrice,
            customer: {
                name: 'Bhuwan Adhikari',
                address: {
                    street: 'Lamachaur Road',
                    zip: 4161,
                    city: 'Pokhara'
                },
                email: 'test@gmail.com',
            },
            deliveryMethod: 'fastest'
        };
        axios.post('/orders.json', order).then((res) => { // parameters: node in the db and data to be sent
            console.log(res);
            this.setState({loading: false, purchasing: false});
        }).catch((err) => {
            console.log(err);
            alert("Order Completed");
            this.setState({loading: false, purchasing: false});
        });
    };

    render(){
        return (
            <div>
                <CheckoutSummary
                    ingredients = {this.state.ingredients}
                    cancelledPurchase = {this.cancelledPurchaseHandler}
                    continuedPurchase = {this.continuedPurchaseHandler}
                />
                <Route
                    path = {this.props.match.path + '/contact-form'}
                    render = {() => (<ContactData/>)}
                    clicked = {this}
                />
            </div>
        );
    }

}

export default Checkout;