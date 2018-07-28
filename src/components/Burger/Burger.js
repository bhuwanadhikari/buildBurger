import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from './BurgerIngredient/BurgerIngredient'



const burger = (props) => {
    let transformedIngredients = Object.keys(props.ingredients).map(igKey => {
        return [...Array(props.ingredients[igKey])].map((_, i) => {
            return <BurgerIngredient key={igKey + i} type={igKey}/>
        });
    }).reduce((initialArr, currentArr) =>{
        return initialArr.concat(currentArr)
    }, []);
    if(transformedIngredients.length ===0){
            transformedIngredients = <p>Please insert some Ingredients</p>;
    }
    return (
        <div className={classes.Burger}>
            <BurgerIngredient type="bread-top"/>
            {transformedIngredients}
            <BurgerIngredient type="bread-bottom"/>
        </div>
    );
};

export default burger;