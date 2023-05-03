// Pages describes the main pages, which can be seen on the navbar.
// Each page contains dynamic content in a static template. The template
// is set by the UI/UX design team, which is then coded into the website.
// Therefore, the only thing content managers need to worry about is not
// the layout, but just the content, which is the most important thing
// in this case.

import { CollectionConfig } from 'payload/types';
import { Staff } from '../payload-types';
import { StaffGrid } from '../blocks/StaffGrid';
import { pageLayouts } from '../fields/pageLayouts';
import { regeneratePage } from '../utils/regeneratePage';
import { isAdmin } from '../access/isAdmin';

const Pages: CollectionConfig = {
  slug: 'pages',
  admin: {
    useAsTitle: 'title',
    defaultColumns: ['title'],
    group: 'Content',
  },
  access: {
    create: isAdmin,
    read: () => true,
    update: isAdmin,
    delete: isAdmin,
  },
  hooks: {
    afterChange: [
      ({ req: { payload }, doc }) => {
        regeneratePage({
          payload,
          collection: 'pages',
          doc,
        });
      },
    ],
  },
  fields: [
    {
      name: 'title',
      label: 'Page Name',
      type: 'text',
    },
    pageLayouts,
  ],
};

export default Pages;
