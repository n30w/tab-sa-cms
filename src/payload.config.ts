import { buildConfig } from "payload/config";
import path from "path";
// import Examples from './collections/Examples';
import Users from "./collections/Users";
import Posts from "./collections/Posts";
import Categories from "./collections/Categories";
import Staff from "./collections/Staff";

export default buildConfig({
  serverURL: "http://localhost:4000",
  admin: {
    user: Users.slug,
  },
  collections: [
    Users,
    Posts,
    Categories,
    Staff,
    // Add Collections here
    // Examples,
  ],
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400, // limit each IP per windowMs
  },
  typescript: {
    outputFile: path.resolve(__dirname, "payload-types.ts"),
  },

  graphQL: {
    // schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    disablePlaygroundInProduction: true,
    disable: true,
  },
  // Not using GraphQL for this project
  // graphQL: false
});
