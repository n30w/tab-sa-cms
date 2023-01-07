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
import Pages from './collections/Pages';

export default buildConfig({
  serverURL: process.env.SERVER_PAYLOAD_PUBLIC_SERVER_URL,
  admin: {
    user: Users.slug,
  },
  collections: [Users, Posts, Categories, Staff, Media, Files, Pages],
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
          prefix: 'media/',
        },
        // prettier-ignore
        'files': {
          adapter: s3Client,
          prefix: 'files/',
        },
      },
    }),
  ],
  typescript: {
    outputFile: path.resolve(__dirname, 'payload-types.ts'),
  },
});
