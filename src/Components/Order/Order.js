import React from 'react'
import classes from './Order.module.css'

const order = props => {
    const ingredients= [];

    for(let ingredientName in props.ingredients) {
        ingredients.push({
            name: ingredientName,
            amount: props.ingredients[ingredientName],
        })
    }

    const ingredientsOutput = ingredients.map(ingredient => (
    <span key={ingredient.name}
    style={{
        textTransform: 'capitalize',
        display: 'inline-block',
        margin: '0 8px',
        border: '1px solid #ccc',
        padding:'5px'
    }}
    >{ingredient.name}: ({ingredient.amount})</span>
    ))

    return (
      <div className={classes.Order}>
        <h4>ingredients:</h4>
        {ingredientsOutput}
        <p>
          Price: <strong>R$ {props.price}</strong>
        </p>
      </div>
    );
};


export default order;