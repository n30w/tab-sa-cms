import { CollectionConfig } from 'payload/types';

const Staff: CollectionConfig = {
  slug: 'staff',
  admin: {
    useAsTitle: 'role',
    defaultColumns: ['firstName', 'lastName', 'role'],
    group: 'Content',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      type: 'row',
      fields: [
        {
          name: 'firstName',
          type: 'text',
          required: true,
        },
        {
          name: 'lastName',
          type: 'text',
          required: true,
        },
      ],
    },
    {
      name: 'role',
      type: 'text',
      required: true,
    },
    {
      name: 'blurb',
      label: 'Short Biography',
      type: 'textarea',
      required: true,
    },
    {
      name: 'image',
      type: 'upload',
      relationTo: 'media',
    },
  ],
};

export default Staff;
