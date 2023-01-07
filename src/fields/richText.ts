import { Field } from 'payload/types';

export const richText: Field = {
  name: 'body', // required
  type: 'richText', // required
  defaultValue: [
    {
      children: [{ text: 'Start typing here' }],
    },
  ],
  required: true,
  admin: {
    elements: ['h2', 'h3', 'h4', 'link'],
    leaves: ['bold', 'italic'],
    link: {
      // Inject your own fields into the Link element
      fields: [
        {
          name: 'rel',
          label: 'Rel Attribute',
          type: 'select',
          hasMany: true,
          options: ['noopener', 'noreferrer', 'nofollow'],
        },
      ],
    },
  },
};
