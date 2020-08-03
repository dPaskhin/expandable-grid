import { makeStyles } from '@material-ui/core/styles';
import { Theme } from '@material-ui/core';

export const useClasses = makeStyles((theme: Theme) => ({
  label: {
    [theme.breakpoints.down('sm')]: {
      fontSize: '14px',
    },
  },
  form: {
    marginBottom: 20,
  },
}));
