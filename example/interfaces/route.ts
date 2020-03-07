import React from 'react'
import { RouteComponentProps } from 'react-router-dom'

import { RoutesPaths } from '../enums/RoutesPaths'


export interface Route {
    path: RoutesPaths
    exact: boolean
    component: React.FC<RouteComponentProps> | React.FC
    title: string
}
