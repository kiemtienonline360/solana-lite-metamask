import * as networkEnums from '../../app/scripts/controllers/network/enums'

/**
 * Gets the etherscan.io URL prefix for a given network ID.
 *
 * @param {string} networkId - The network ID to get the prefix for.
 * @returns {string} The etherscan.io URL prefix for the given network ID.
 */
export function getEtherscanNetworkPrefix (networkId) {
  switch (networkId) {
    case networkEnums.TESTNET_NETWORK_ID:
      return 'testnet.'
    case networkEnums.DEVNET_NETWORK_ID:
      return 'devnet.'
    case networkEnums.LOCALNET_NETWORK_ID:
      return 'localnet.'
    default: // also covers mainnet
      return ''
  }
}
