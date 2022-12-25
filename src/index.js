import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import { Provider } from 'react-redux';
import './index.css'


import { createStore, applyMiddleware, compose} from 'redux';


import thunk from 'redux-thunk';

import reducers  from './reducers';

const store = createStore(reducers, compose(applyMiddleware(thunk)))

//Provider going to keep track of that store which is that global state and that allows us to access that store any where inside of the app we don't have to be exactly in a paren component or in a child component we can access that state from any where


ReactDOM.render(
<Provider store={store}>
<App />
</Provider>

, document.getElementById('root'))