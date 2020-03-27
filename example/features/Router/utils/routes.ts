import { Route } from '@features/Router/interfaces/route'
import { RoutesPaths } from '@features/Router/enums/RoutesPaths'
import { IndexPage } from '@features/IndexPage/IndexPage'
import { AdaptivePage } from '@features/AdaptivePage/AdaptivePage'

export const routes: Route[] = [
    {
        path: RoutesPaths.INDEX,
        exact: true,
        component: IndexPage,
        title: 'Default',
    },
    {
        path: RoutesPaths.ADAPTIVE,
        exact: true,
        component: AdaptivePage,
        title: 'Adaptive',
    },
]
