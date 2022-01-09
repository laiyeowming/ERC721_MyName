
const HDWalletProvider = require('@truffle/hdwallet-provider');

module.exports = {
  networks: {
    test: {
      host: "127.0.0.1",     // Localhost (default: none)
      port: 7545,            // Standard Ethereum port (default: none)
      network_id: "*",       // Any network (default: none)
    },
    "ropsten": {
      provider: () => new HDWalletProvider(mnemonic, `https://ropsten.infura.io/v3/${projectId}`),
      network_id: 3,       // Ropsten's id
      gas: 5500000,        // Ropsten has a lower block limit than mainnet
      networkCheckTimeout: 1000000,
      confirmations: 2,    // # of confs to wait between deployments. (default: 0)
      timeoutBlocks: 200,  // # of blocks before a deployment times out  (minimum/default: 50)
      skipDryRun: true     // Skip dry run before migrations? (default: false for public nets )
    },
  },

  compilers: {
    solc: {
      version: "0.8.0",    // Fetch exact version from solc-bin (default: truffle's version)
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  }
}
