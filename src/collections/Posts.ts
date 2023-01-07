import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import categoryRelationship from '../fields/categoryRelationship';
import { regeneratePage } from '../utils/regeneratePage';
import { richText } from '../fields/richText';

const Posts: CollectionConfig = {
  slug: 'posts',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title', 'author', 'category'],
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
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        regeneratePage({
          payload,
          collection: 'posts',
          doc,
        });
      },
    ],
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
    richText,
  ],
};

export default Posts;
