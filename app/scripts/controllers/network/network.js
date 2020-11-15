import assert from 'assert'
import EventEmitter from 'events'
import ObservableStore from 'obs-store'
import ComposedStore from 'obs-store/lib/composed'
import log from 'loglevel'
import * as Web3 from '@solana/web3.js'
const BlockTracker = require('solana-block-tracker');
const SolanaQuery = require('solana-query');

import {
  DEVNET,
  TESTNET,
  MAINNET,
  NETWORK_TYPE_TO_INFO_MAP,
} from './enums';

// var BlockTracker = function BlockTracker(provider) {
//   this._provider = provider;
//   this._blockInfo = {};
//   this._blockInfo.currentEpochInfo = {};
//   this._networkState = null;
//   this._listeners = {};
//   this.updateBlockInfo().then(function() { console.log("Update blockinfo done!!!")});
//   this.updateNetworkState().then(function() { console.log("Update network state done!!!")});
// };

// BlockTracker.prototype.updateBlockInfo = async function () {
//   let commitment = "max";
//   this._blockInfo.currentSlot = await this._provider.getSlot(commitment);
//   this._blockInfo.currentEpochInfo = await this._provider.getEpochInfo(commitment);
// };

// BlockTracker.prototype.updateNetworkState = async function () {
//   this._networkState = await this._provider.getVersion();
// };

// BlockTracker.prototype.getCurrentBlock = function () {
//   return this._blockInfo.currentEpochInfo.blockHeight;
// };

// BlockTracker.prototype.getLatestBlock = function () {
//   return this._blockInfo.currentEpochInfo.blockHeight;
// }; 

// BlockTracker.prototype.once = function (commitment, callback) {
//   if (commitment=="lastest") commitment = "last";
//   this._provider.getEpochInfo(commitment).then(function(epochInfo) {
//     callback(epochInfo.blockHeight);
//   });
// };

// BlockTracker.prototype.addListener = function (commitment, callback) {
//   this._listeners[commitment] = callback;
// };

// BlockTracker.prototype.removeListener = function (commitment, callback) {
//   delete this._listeners[commitment];
// };

// BlockTracker.prototype.getNetworkState = function () {
//   return this._networkState;
// };

// BlockTracker.prototype.checkForLatestBlock = async function () {
//   await this.updateBlockInfo();
// };

const env = process.env.METAMASK_ENV;

let defaultProviderConfigOpts
if (process.env.IN_TEST === 'true') {
  defaultProviderConfigOpts = { type: DEVNET }
} else if (process.env.METAMASK_DEBUG || env === 'test') {
  defaultProviderConfigOpts = { type: TESTNET }
} else {
  defaultProviderConfigOpts = { type: MAINNET }
}

const defaultProviderConfig = {
  ticker: 'SOL',
  ...defaultProviderConfigOpts,
}

export default class NetworkController extends EventEmitter {

  constructor (opts = {}) {
    super()

    // create stores
    this.providerStore = new ObservableStore(
      opts.provider || { ...defaultProviderConfig },
    )
    this.networkStore = new ObservableStore('loading')
    this.store = new ComposedStore({
      provider: this.providerStore,
      network: this.networkStore,
    })

    // provider and block tracker
    this._provider = null;
    this._blockTracker = null;

    this.on('networkDidChange', this.lookupNetwork)
  }

  initializeProvider (providerParams) {
    this._baseProviderParams = providerParams
    let { type, rpcUrl, chainId } = this.getProviderConfig();
    if (type!="rpc") {
      rpcUrl = NETWORK_TYPE_TO_INFO_MAP[type].rpcUrl;
      chainId = NETWORK_TYPE_TO_INFO_MAP[type].chainId;
    }
    this._configureProvider({ type, rpcUrl, chainId })
    this.lookupNetwork()
  }

  // return the proxies so the references will always be good
  getProviderAndBlockTracker () {
    const provider = this._provider;
    const blockTracker = this._blockTracker;
    return { provider, blockTracker }
  }

  verifyNetwork () {
    // Check network when restoring connectivity:
    if (this.isNetworkLoading()) {
      this.lookupNetwork()
    }
  }

  getNetworkState () {
    return this.networkStore.getState()
  }

