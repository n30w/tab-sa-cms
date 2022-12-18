import { CollectionConfig } from "payload/types";

const Posts: CollectionConfig = {
  slug: "posts",
  admin: {
    useAsTitle: "title",
    defaultColumns: ["title", "author", "date", "category"],
    group: "Content",
  },
  access: {
    read: ({ req }) => {
      // Returns all docs if logged in, if not
      // returns only the published ones
      if (req.user) return true;

      return {
        or: [
          {
            _status: {
              equals: "published",
            },
          },
          {
            _status: {
              exists: false,
            },
          },
        ],
      };
    },
  },
  versions: {
    drafts: {
      autosave: true,
    },
  },
  fields: [
    {
      name: "title",
      type: "text",
      required: true,
    },
    {
      name: "author",
      type: "text",
      required: true,
    },
    {
      name: "date",
      type: "date",
      label: "Date",
    },
    {
      name: "category",
      type: "relationship",
      relationTo: "categories",
      hasMany: true,
    },
    {
      name: "body", // required
      type: "richText", // required
      defaultValue: [
        {
          children: [{ text: "Start typing here" }],
        },
      ],
      required: true,
      admin: {
        elements: ["h2", "h3", "h4", "link"],
        leaves: ["bold", "italic"],
        link: {
          // Inject your own fields into the Link element
          fields: [
            {
              name: "rel",
              label: "Rel Attribute",
              type: "select",
              hasMany: true,
              options: ["noopener", "noreferrer", "nofollow"],
            },
          ],
        },
        upload: {
          collections: {
            media: {
              fields: [
                // any fields that you would like to save
                // on an upload element in the `media` collection
              ],
            },
          },
        },
      },
    },
  ],
};

export default Posts;
