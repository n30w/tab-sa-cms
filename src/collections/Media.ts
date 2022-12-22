import { CollectionConfig } from 'payload/types';
import { isAdmin } from '../access/isAdmin';
import categoryRelationship from '../fields/categoryRelationship';

const Media: CollectionConfig = {
  slug: 'media',
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
    },
    {
      name: 'alt',
      type: 'text',
      required: true,
    },
    categoryRelationship,
  ],
  upload: {
    staticURL: '/media',
    staticDir: 'media',
    imageSizes: [
      {
        name: 'thumbnail',
        width: 400,
        height: 300,
        position: 'centre',
        formatOptions: {
          format: 'jpeg',
        },
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: ['image/*', 'image/png', 'audio/*', 'video/*'],
    disableLocalStorage: true,
  },
};

export default Media;
