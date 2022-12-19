import { CollectionConfig } from 'payload/types';
import { Staff } from '../payload-types';

const Components: CollectionConfig = {
  slug: 'Components',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    read: () => true,
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
        // {
        //   name: 'staff',
        //   label: 'Staff Member',
        //   type: 'select',
        //   options: [],
        // },
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

export default Components;
