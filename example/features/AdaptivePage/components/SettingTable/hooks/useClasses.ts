import { makeStyles } from '@material-ui/core/styles';

export const useClasses = makeStyles({
  closeIcon: {
    'cursor': 'pointer',
    '&:hover': {
      fill: '#000',
    },
  },
});
