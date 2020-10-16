import React, { useState } from 'react';
import Auxiliary from '../../hoc/Auxiliary/Auxiliary'
import classes from "./Layout.module.css";
import Toolbar from "../Navigation/Tollbar/Toolbar"
import SideDrawer from '../Navigation/SideDrawer/SideDrawer'

const Layout = (props) => {
  const [showSideDrawer, setShowSideDrawer] = useState(false);

  const SideDrawerClosedHandler = () => {
    setShowSideDrawer(false);
  };

  const SideDrawerOpenedHandler = () => {
    setShowSideDrawer(!showSideDrawer);
  };


    return (
      <Auxiliary>
        <Toolbar clicked={SideDrawerOpenedHandler} />
        <SideDrawer open={showSideDrawer} closed={SideDrawerClosedHandler} />
       
        <main className={classes.Content}>{props.children}</main>
      </Auxiliary>
    );

}

export default Layout;