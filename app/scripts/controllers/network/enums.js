export const MAINNET = 'mainnet'
export const TESTNET = 'testnet'
export const DEVNET = 'devnet'
export const LOCALNET = 'localnet'

export const MAINNET_NETWORK_ID = '1'
export const TESTNET_NETWORK_ID = '2'
export const DEVNET_NETWORK_ID = '3'
export const LOCALNET_NETWORK_ID = '4'

export const MAINNET_CHAIN_ID = '0x01'
export const TESTNET_CHAIN_ID = '0x02'
export const DEVNET_CHAIN_ID = '0x03'
export const LOCALNET_CHAIN_ID = '0x04'

export const MAINNET_DISPLAY_NAME = 'Mainnet Beta'
export const TESTNET_DISPLAY_NAME = 'Testnet'
export const DEVNET_DISPLAY_NAME = 'Devnet'
export const LOCALNET_DISPLAY_NAME = 'Localhost'

export const MAINNET_ENDPOINT_URL = 'https://api.mainnet-beta.solana.com'
export const TESTNET_ENDPOINT_URL = 'https://testnet.solana.com'
export const DEVNET_ENDPOINT_URL = 'https://devnet.solana.com'
export const LOCALNET_ENDPOINT_URL = 'http://localhost:8899'

export const SOLANA_PROVIDER_TYPES = [
  MAINNET,
  TESTNET,
  DEVNET,
  LOCALNET,
]

export const NETWORK_TYPE_TO_INFO_MAP = {
  [MAINNET]: { networkId: MAINNET_NETWORK_ID, rpcUrl: MAINNET_ENDPOINT_URL, chainId: MAINNET_CHAIN_ID },
  [TESTNET]: { networkId: TESTNET_NETWORK_ID, rpcUrl: TESTNET_ENDPOINT_URL, chainId: TESTNET_CHAIN_ID },
  [DEVNET]: { networkId: DEVNET_NETWORK_ID, rpcUrl: DEVNET_ENDPOINT_URL, chainId: DEVNET_CHAIN_ID },
  [LOCALNET]: { networkId: LOCALNET_NETWORK_ID, rpcUrl: LOCALNET_ENDPOINT_URL, chainId: LOCALNET_CHAIN_ID },
}

export const NETWORK_TO_NAME_MAP = {
  [MAINNET]: MAINNET_DISPLAY_NAME,
  [TESTNET]: TESTNET_DISPLAY_NAME,
  [DEVNET]: DEVNET_DISPLAY_NAME,
  [LOCALNET]: LOCALNET_DISPLAY_NAME,

  [MAINNET_CHAIN_ID]: MAINNET_DISPLAY_NAME,
  [TESTNET_CHAIN_ID]: TESTNET_DISPLAY_NAME,
  [DEVNET_CHAIN_ID]: DEVNET_DISPLAY_NAME,
  [LOCALNET_CHAIN_ID]: LOCALNET_DISPLAY_NAME
}

export const CHAINID_TO_NETWORK_TYPE_MAP = {
  [MAINNET_CHAIN_ID]: MAINNET,
  [TESTNET_CHAIN_ID]: TESTNET,
  [DEVNET_CHAIN_ID]: DEVNET,
  [LOCALNET_CHAIN_ID]: LOCALNET
}
