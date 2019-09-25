import React from 'react'
import { GraphQLTaggedNode, Variables } from 'relay-runtime'
import { QueryRenderer } from 'react-relay'
import hoistStatics from 'hoist-non-react-statics'
// @ts-ignore
import { createMockEnvironment } from 'relay-test-utils'

import { Environment } from '.'

/* eslint-disable @typescript-eslint/no-explicit-any */
interface Config {
  query?: GraphQLTaggedNode
  queriesParams?: (props: Object) => Object
  variables?: Variables
  hideSplash?: boolean
}

export const env = createMockEnvironment()

export default function createQueryRenderer(
  FragmentComponent: React.ComponentType<any>,
  Component: React.ComponentType<any>,
  config: Config,
  LoadingComponent?: React.ComponentType<any>
) {
  const { query, queriesParams } = config

  function QueryRendererWrapper(props: Object) {
    const variables = (queriesParams ? queriesParams(props) : config.variables) as Variables

    return (
      <QueryRenderer
        environment={process.env.NODE_ENV === 'test' ? env : Environment}
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

          return LoadingComponent ? <LoadingComponent /> : <div>Loading</div>
        }}
      />
    )
  }

  return hoistStatics(QueryRendererWrapper, Component)
}
