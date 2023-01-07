import { Field } from 'payload/types';
import { StaffGrid } from '../blocks/StaffGrid';
import { richText } from './richText';

export const pageLayouts: Field = {
  name: 'pageLayouts',
  type: 'group',
  fields: [
    {
      type: 'select',
      name: 'type',
      label: 'Type',
      required: true,
      defaultValue: 'home',
      options: [
        {
          label: 'Home',
          value: 'home',
        },
        {
          label: 'About',
          value: 'about',
        },
        {
          label: 'Contact',
          value: 'contact',
        },
        {
          label: 'Donate',
          value: 'donate',
        },
      ],
    },
    {
      name: 'home',
      label: false,
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'home',
      },
      fields: [],
    },
    {
      name: 'about',
      label: false,
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'about',
      },
      fields: [
        {
          name: 'title',
          type: 'text',
        },
        richText,
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
    },
    {
      name: 'contact',
      label: false,
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'contact',
      },
      fields: [],
    },
    {
      name: 'donate',
      label: false,
      type: 'group',
      admin: {
        condition: (_, { type } = {}) => type === 'donate',
      },
      fields: [],
    },
  ],
};
