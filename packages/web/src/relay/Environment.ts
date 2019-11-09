import { Environment, Network, RecordSource, Store, commitLocalUpdate } from 'relay-runtime'
// @ts-ignore
import { installRelayDevTools } from 'relay-devtools'

import { yottaDarkTheme } from '../utils/contants'

import cacheHandler from './cacheHandler'

if (process.env.NODE_ENV === 'development') {
  installRelayDevTools()
}

const network = Network.create(cacheHandler)

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

  const darkTheme = localStorage.getItem(yottaDarkTheme) === 'true'

  record.setValue(darkTheme, 'darkTheme')

  env.retain({
    dataID,
    variables: {},
    // @ts-ignore
    node: { selections: [] },
  })

  proxyStore.getRoot().setLinkedRecord(record, fieldKey)
})

export default env
