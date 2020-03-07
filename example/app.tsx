import React from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import { CssBaseline } from '@material-ui/core'

import { Layout } from './components/Layout'

import { routes } from './utils/routes'


export const App: React.FC = () => (
    <React.Fragment>
        <CssBaseline/>
        <Router>
            <Switch>
                <Layout>
                    {routes.map(route => (
                        <Route
                            key={route.path}
                            path={route.path}
                            exact={route.exact}
                            component={route.component}
                        />
                    ))}
                </Layout>
            </Switch>
        </Router>
    </React.Fragment>
)
