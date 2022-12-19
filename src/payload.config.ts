import { buildConfig } from 'payload/config';
import { cloudStorage } from '@payloadcms/plugin-cloud-storage';
import s3Client from './lib/adapter';
import path from 'path';
import Users from './collections/Users';
import Posts from './collections/Posts';
import Categories from './collections/Categories';
import Staff from './collections/Staff';
import Media from './collections/Media';
import Files from './collections/Files';
import Components from './collections/Components';

export default buildConfig({
  serverURL: 'http://localhost:4000',
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Categories, Staff, Media, Files, Components],
  rateLimit: {
    trustProxy: true,
    window: 2 * 60 * 1000, // 2 minutes
    max: 2400, // limit each IP per windowMs
  },
  graphQL: {
    disable: true,
  },
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
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
