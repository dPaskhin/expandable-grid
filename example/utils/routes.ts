import { Route } from '../interfaces/route'

import { RoutesPaths } from '../enums/RoutesPaths'
import { IndexPage } from '../pages/IndexPage'
import { AdaptivePage } from '../pages/AdaptivePage'


export const routes: Route[] = [
    {
        path: RoutesPaths.INDEX,
        exact: true,
        component: IndexPage,
        title: 'Default'
    },
    {
        path: RoutesPaths.ADAPTIVE,
        exact: true,
        component: AdaptivePage,
        title: 'Adaptive'
    }
]
