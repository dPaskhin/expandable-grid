import React from 'react'
import { CssBaseline } from '@material-ui/core'

import { AppRouter } from '@features/Router/AppRouter'

export const App: React.FC = () => (
    <React.Fragment>
        <CssBaseline/>
        <AppRouter/>
    </React.Fragment>
)
