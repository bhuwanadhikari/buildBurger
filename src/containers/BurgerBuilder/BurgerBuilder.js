import React, {Component} from 'react';
import Auxi from '../../hoc/Auxi';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal'


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
        canPurchase: false
    };

    updateCanPurchase = (newIngredients) => {
        const sum = Object.keys(newIngredients)
            .map(igKey => newIngredients[igKey])
            .reduce((sum, el) =>{
                 return (el+sum);
            }, 0);
        this.setState({canPurchase: sum>0})
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


    render(){
        let disabledInfo = {
            ...this.state.ingredients
        };
        for(let key in disabledInfo){
            disabledInfo[key] = (disabledInfo[key] <= 0);
        }
        return (
            <Auxi>
                <Burger ingredients = {this.state.ingredients}/>
                <Modal>

                </Modal>
                <BuildControls
                    ingredientAdded = {this.addIngredientHandler}
                    ingredientRemoved = {this.removeIngredientHandler}
                    disabledInfo = {disabledInfo}
                    price = {this.state.totalPrice}
                    purchaseState={this.state.canPurchase}

                />
            </Auxi>
        )
    }
}

export default BurgerBuilder;