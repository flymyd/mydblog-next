import Head from 'next/head';
import React from 'react';
import {GetServerSideProps} from 'next';
import {renderToString} from 'react-dom/server';
import algoliasearch from 'algoliasearch/lite';
import {Hit as AlgoliaHit} from 'instantsearch.js';
import {
  InstantSearch,
  Hits,
  Highlight,
  SearchBox,
  InstantSearchServerState,
  InstantSearchSSRProvider,
} from 'react-instantsearch-hooks-web';
import {getServerState} from 'react-instantsearch-hooks-server';
import {createInstantSearchRouterNext} from 'react-instantsearch-hooks-router-nextjs';
import singletonRouter from 'next/router';

const client = algoliasearch('latency', '6be0576ff61c053d5f9a3225e2a90f76');

type HitProps = {
  hit: AlgoliaHit<{
    name: string;
    price: number;
  }>;
};

function Hit({hit}: HitProps) {
  return (
    <>
      <Highlight hit={hit} attribute="name" className="Hit-label"/>
      <span className="Hit-price">${hit.price}</span>
    </>
  );
}

type HomePageProps = {
  serverState?: InstantSearchServerState;
  url?: string;
};

export default function TestPage({serverState, url}: HomePageProps) {
  return (
    <InstantSearchSSRProvider {...serverState}>
      <Head>
        <title>React InstantSearch Hooks - Next.js</title>
      </Head>

      <InstantSearch
        searchClient={client}
        indexName="instant_search"
        routing={{
          router: createInstantSearchRouterNext({
            serverUrl: url,
            singletonRouter,
          }),
        }}
      >
        <div className="Container">
          <div>
            <SearchBox/>
            <Hits hitComponent={Hit}/>
          </div>
        </div>
      </InstantSearch>
    </InstantSearchSSRProvider>
  );
}

export const getServerSideProps: GetServerSideProps<HomePageProps> =
  async function getServerSideProps({req}) {
    const protocol = req.headers.referer?.split('://')[0] || 'https';
    const url = `${protocol}://${req.headers.host}${req.url}`;
    const serverState = await getServerState(<TestPage url={url}/>, {
      renderToString,
    });

    return {
      props: {
        serverState,
        url,
      },
    };
  };
