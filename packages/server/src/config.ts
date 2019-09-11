const { env } = process

const dbProd = env.MONGODB_URL
const dbDev = `mongodb://${
  env.IS_FROM_DOCKER
    ? 'database'
    : 'localhost'
}:27017/db-dev`

export const graphqlPort = env.GRAPHQL_PORT || 5000
export const dbUri = env.NODE_ENV === 'production' || env.IS_FROM_NOW
  ? dbProd
  : dbDev
