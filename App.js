import React from 'react'
import {render} from 'react-dom' 
import PropTypes from 'prop-types'

import { HashRouter, Route, Switch, NavLink, browserHistory, Redirect,withRouter } from 'react-router-dom'
import { BrowserRouter } from 'react-router-dom';

import 'jquery/src/jquery';
import 'bootstrap/dist/js/bootstrap';

import Bootstrap from 'bootstrap/dist/css/bootstrap.css';
import axios from "axios";

import toast from './modules/toast'

import  './modules/offline'
import 'font-awesome/css/font-awesome.css';
import styles from './src/css/main.css'

import 'babel-polyfill';

window.React = React

import loginUser from './actions/loginUser'
import LoginContainer from './components/Login/'
import HomeContainer from './components/container/HomeContainer'
import KitchensContainer from './components/container/KitchensContainer'
import ItemsContainer from './components/container/ItemsContainer'
import CheckoutContainer from './components/container/CheckoutContainer'
import ProfileContainer from './components/container/ProfileContainer'
import RegisterContainer from './components/container/RegisterContainer'
import OrderContainer from './components/container/OrderContainer'
import ContactUs from './components/presentation/ContactUs'

import { connect, Provider } from 'react-redux'
import user from './reducers/user'


import storeFactory from './factories/store'
import {
    CREATE_PLATE_API,
} from './constants/api'
  
//export default storeFactory
const store = storeFactory(true)


class App extends React.Component {

    /*componentWillMount() {
        if (!this.props.authenticated) {
          this.props.history.push('/signin');
        }
      }
  
      componentWillUpdate(nextProps) {
        if (!nextProps.authenticated) {
          this.props.history.push('/signin');
        }
      }*/
      componentDidMount(){
        console.log('Updated!')

      }
    componentWillMount() {
        
        this.unsubscribe = store.subscribe(
            () => this.forceUpdate()
        )

        
        
    }
    componentWillUpdate()
    {
        if (!store.getState().user.isLoggedIn)
        {
            console.log('App Component: You are not logged in')
            console.log(this.props)
        }
    }


    componentWillUnmount() {
        this.unsubscribe()
    }


    render() {
        const { user } = store.getState()
        
        
        if (!user.isLoggedIn && !this.props.location.pathname.endsWith('/login') && !this.props.location.pathname.endsWith('/register')) {
            console.log('you are not loggedin and are not visiting login or register, so go to login pagee')
            this.props.history.push("/login")
        }
        if (user.isLoggedIn && (this.props.location.pathname.endsWith('/login') || this.props.location.pathname.endsWith('/register'))) {
            console.log('you are either going to login or register but youre logged inn')
            
            this.props.history.push("/")
        }
        return (
            
            
                <Switch> 
                    <div id="main">
                    <Route exact  path="/" component={HomeContainer} />
                    
                    <Route  path="/login" component={LoginContainer} />
                    
                    <Route  path="/register" component={RegisterContainer} />
                    
                     
                    
            
                
                    <Route  path="/kitchens" component={KitchensContainer}/>                
                    <Route  path="/kitchen/:id/:name" component={ItemsContainer}/>
                    
                    
            
                
                    <Route  path="/checkout" component={CheckoutContainer} />
            
                
                    <Route  path="/profile" edit={false} component={ProfileContainer} />
                    <Route  path="/edit-profile" edit={true} component={ProfileContainer} />
            
                
                    <Route  path="/contact-us" component={ContactUs} />
                    <Route  path="/my-orders" component={OrderContainer} />
                    <Route  path="/view-order/:ref" component={OrderContainer} />

                    
                    
                    </div>
                </Switch>
                    
            
   
        )
    }

}
App.propTypes = {
    store: PropTypes.object.isRequired
}

const AppContainer = withRouter(props => <App {...props}/>);
console.log(store.getState())
render (
    
    <BrowserRouter>
        <Provider store={store}>
            <AppContainer store={store} />
        </Provider>
    </BrowserRouter>
    
    ,
    document.getElementById('react-container')
)
