import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useClasses = makeStyles((theme: Theme) => ({
  base: {
    '-webkit-tap-highlight-color': 'rgba(0, 0, 0, 0)',
  },
  container: {
    marginTop: '60px',
    [theme.breakpoints.down('md')]: {
      marginTop: '110px',
    },
  },
}));
