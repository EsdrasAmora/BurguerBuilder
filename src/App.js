import React from 'react';
import {Route, Switch} from 'react-router-dom';

import Layout from "./Components/Layout/Layout";
import BurgerBuilder from './Containers/BurgerBuilder/BurgerBuilder'
import Checkout from "./Containers/Checkout/Checkout"
import Orders from './Containers/Orders/Orders'


const app = props => {

    return (
      <div>
        <Layout>
          <Switch>
            <Route path="/checkout" component={Checkout} />
            <Route path="/orders" component={Orders} />
            <Route path="/" exact component={BurgerBuilder} />
          </Switch>
        </Layout>
      </div>
    );
  }



export default app;
