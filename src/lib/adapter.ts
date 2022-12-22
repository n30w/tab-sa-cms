import { s3Adapter } from '@payloadcms/plugin-cloud-storage/s3';

const s3Client = s3Adapter({
  config: {
    // The endpoint can be found on the top right
    // corner of the space's tab
    endpoint: process.env.SPACES_ENDPOINT,
    forcePathStyle: false,
    region: 'us-east-1',
    // Find these credentials under Digital Ocean Control Panel
    // under the API tab on the sidebar
    credentials: {
      accessKeyId: process.env.SPACES_KEY,
      secretAccessKey: process.env.SPACES_SECRET,
    },
  },
  // This is the name of the space on the spaces tab
  bucket: 'tabsa',
});

export default s3Client;
