// This is a function that sends an API request to
// regenerate a page on a CMS content update. It
// contacts the Vercel NextJS API with the secret to
// start Incremental Static Regeneration (ISR). This function
// can be used in the "afterChange" hook on any collection.

import { Payload } from 'payload';
import { formatPagePath } from './formatPagePath';

export const regeneratePage = async ({
  doc,
  collection,
  payload,
}: {
  doc: any;
  collection: string;
  payload: Payload;
}): Promise<void> => {
  const path = await formatPagePath(collection, doc);

  try {
    const res = await fetch(
      `${process.env.PAYLOAD_PUBLIC_APP_URL}/api/revalidate?secret=${process.env.PAYLOAD_PRIVATE_NEXTJS_REVALIDATION_KEY}&path=${path}`
    );

    if (res.ok) {
      payload.logger.info(`Revalidated path ${path}`);
    } else {
      payload.logger.error(`Error revalidating path ${path}`);
    }
  } catch (err) {
    payload.logger.error(`Error hitting revalidate route for ${path}`);
  }
};
