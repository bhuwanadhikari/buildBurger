import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';


const PRICES = {
    salad: 0.4,
    cheese: 0.3,
    meat: 0.9,
    bacon: 1.3
};

class BurgerBuilder extends Component {

    state = {
        ingredients: null,
        totalPrice: 4,
        canPurchase: false,
        purchasing: false,
        loading: false,
        error: false
    };

    componentDidMount() {
        axios.get('https://burgerbuilder-a351f.firebaseio.com/ingredients.json').then(res => {
            this.setState({ingredients: res.data});
        }).catch(err => {
            this.setState({error: true});
        });
    }

    addIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        const updatedCount = oldCount + 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        let finalPrice = this.state.totalPrice + PRICES[type];
        this.updateCanPurchase(updatedIngredients);
        this.setState({totalPrice: finalPrice, ingredients: updatedIngredients});
    };

    removeIngredientHandler = (type) => {
        let oldCount = this.state.ingredients[type];
        if (oldCount <= 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = {...this.state.ingredients};
        updatedIngredients[type] = updatedCount;

        let finalPrice = this.state.totalPrice - PRICES[type];
        this.updateCanPurchase(updatedIngredients);
        this.setState({totalPrice: finalPrice, ingredients: updatedIngredients});
    };

    updateCanPurchase = (newIngredients) => {
        const sum = Object.keys(newIngredients)
            .map(igKey => newIngredients[igKey])
            .reduce((sum, el) => {
                return (el + sum);
            }, 0);
        this.setState({canPurchase: sum > 0})
    };

    purchaseHandler = () => {
        this.setState({purchasing: true});
    };

    purchaseCancelHandler = () => {
        this.setState({purchasing: false});
    };

    continuePurchaseHandler = () => {
       /* */
        const queryParams = [];
        for(let ing in this.state.ingredients){
            queryParams.push(encodeURIComponent(ing) + '=' + encodeURIComponent(this.state.ingredients[ing]));
        }
        const queryString = queryParams.join('&');
        this.props.history.push({
            pathname: '/checkout',
            search: '?' + queryString
        });
    };


    render() {
        let disabledInfo = {
            ...this.state.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }

        let orderSummary = null;
        if(this.state.ingredients) {
            orderSummary = (
                <OrderSummary
                    ingredients={this.state.ingredients}
                    price={this.state.totalPrice}
                    purchaseCancelled={this.purchaseCancelHandler}
                    purchaseContinued={this.continuePurchaseHandler}
                />);

        }
        if (this.state.loading === true) {
            orderSummary = (<Spinner/>)
        }


        let burger = this.state.error ? <p>Something went wrong, Try Again!!</p> : <Spinner/>;
        if(this.state.ingredients){
            burger =(
                <Auxi>
                    <Burger ingredients={this.state.ingredients}/>
                    <BuildControls
                        ingredientAdded={this.addIngredientHandler}
                        ingredientRemoved={this.removeIngredientHandler}
                        disabledInfo={disabledInfo}
                        price={this.state.totalPrice}
                        purchaseState={this.state.canPurchase}
                        ordered={this.purchaseHandler}

                    />
                </Auxi>
            );
        }




        return (
            <Auxi>
                {burger}
                <Modal
                    show={this.state.purchasing}
                    handleBackdrop={this.purchaseCancelHandler}
                >
                    {orderSummary}
                </Modal>
            </Auxi>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);