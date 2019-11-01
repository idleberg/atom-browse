export const config = {
  notify: {
    title: 'Show Notifications',
    description: 'Show info notifications for all actions',
    type: 'boolean',
    default: false,
    order: 1
  },
  beep: {
    title: 'Beep on error',
    description: 'Show info notifications for all actions',
    type: 'boolean',
    default: true,
    order: 2
  },
  customFileManager: {
    title: 'Custom File Manager Options',
    type: 'object',
    order: 3,
    properties: {
      fullPath: {
        title: 'Full Path',
        description: 'Specify the full path to a custom file manager',
        type: 'string',
        default: '',
        order: 1
      },
      openArgs: {
        title: 'Open Arguments',
        description: 'Specify custom arguments to open a folder. The use of a `%path%` placeholder is optional.',
        type: 'array',
        default: [],
        items: {
          type: [
            'string',
            'integer'
          ]
        },
        order: 2
      },
      revealArgs: {
        title: 'Reveal Arguments',
        description: 'Specify custom arguments to reveal a file. The use of a `%path%` placeholder is optional.',
        type: 'array',
        default: [],
        items: {
          type: [
            'string',
            'integer'
          ]
        },
        order: 3
      }
    }
  }
};
