import React from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { RoutesPaths } from '@features/Router/enums/RoutesPaths';

export interface IRoute {
  path: RoutesPaths;
  exact: boolean;
  component: React.FC<RouteComponentProps> | React.FC;
  title: string;
}
