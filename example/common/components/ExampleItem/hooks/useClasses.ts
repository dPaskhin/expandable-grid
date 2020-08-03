import { makeStyles, Theme } from '@material-ui/core/styles';

export const useClasses = makeStyles((theme: Theme) => ({
  '@keyframes bounceIn': {
    'from': { transform: 'scale(0.8)' },
    '50%': { transform: 'scale(1.05)' },
    'to': { transform: 'scale(1)' },
  },
  'item': {
    'padding': '20px',
    'position': 'relative',
    'width': '100%',
    'height': '100%',
    'borderRadius': '4px',
    'boxShadow': '5px 5px 15px rgba(0, 0, 0, .5)',
    'cursor': 'pointer',
    'backgroundColor': 'darkblue',
    'animation': '$bounceIn forwards 400ms',
  },
  'itemExpanded': {
    'cursor': 'default',

    '& $title': {
      fontSize: '30px',
    },
  },
  'title': {
    fontSize: '18px',
    color: theme.palette.common.white,
    textShadow: '1px 2px 2px rgba(0, 0, 0, .7)',
    transition: 'font-size .2s',
  },
  'close': {
    'position': 'absolute',
    'top': 30,
    'right': 30,
    'color': theme.palette.common.white,
    'cursor': 'pointer',
    'opacity': 0,
    'transition': 'opacity 200ms, transform 200ms',
    'transitionTimingFunction': 'ease, cubic-bezier(.8, .5, .2, 1.4)',

    '& svg': {
      filter: 'drop-shadow(1px 2px 2px rgba(0, 0, 0, .7))',
    },

    '&.enter': {
      opacity: 0,
      transform: 'scale(0)',
    },

    '&.enter-done': {
      opacity: 1,
      transform: 'scale(1)',
    },

    '&.exit': {
      opacity: 1,
      transform: 'scale(0)',
    },

    '&.exit-done': {
      opacity: 0,
      transform: 'scale(0)',
    },
  },
}));
