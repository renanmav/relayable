import { Environment, Network, RecordSource, Store } from 'relay-runtime'
// @ts-ignore
import { installRelayDevTools } from 'relay-devtools'
// @ts-ignore
import createRelayNetworkLogger from 'relay-runtime/lib/network/createRelayNetworkLogger'
// @ts-ignore
import RelayNetworkLoggerTransaction from 'relay-runtime/lib/network/RelayNetworkLoggerTransaction'

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

export default env
