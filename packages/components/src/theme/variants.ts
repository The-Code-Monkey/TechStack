import { get, Theme, getContrast } from '@aw-web-design/styled-system';

const variants = {
  intents: {
    info: {
      color: 'intents.info.0',
    },
    danger: {
      color: 'intents.danger.0',
    },
    success: {
      color: 'intents.success.0',
    },
    warning: {
      color: 'intents.warning.0',
    },
  },
  typography: {
    type: {
      displayXLarge: {
        fontSize: '9',
        fontWeight: 'bold',
        letterSpacing: '-1px',
        lineHeight: '1',
      },
      displayLarge: {
        fontSize: '8',
        fontWeight: 'bold',
        letterSpacing: '-0.5px',
        lineHeight: '1',
      },
      title: {
        fontSize: '7',
        fontWeight: '6',
        lineHeight: '1',
      },
      heading: {
        fontSize: '6',
        fontWeight: '5',
        lineHeight: '1',
      },
      subheading: {
        fontSize: '3',
        fontWeight: '5',
        lineHeight: '2',
        textTransform: 'uppercase',
      },
      body: {
        fontSize: '4',
        lineHeight: '4',
      },
      caption: {
        fontSize: '3',
        fontWeight: '6',
        lineHeight: '2',
      },
      button: {
        fontSize: '4',
        fontWeight: '5',
        lineHeight: '1',
        textAlign: 'center',
      },
      helper: {
        fontSize: '2',
      },
      helperXs: {
        fontSize: '1',
      },
    },
  },
  buttons: (theme: Theme) => ({
    default: {
      bg: 'white',
      _hover: {
        bg: 'neutrals.6',
        _disabled: {
          bg: 'neutrals.2',
        },
      },
    },
    primary: {
      color: getContrast(get(theme.colors, 'primary.2', 'background')),
      bg: 'black',
      _hover: {
        bg: 'primary.1',
        _disabled: {
          bg: 'primary.0',
        },
      },
      _active: {
        bg: 'primary.2',
        _disabled: {
          bg: 'primary.0',
        },
      },
      _before: {
        bg: 'primary.1',
      },
    },
    secondary: {
      color: getContrast(get(theme.colors, 'highlights.0', 'background')),
      bg: 'highlights.0',
      _hover: {
        bg: 'highlights.2',
        _disabled: {
          bg: 'highlights.0',
        },
      },
      _active: {
        bg: 'highlights.2',
        _disabled: {
          bg: 'highlights.0',
        },
      },
      _before: {
        bg: 'primary.1',
      },
    },
  }),
};

export default variants;
