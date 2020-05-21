
import { createStore, combineReducers, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';
import userReducer from './reducers/userReducer.js';
import boardReducer from './reducers/boardReducers.js';

const rootReducer = combineReducers({
    user: userReducer,
    board: boardReducer
});

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
export const store = createStore(rootReducer,
    composeEnhancers(applyMiddleware(thunk))
)