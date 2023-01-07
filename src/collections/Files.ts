import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import categoryRelationship from '../fields/categoryRelationship';

const Files: CollectionConfig = {
  slug: 'files',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'title',
      type: 'text',
      required: true,
      access: {
        read: () => true,
      },
    },
    {
      name: 'description',
      type: 'textarea',
      required: true,
    },
    categoryRelationship,
  ],
  upload: {
    staticURL: '/files',
    staticDir: 'files',
    adminThumbnail: 'thumbnail',
    mimeTypes: ['application/pdf'],
    disableLocalStorage: true,
  },
};

export default Files;
