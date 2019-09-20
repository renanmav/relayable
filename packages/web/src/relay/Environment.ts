import { Environment, Network, RecordSource, Store } from 'relay-runtime'
// @ts-ignore
import RelayNetworkLogger from 'relay-runtime/lib/RelayNetworkLogger'
// @ts-ignore
import { installRelayDevTools } from 'relay-devtools'

import cacheHandler from './cacheHandler'

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
