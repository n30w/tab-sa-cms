import { CollectionConfig } from 'payload/types';

const Media: CollectionConfig = {
  slug: 'media',
  admin: {
    useAsTitle: 'title',
    group: 'Content',
  },
  fields: [
    {
      name: 'title',
      type: 'text',
    },
    {
      name: 'alt',
      type: 'text',
    },
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
      },
    ],
    adminThumbnail: 'thumbnail',
    mimeTypes: [
      'image/*',
      'application/pdf',
      'image/png',
      'audio/*',
      'video/*',
    ],
    disableLocalStorage: true,
  },
};

export default Media;
