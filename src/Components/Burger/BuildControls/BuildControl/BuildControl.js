/* eslint-disable react-hooks/rules-of-hooks */
import React from "react";
import classes from "./BuildControl.module.css";


const buildControl = props => (
      <div className={classes.BuildControl}>
        <div className={classes.Label}>{props.Label}</div>
        <button disabled={props.disabled} className={classes.Less} onClick={props.removed}>
          Less
        </button>
        <button onClick={props.added} className={classes.More}>
          More
        </button>
      </div>
)
       
export default buildControl;
