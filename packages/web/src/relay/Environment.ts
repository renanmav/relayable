import {
  Environment,
  Network,
  RecordSource,
  Store,
  // @ts-ignore
  RelayNetworkLoggerTransaction,
  // @ts-ignore
  createRelayNetworkLogger,
  commitLocalUpdate,
} from 'relay-runtime'
// @ts-ignore
import { installRelayDevTools } from 'relay-devtools'

import cacheHandler from './cacheHandler'

const RelayNetworkLogger = createRelayNetworkLogger(RelayNetworkLoggerTransaction)

if (process.env.NODE_ENV === 'development') {
  installRelayDevTools()
}

const network = Network.create(
  process.env.NODE_ENV === 'development' ? RelayNetworkLogger.wrapFetch(cacheHandler) : cacheHandler
)

const source = new RecordSource()
const store = new Store(source)

const env = new Environment({
  network,
  store,
})

commitLocalUpdate(env, proxyStore => {
  const fieldKey = 'settings'
  const __typename = 'Settings'

  const dataID = `client:${__typename}`
  const record = proxyStore.create(dataID, __typename)

  record.setValue(false, 'darkTheme')

  env.retain({
    dataID,
    variables: {},
    // @ts-ignore
    node: { selections: [] },
  })

  proxyStore.getRoot().setLinkedRecord(record, fieldKey)
})

export default env
