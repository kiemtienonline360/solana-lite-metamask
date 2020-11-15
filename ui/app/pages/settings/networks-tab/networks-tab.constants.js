import {
  MAINNET,
  MAINNET_CHAIN_ID,
  MAINNET_ENDPOINT_URL,
  TESTNET,
  TESTNET_CHAIN_ID,
  TESTNET_ENDPOINT_URL,
  DEVNET,
  DEVNET_CHAIN_ID,
  DEVNET_ENDPOINT_URL,
  LOCALNET,
  LOCALNET_CHAIN_ID,
  LOCALNET_ENDPOINT_URL
} from '../../../../../app/scripts/controllers/network/enums'

const defaultNetworksData = [
  {
    labelKey: MAINNET,
    iconColor: '#29B6AF',
    providerType: MAINNET,
    rpcUrl: MAINNET_ENDPOINT_URL,
    chainId: MAINNET_CHAIN_ID,
    ticker: 'SOL',
    blockExplorerUrl: 'https://explorer.solana.com/',
  },
  {
    labelKey: TESTNET,
    iconColor: '#FF4A8D',
    providerType: TESTNET,
    rpcUrl: TESTNET_ENDPOINT_URL,
    chainId: TESTNET_CHAIN_ID,
    ticker: 'SOL',
    blockExplorerUrl: 'https://explorer.solana.com/?cluster=testnet',
  },
  {
    labelKey: DEVNET,
    iconColor: '#F6C343',
    providerType: DEVNET,
    rpcUrl: DEVNET_ENDPOINT_URL,
    chainId: DEVNET_CHAIN_ID,
    ticker: 'SOL',
    blockExplorerUrl: 'https://explorer.solana.com/?cluster=devnet',
  },
  {
    labelKey: LOCALNET,
    iconColor: '#3099f2',
    providerType: LOCALNET,
    rpcUrl: LOCALNET_ENDPOINT_URL,
    chainId: LOCALNET_CHAIN_ID,
    ticker: 'SOL',
    blockExplorerUrl: '',
  },
]

export {
  defaultNetworksData,
}
