import { CollectionConfig } from 'payload/types';
import CategorySummary from '../components/CategorySummary';
import { isAdmin } from '../access/isAdmin';

const Categories: CollectionConfig = {
  slug: 'categories',
  admin: {
    useAsTitle: 'name',
    defaultColumns: ['name'],
    group: 'Management',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  fields: [
    {
      name: 'name',
      type: 'text',
      label: 'Category',
      required: true,
      access: {
        read: () => true,
      },
    },
    {
      name: 'archived',
      type: 'checkbox',
      defaultValue: false,
      admin: {
        description:
          'Archiving filters it from being an option in the posts collection',
      },
    },
    {
      name: 'summary',
      type: 'ui',
      admin: {
        position: 'sidebar',
        components: {
          Field: CategorySummary,
        },
      },
    },
    // {
    //   label: ({ data }) => data?.title || 'Untitled',
    //   type: 'collapsible', // required
    //   fields: [
    //     // required
    //     {
    //       name: 'title',
    //       type: 'text',
    //       required: true,
    //     },
    //     {
    //       name: 'someTextField',
    //       type: 'text',
    //       required: true,
    //     },
    //   ],
    // },
  ],
};

export default Categories;
