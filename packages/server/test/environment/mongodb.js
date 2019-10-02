/* eslint-disable */
const { MongoMemoryServer } = require('mongodb-memory-server')
const NodeEnvironment = require('jest-environment-node')

class MongoDbEnvironment extends NodeEnvironment {
  constructor(config) {
    //console.error('\n# MongoDB Environment Constructor #\n');
    super(config)
    this.mongod = new MongoMemoryServer()
  }

  async setup() {
    await super.setup()
    //console.error('\n# MongoDB Environment Setup #\n');
    this.global.__MONGO_URI__ = await this.mongod.getConnectionString()
    this.global.__MONGO_DB_NAME__ = await this.mongod.getDbName()
    this.global.__COUNTERS__ = {
      user: 0,
    }
  }

  async teardown() {
    await super.teardown()
    // console.error('\n# MongoDB Environment Teardown #\n');
    await this.mongod.stop()
    this.mongod = null
    this.global = {}
  }

  runScript(script) {
    return super.runScript(script)
  }
}

module.exports = MongoDbEnvironment
