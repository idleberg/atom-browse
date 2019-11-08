export const config = {
  notify: {
    title: 'Notifications',
    description: 'Specify which types of notifications to display',
    type: 'string',
    enum: [
      {
        value: 'none',
        description: 'None'
      },
      {
        value: 'warnings',
        description: 'Warnings Only'
      },
      {
        value: 'all',
        description: 'All Notifications'
      }
    ],
    default: 'all',
    order: 1
  },
  beep: {
    title: 'Beep on error',
    description: 'Play beep sound when errors occur',
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
