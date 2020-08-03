import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useClasses = makeStyles((theme: Theme) => ({
  appBar: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: theme.spacing(0, 5),
    flexDirection: 'row',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      padding: theme.spacing(2, 5, 0, 5),
    },
  },
  title: {
    flexGrow: 1,
  },
  tabIndicator: {
    backgroundColor: theme.palette.common.white,
    width: '100%',
    height: '100%',
  },
}));
