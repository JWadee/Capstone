import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import {createStore} from "redux";
import reducers from './redux/reducer';
import {Provider} from "react-redux";
//import { PersistGate } from 'redux-persist/integration/react';
import { PersistGate } from 'redux-persist/integration/react';
// import { persistStore, persistReducer } from 'redux-persist';
import { persistStore, persistReducer } from 'redux-persist';
//import storage from 'redux-persist/lib/storage'; // defaults to localStorage for web
import storage from 'redux-persist/lib/storage';

 
 
const persistConfig = {
  key: 'root',
  storage,
}
 
const persistedReducer = persistReducer(persistConfig, reducers)
let store = createStore(persistedReducer)
let persistor = persistStore(store)


ReactDOM.render(
    <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
            <App />
        </PersistGate>
    </Provider>, 
    document.getElementById('root')
);

serviceWorker.unregister();
