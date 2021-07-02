import { createStore, applyMiddleware, compose } from 'redux';
import allReducers from './reducers';
import thunk from 'redux-thunk';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const persistConfig = {
	key: 'root',
	storage,
	whitelist: ['surfSpotsReducer', 'accessToken', 'userInfoReducer'],
};

const enhancers = compose(
	applyMiddleware(thunk),
	window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

const persistedReducer = persistReducer(persistConfig, allReducers);

export const store = createStore(persistedReducer, enhancers);
export const persistor = persistStore(store);
