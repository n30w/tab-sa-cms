import { CollectionConfig } from 'payload/types';

const index: CollectionConfig = {
  slug: 'index',
  admin: {
    useAsTitle: 'title',
    group: 'Pages',
  },
  access: {
    read: () => true,
  },
  fields: [],
};

export default index;
