import React from 'react';

import classes from './Burger.module.css'
import BurguerIngredient from './BurgerIngredient/BurgerIngredient'

const burger = props => {
    let transformedIngredients = Object.keys(props.ingredients)
        .map(igredientKey => {
            return [...Array(props.ingredients[igredientKey])].map((_, index) => {
                return <BurguerIngredient key={igredientKey + index} type={igredientKey} />
            })
        })
        .reduce((arr, element)=>{
            return arr.concat(element);
        }, []);
    if (transformedIngredients.length === 0) {
        transformedIngredients = <p>Please enter with ingredients!</p>
    }
    return (
      <div className={classes.Burger}>
        <BurguerIngredient type="bread-top" />
            {transformedIngredients}
        <BurguerIngredient type="bread-bottom" />
      </div>
    );
};

export default burger;