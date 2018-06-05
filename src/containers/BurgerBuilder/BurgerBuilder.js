import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';


const PRICES = {
    salad: 0.4,
    cheese: 0.3,
    meat: 0.9,
    bacon: 1.3
};

class BurgerBuilder extends Component{

    state = {
        ingredients: {
            salad:0,
            bacon:0,
            cheese:0,
            meat:0
        },
        totalPrice: 4,
        canPurchase: false,
        purchasing: false,
        loading: false
    };

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        const updatedCount = oldCount+1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        let finalPrice = this.state.totalPrice + PRICES[type];
        this.updateCanPurchase(updatedIngredients);
        this.setState({totalPrice: finalPrice, ingredients: updatedIngredients});
    };

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount <= 0 ){
            return;
        }
        const updatedCount = oldCount-1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        let finalPrice = this.state.totalPrice - PRICES[type];
        this.updateCanPurchase(updatedIngredients);
        this.setState({totalPrice: finalPrice, ingredients: updatedIngredients});
    };

    updateCanPurchase = (newIngredients) => {
        const sum = Object.keys(newIngredients)
            .map(igKey => newIngredients[igKey])
            .reduce((sum, el) =>{
                return (el+sum);
            }, 0);
        this.setState({canPurchase: sum>0})
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchaseHandler = () => {
        this.setState({loading: true})
        const order = {
            ingredients: this.state.ingredients,
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
            this.setState({loading: false, purchasing: false});
        });
    };


    render(){
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = (<OrderSummary
            ingredients ={this.state.ingredients}
            price = {this.state.totalPrice}
            purchaseCancelled = {this.purchaseCancelHandler}
            purchaseContinued = {this.continuePurchaseHandler}
        />);
        if(this.state.loading === true){
            orderSummary  = (<Spinner/>)
        }

        return (
            <Auxi>
                <Burger ingredients = {this.state.ingredients}/>
                <Modal
                    show = {this.state.purchasing}
                    handleBackdrop = {this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabledInfo = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchaseState={this.state.canPurchase}
                    ordered = {this.purchaseHandler}

                />
            </Auxi>
        )
    }
}

export default BurgerBuilder;