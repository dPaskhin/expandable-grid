import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { ExpandableGrid } from '../lib/Expandable'
import { DefaultPage } from './pages/default'
import { IndexPage } from './pages'


export const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Route
                    path='/'
                    exact={true}
                    component={IndexPage}
                />
                <Route
                    path='/default'
                    component={DefaultPage}
                />
            </Switch>
        </Router>
    )
}
