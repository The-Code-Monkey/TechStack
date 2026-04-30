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
  buttons: {
    variants: {
      default: {
        bg: 'neutrals.4',
        _hover: {
          bg: 'neutrals.6',
        },
        _disabled: {
          bg: 'neutrals.2',
        },
      },
      primary: {
        bg: 'primary.2',
        _hover: {
          bg: 'primary.1',
        },
        _disabled: {
          bg: 'primary.0',
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
        bg: 'highlights.0',
        _hover: {
          bg: 'highlights.2',
        },
        _disabled: {
          bg: 'highlights.0',
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
    },
    intents: {
      success: {
        bg: 'intents.success.0',
        _hover: {
          bg: 'intents.success.1',
        },
        _disabled: {
          bg: 'intents.success.3',
        },
      },
      warning: {
        bg: 'intents.warning.0',
        _hover: {
          bg: 'intents.warning.1',
        },
        _disabled: {
          bg: 'intents.warning.3',
        },
      },
      error: {
        bg: 'intents.error.0',
        _hover: {
          bg: 'intents.error.1',
        },
        _disabled: {
          bg: 'intents.error.3',
        },
      },
      info: {
        bg: 'intents.info.0',
        _hover: {
          bg: 'intents.info.1',
        },
        _disabled: {
          bg: 'intents.info.3',
        },
      },
      pending: {
        bg: 'intents.pending.0',
        _hover: {
          bg: 'intents.pending.1',
        },
        _disabled: {
          bg: 'intents.pending.3',
        },
      },
    },
    size: {
      sm: {
        bg: 'unset',
        color: 'highlights.0',
        p: '3',
        _hover: {
          bg: 'unset',
          color: 'highlights.1',
        },
      },
      md: {},
      lg: {},
    },
  },
};

export default variants;
