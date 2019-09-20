import fs from 'fs'
import path from 'path'

import { graphql } from 'graphql'
import { introspectionQuery, printSchema } from 'graphql/utilities'

// Save JSON of full schema introspection for Babel Relay Plugin to use
import { schema } from '../src/schema'
;(async () => {
  const result = await graphql(schema, introspectionQuery)
  if (result.errors) {
    // eslint-disable-next-line no-console
    console.error('ERROR introspecting schema: ', JSON.stringify(result.errors, null, 2))
  } else {
    fs.writeFileSync(path.join(__dirname, '../data/schema.json'), JSON.stringify(result, null, 2))

    process.exit(0)
  }
})()

fs.writeFileSync(path.join(__dirname, '../data/schema.graphql'), printSchema(schema))
