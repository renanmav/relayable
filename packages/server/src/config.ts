const { env } = process

const dbProd = `mongodb://${env.IS_FROM_DOCKER ? 'database' : 'localhost'}:27017/db-prod`
const dbDev = `mongodb://${env.IS_FROM_DOCKER ? 'database' : 'localhost'}:27017/db-dev`

export const graphqlPort = env.GRAPHQL_PORT || 5000
export const dbUri = env.NODE_ENV === 'production' ? dbProd : dbDev
