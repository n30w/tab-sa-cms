import { Field } from 'payload/types';

const categoryRelationship: Field = {
  name: 'category',
  type: 'relationship',
  relationTo: 'categories',
  label: 'Categories',
  required: true,
};

export default categoryRelationship;
