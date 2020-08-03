import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useClasses = makeStyles((theme: Theme) => ({
  drawer: {
    [theme.breakpoints.down('sm')]: {
      width: '100%',
    },
  },
  tabsWrapper: {
    display: 'flex',
    alignItems: 'center',
  },
  closeIcon: {
    'boxSizing': 'border-box',
    'fontSize': '2.5rem',
    'border': `1px solid ${theme.palette.grey['400']}`,
    'color': theme.palette.grey['400'],
    'marginLeft': theme.spacing(1),
    'cursor': 'pointer',
    '&:hover': {
      fill: '#000',
    },
  },
}));
