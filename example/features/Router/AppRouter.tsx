import React from 'react'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'

import { Layout } from '@common/layout/Default/Layout'

import { routes } from '@features/Router/utils/routes'


export const AppRouter: React.FC = () => (
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
)
