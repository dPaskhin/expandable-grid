import React, { useEffect } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'

import { IndexPage } from './pages'
import { Layout } from './components/Layout'

export const App: React.FC = () => {
    return (
        <Router>
            <Switch>
                <Layout>
                    <Route
                        path='/'
                        exact={true}
                        component={IndexPage}
                    />
                </Layout>
            </Switch>
        </Router>
    )
}
