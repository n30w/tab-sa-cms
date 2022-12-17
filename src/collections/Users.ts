import { CollectionConfig } from 'payload/types';

const Users: CollectionConfig = {
  slug: 'users',
  auth: true,
  admin: {
    useAsTitle: 'email',
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: 'firstName',
      type: 'text',
    },
    { name: 'lastName',
      type: 'text',
    },
    // Email added by default
    // Add more fields as needed
  ],
};

export default Users;
