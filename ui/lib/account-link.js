export default function getAccountLink (address, network, rpcPrefs) {
  if (rpcPrefs && rpcPrefs.blockExplorerUrl) {
    return `${rpcPrefs.blockExplorerUrl.replace(/\/+$/u, '')}/address/${address}`
  }

  // eslint-disable-next-line radix
  const net = parseInt(network)
  switch (net) {
    case 1: // main net
      return `https://explorer.solana.com/address/${address}`
    case 2: // test net
      return `https://explorer.solana.com/address/${address}?cluster=testnet`
    case 3: // dev net
      return `https://explorer.solana.com/address/${address}?cluster=devnet`
    default:
      return ''
  }
}
