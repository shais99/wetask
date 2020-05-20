
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import board from './reducers/boardReducers.js'
import user from './reducers/userReducer.js'
// import taskApp from './reducers/taskReducer'

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    user,
    board
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)