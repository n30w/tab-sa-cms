import { Block } from 'payload/types';

export const StaffGrid: Block = {
  slug: 'staffGrid',
  labels: {
    singular: 'Staff Grid',
    plural: 'Staff Grids',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'order',
      type: 'array',
      label: 'List Order',
      minRows: 3,
      maxRows: 12,
      fields: [
        {
          name: 'staff',
          label: 'Staff Member',
          type: 'relationship',
          relationTo: 'staff',
          hasMany: false,
        },
      ],
    },
  ],
};
