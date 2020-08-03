import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useClasses = makeStyles((theme: Theme) => ({
  fab: {
    'position': 'fixed',
    'bottom': theme.spacing(5),
    'right': theme.spacing(5),
    'zIndex': 100,
    '& svg': {
      transition: theme.transitions.create('transform', { duration: 200 }),
    },
    '&:hover svg': {
      transform: 'rotate(-10deg)',
    },
  },
}));
