import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import categoryRelationship from '../fields/categoryRelationship';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'year'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: ({ req }) => {
      // Returns all docs if logged in, if not
      // returns only the published ones
      if (req.user) return true;

      return {
        or: [
          {
            _status: {
              equals: 'published',
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      };
    },
    readVersions: isAdmin,
    update: isAdmin,
    delete: isAdmin,
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
    },
    {
      name: 'author',
      type: 'text',
      required: true,
    },
    categoryRelationship,
    {
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
        upload: {
          collections: {
            media: {
              fields: [
                {
                  name: 'title',
                  type: 'text',
                  required: true,
                },
                {
                  name: 'alt',
                  type: 'text',
                  required: true,
                },
              ],
            },
          },
        },
      },
    },
  ],
};

export default Posts;
