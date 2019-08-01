import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './semantic/dist/semantic.css';
import { composeWithDevTools } from 'redux-devtools-extension';
import { CookiesProvider } from 'react-cookie';

import App from './components/App';
import reducers from './reducers';

const store = createStore(reducers, composeWithDevTools(applyMiddleware(thunk)))


ReactDOM.render(
    <CookiesProvider>
        <Provider store={store}>
            <App />
        </Provider>
    </CookiesProvider>,
    document.querySelector('#root')
)