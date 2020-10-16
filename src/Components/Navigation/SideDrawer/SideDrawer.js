import React from 'react';

import classes from './SideDrawer.module.css'
import Logo from '../../Logo/Logo'
import NavigationItens from '../NavigationItems/NavigationItens'
import Backdrop from "../../UI/Backdrop/Backdrop"
import Auxiliary from "../../../hoc/Auxiliary/Auxiliary"

const sideDrawer = props => {
    let attachedClasses = [classes.SideDrawer, classes.Close]
    if (props.open) {
      attachedClasses = [classes.SideDrawer, classes.Open];  
    }
    return (
      <Auxiliary> 
        <Backdrop  show={props.open} clicked={props.closed} />
        <div className={attachedClasses.join(' ')}>
          <div className={classes.Logo}>
            <Logo />
          </div>
          <nav>
            <NavigationItens />
          </nav>
        </div>
      </Auxiliary>
    );
}

export default sideDrawer;