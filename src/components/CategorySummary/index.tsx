// This component is a modification of:
// https://github.com/payloadcms/public-demo/blob/master/src/components/CategorySummary/index.tsx
import React, { useEffect, useState } from 'react';
import qs from 'qs';
import { useDocumentInfo } from 'payload/dist/admin/components/utilities/DocumentInfo';

const get = (url: string, params: unknown = {}): Promise<Response> => {
  const query = qs.stringify(params, { addQueryPrefix: true });
  return fetch(`${url}${query}`);
};

/**
 * A custom UI component for the category to display count of posts and add links
 * @constructor
 */
const CategorySummary: React.FC = () => {
  // access the id of a saved document from payload
  const { id } = useDocumentInfo();

  // getters and setters for component state variables
  // const [isLoading, setIsLoading] = useState(true);
  const [postCount, setPostCount] = useState(null);
  const [mediaCount, setMediaCount] = useState(null);
  const [fileCount, setFileCount] = useState(null);
  const [error, setError] = useState(false);
  const collectionsQuery = [
    { collection: 'posts' },
    { collection: 'media' },
    { collection: 'files' },
  ];

  // useEffect adds a hook so that when the id is set the function is called
  useEffect(() => {
    const queryRelations = async (collection) => {
      const request = await get(`/api/${collection.collection}`, {
        where: {
          // the 'in' operator is used when relations can be more than one
          category: { in: id },
          // to add more query constraints use 'or', 'and' operator objects
        },
        depth: 0,
        limit: 0,
      });
      const result = await request.json();

      if (result?.docs) {
        switch (collection.collection) {
          case 'posts':
            setPostCount(result?.totalDocs);
          case 'media':
            setMediaCount(result?.totalDocs);
          case 'files':
            setFileCount(result?.totalDocs);
        }
      }

      if (result.status >= 400) {
        setError(true);
      }
    };

    collectionsQuery.map((collection) => queryRelations(collection));
    if (id) {
      // async functions are defined and called to avoid `await` in useEffect functions
    }
    // setIsLoading(false);
  }, [id]);

  if (!id) {
    return null;
  }

  if (error) {
    return <span>There was a problem fetching data</span>;
  }

  return (
    <div>
      <h4>Contents</h4>
      {collectionsQuery.map((collection, i) => (
        <h3 key={i}>
          {/* collection index filters use url params to allow linking to queries */}
          <a
            href={`/admin/collections/${collection.collection}?where[or][0][and][0][category][in][0]=${id}`}
          >
            {collection.collection}
          </a>
        </h3>
      ))}
    </div>
  );
};

export default CategorySummary;