  setNetworkState (network) {
    this.networkStore.putState(network)
  }

  isNetworkLoading () {
    return this.getNetworkState() === 'loading'
  }

  lookupNetwork () {
    // Prevent firing when provider is not defined.
    if (!this._provider) {
      log.warn('NetworkController - lookupNetwork aborted due to missing provider')
      return
    }

    const chainId = this.getCurrentChainId()
    //console.log("lookupNetwork with chainId - networkState", chainId, this._blockTracker.getNetworkState());
    if (!chainId) {
      log.warn('NetworkController - lookupNetwork aborted due to missing chainId')
      this.setNetworkState('loading')
      return;
    }

    //this.setNetworkState({ 'solana-core': '1.3.19', 'feature-set': 2674527397 });
    // this.setNetworkState('1.3.19');
    //let networkState = { version: "1.3.19", chainId: chainId};
    //this.setNetworkState(JSON.stringify(networkState));
    this.setNetworkState(chainId);
    // if (this._blockTracker!=null && this._blockTracker.getNetworkState()!=null) {
    //   me.setNetworkState(this._blockTracker.getNetworkState());
      
    // } else {
    //   let me = this;
    //   if (this._blockTracker!=null) this._blockTracker.updateBlockInfo().then(function() {
    //     console.log("updateBlockInfo done in lookupNetwork function");
    //     me.lookupNetwork();
    //   })
    // }
  }

  getCurrentChainId () {
    const { type, chainId: configChainId } = this.getProviderConfig()
    return NETWORK_TYPE_TO_INFO_MAP[type]?.chainId || configChainId
  }

  // Support custom RPC
  setRpcTarget (rpcUrl, chainId, ticker = 'SOL', nickname = '', rpcPrefs) {
    this.setProviderConfig({
      type: 'rpc',
      rpcUrl,
      chainId,
      ticker,
      nickname,
      rpcPrefs,
    })
  }

  // Support current supported network
  async setProviderType (type, rpcUrl = '', ticker = 'SOL', nickname = '') {
    assert.notEqual(type, 'rpc', `NetworkController - cannot call "setProviderType" with type 'rpc'. use "setRpcTarget"`)
    console.log("xxxx setProviderType", type)
    this.setProviderConfig({ type, rpcUrl, chainId, ticker, nickname })
  }

  resetConnection () {
    this.setProviderConfig(this.getProviderConfig())
  }

  /**
   * Sets the provider config and switches the network.
   */
  setProviderConfig (config) {
    this.providerStore.updateState(config)
    this._switchNetwork(config)
  }

  getProviderConfig () {
    let providerConfig = this.providerStore.getState();
    if (providerConfig.chainId==null && providerConfig.type!='rpc') {
      providerConfig.chainId = NETWORK_TYPE_TO_INFO_MAP[providerConfig.type].chainId;
    }
    return providerConfig;
  }

  //
  // Private
  //

  _switchNetwork (opts) {
    console.log("_switchNetwork started", opts);
    this.setNetworkState('loading')
    this._configureProvider(opts)
    this.emit('networkDidChange', opts.type)
    console.log("_switchNetwork done");
  }

  _configureProvider ({ type, rpcUrl, chainId }) {
    // infura type-based endpoints
    if (type === 'rpc') {
      this._configureStandardProvider(rpcUrl, chainId)
    } else {
      let info = NETWORK_TYPE_TO_INFO_MAP[type];
      if (info!=null) {
        rpcUrl = info.rpcUrl;
        chainId = info.chainId;
        this._configureStandardProvider(rpcUrl, chainId)
      } else {
        throw new Error(`NetworkController - _configureProvider - unknown type "${type}"`)
      }
    }
  }

  _configureStandardProvider (rpcUrl, chainId) {
    log.info('NetworkController - configureStandardProvider', rpcUrl)
    const networkProvider = new Web3.Connection(rpcUrl);
    const blockTracker = new BlockTracker({provider: new SolanaQuery(networkProvider)});
    this._setNetworkClient(networkProvider, blockTracker);
  }

  _setNetworkClient (networkProvider, blockTracker) {
    this._provider = networkProvider;
    this._blockTracker = blockTracker;
  }
}
