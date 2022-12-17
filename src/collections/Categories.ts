import { CollectionConfig } from "payload/types";

const Categories: CollectionConfig = {
  slug: "categories",
  admin: {
    useAsTitle: "name",
    defaultColumns: ["name", "id", "archived"],
    group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "name",
      type: "text",
      localized: true,
    },
    {
      name: "archived",
      type: "checkbox",
      defaultValue: false,
      admin: {
        description:
          "Archiving filters it from being an option in the posts collection",
      },
    },
  ],
};

export default Categories;
