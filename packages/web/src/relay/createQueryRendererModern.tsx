import * as React from 'react'
import { GraphQLTaggedNode, Variables } from 'relay-runtime'
import { QueryRenderer } from 'react-relay'
import hoistStatics from 'hoist-non-react-statics'

import { Environment } from '.'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Config {
  query?: GraphQLTaggedNode
  queriesParams?: (props: Object) => Object
  variables?: Variables
  hideSplash?: boolean
}

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType<any>,
  Component: React.ComponentType<any>,
  config: Config
) {
  const { query, queriesParams } = config

  function QueryRendererWrapper(props: Object) {
    const variables = (queriesParams ? queriesParams(props) : config.variables) as Variables

    return (
      <QueryRenderer
        environment={Environment}
        query={query}
        variables={variables}
        render={({ error, props: relayProps }) => {
          if (error) {
            return (
              <>
                <h1>{error.name.toString()}</h1>
                <p>{error.message.toString()}</p>
              </>
            )
          }

          if (relayProps) {
            return <FragmentComponent {...props} query={relayProps} />
          }

          return <div>Loading</div>
        }}
      />
    )
  }

  return hoistStatics(QueryRendererWrapper, Component)
}
