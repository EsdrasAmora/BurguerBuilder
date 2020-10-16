import React from 'react'
import classes from './BuildControls.module.css'
import BuildControl from './BuildControl/BuildControl'


const controls = [
    { label:'Salad', type:'salad'},
    { label:'Bacon', type:'bacon'},
    { label:'Cheese', type:'cheese'},
    { label:'Meat', type:'meat'}
]

const buildControls = (props) => (
  <div className={classes.BuildControls}>
    <p>
      Total Price: <strong>{props.price.toFixed(2)}</strong>
    </p>
    {controls.map((ctrl) => (
      <BuildControl
        key={ctrl.label}
        Label={ctrl.label}
        added={() => props.addIngredient(ctrl.type)}
        removed={() => props.removeIngredient(ctrl.type)}
        disabled={props.disabled[ctrl.type]}
      />
    ))}
    <button onClick={props.orded} disabled={!props.purchasable} className={classes.OrderButton}>PURCHASE NOW</button>
  </div>
);
    

export default buildControls;