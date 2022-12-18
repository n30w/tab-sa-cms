import { CollectionConfig } from "payload/types";

const Staff: CollectionConfig = {
  slug: "staff",
  admin: {
    useAsTitle: "role",
    defaultColumns: ["firstName", "lastName", "role"],
    // group: "Content",
  },
  access: {
    read: () => true,
  },
  fields: [
    {
      name: "firstName",
      type: "text",
      required: true,
    },
    {
      name: "lastName",
      type: "text",
      required: true,
    },
    {
      name: "role",
      type: "text",
      required: true,
    },
    {
      name: "blurb",
      type: "textarea",
      required: true,
    },
  ],
};

export default Staff;
