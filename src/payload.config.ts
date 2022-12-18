import { buildConfig } from 'payload/config';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import path from 'path';
import Users from './collections/Users';
import Posts from './collections/Posts';
import Categories from './collections/Categories';
import Staff from './collections/Staff';
import Media from './collections/Media';
import s3Client from './lib/adapter';

export default buildConfig({
  plugins: [
    cloudStorage({
      collections: {
        // prettier-ignore
        'media': {
          adapter: s3Client,
        },
      },
    }),
  ],
  serverURL: 'http://localhost:4000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Categories, Staff, Media],
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400, // limit each IP per windowMs
  },
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },

  graphQL: {
    // schemaOutputFile: path.resolve(__dirname, "generated-schema.graphql"),
    disablePlaygroundInProduction: true,
    disable: true,
  },
  // Not using GraphQL for this project
  // graphQL: false
});
