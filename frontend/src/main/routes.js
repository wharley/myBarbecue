import React from 'react'
import { Router, Route, IndexRoute, Redirect, hashHistory } from 'react-router'

import AuthOrApp from './authOrApp'
import Dashboard from '../dashboard/dashboard'
import Company from '../company/company'
import Order from '../order/order'
import Account from '../account/account'

export default props => (
    <Router history={hashHistory}>
        <Route path='/' component={AuthOrApp}>
            <IndexRoute component={Dashboard} />
            <Route path='companys' component={Company} />
            <Route path='orders' component={Order} />
            <Route path='accounts' component={Account} />
        </Route>
        <Redirect from='*' to='/' />
    </Router>
)
