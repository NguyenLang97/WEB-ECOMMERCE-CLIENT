import React from 'react'
import ReactDOM from 'react-dom'

import App from './App'
import 'bootstrap/dist/css/bootstrap.css'
import 'remixicon/fonts/remixicon.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'
import './index.scss'
import { history } from '../src/utils'

import store from './store/store'
import { Provider } from 'react-redux'
import { ConnectedRouter } from 'connected-react-router'
import { BrowserRouter as Router } from 'react-router-dom'
import { unstable_HistoryRouter as HistoryRouter } from 'react-router-dom';

ReactDOM.render(
    <React.StrictMode>
        <Provider store={store}>
            <HistoryRouter history={history} >
                <App />
            </HistoryRouter>
        </Provider>
    </React.StrictMode>,
    document.getElementById('root')
)
