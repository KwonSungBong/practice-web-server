import 'babel-core/polyfill'
import React from 'react'
import {render} from 'react-dom'
import Root from './containers/Root'
import configureStore from './store/configureStore'
import {loginUserSuccess} from './actions'

const target = document.getElementById('root')
const store = configureStore();

const node = (
    <Root store={store} />
)

//let token = localStorage.getItem('token')
let token = null;
if(token !== null){
    store.dispatch(loginUserSuccess(token))
}

render(node,target);
