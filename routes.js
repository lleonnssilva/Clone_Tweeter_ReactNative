
import React, {Component} from 'react';
import {createStackNavigator} from   'react-navigation';
import Login from   './pages/Login';
import New from './pages/New';
import TimeLine from  './pages/TimeLine';

const Routes = createStackNavigator({
      Login,
      TimeLine,
      New
});

export default  Routes;