
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
// import taskApp from './reducers/taskReducer'

import thunk from 'redux-thunk';

const rootReducer = combineReducers({
    // taskApp: taskReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)