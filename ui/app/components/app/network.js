import PropTypes from 'prop-types'
import React, { Component } from 'react'
import classnames from 'classnames'
import NetworkDropdownIcon from './dropdowns/components/network-dropdown-icon'

function NetworkIndicator ({ disabled, children, hoverText, onClick, providerName }) {
  return (
    <div
      className={classnames('network-component pointer', {
        'network-component--disabled': disabled,
        'solana-network': providerName === 'mainnet',
        'testnet-network': providerName === 'testnet',
        'devnet-network': providerName === 'devnet',
        'localnet-network': providerName === 'localnet',
      })}
      title={hoverText}
      onClick={(event) => {
        if (!disabled) {
          onClick(event)
        }
      }}
    >
      <div className="network-indicator">
        {children}
        <div className="network-indicator__down-arrow" />
      </div>
    </div>
  )
}

NetworkIndicator.propTypes = {
  children: PropTypes.node.isRequired,
  disabled: PropTypes.bool,
  hoverText: PropTypes.string,
  onClick: PropTypes.func,
  providerName: PropTypes.string,
}

export default class Network extends Component {
  static contextTypes = {
    t: PropTypes.func,
  }

  static propTypes = {
    network: PropTypes.string.isRequired,
    provider: PropTypes.shape({
      type: PropTypes.string,
      nickname: PropTypes.string,
      rpcUrl: PropTypes.string,
    }).isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func.isRequired,
  }

  render () {
    const {
      t,
    } = this.context

    const {
      disabled,
      network: networkNumber,
      onClick,
      provider,
    } = this.props

    let providerName, providerNick, providerUrl
    if (provider) {
      providerName = provider.type
      providerNick = provider.nickname || ''
      providerUrl = provider.rpcUrl
    }

    switch (providerName) {
      case 'mainnet':
        return (
          <NetworkIndicator disabled={disabled} hoverText={t('mainnet')} onClick={onClick} providerName={providerName}>
            <NetworkDropdownIcon
              backgroundColor="#038789"
              nonSelectBackgroundColor="#15afb2"
              loading={networkNumber === 'loading'}
            />
            <div className="network-name">{t('mainnet')}</div>
          </NetworkIndicator>
        )

      case 'testnet':
        return (
          <NetworkIndicator disabled={disabled} hoverText={t('testnet')} onClick={onClick} providerName={providerName}>
            <NetworkDropdownIcon
              backgroundColor="#e91550"
              nonSelectBackgroundColor="#ec2c50"
              loading={networkNumber === 'loading'}
            />
            <div className="network-name">{t('testnet')}</div>
          </NetworkIndicator>
        )

      case 'devnet':
        return (
          <NetworkIndicator disabled={disabled} hoverText={t('devnet')} onClick={onClick} providerName={providerName}>
            <NetworkDropdownIcon
              backgroundColor="#690496"
              nonSelectBackgroundColor="#b039f3"
              loading={networkNumber === 'loading'}
            />
            <div className="network-name">{t('devnet')}</div>
          </NetworkIndicator>
        )

      case 'localnet':
        return (
          <NetworkIndicator disabled={disabled} hoverText={t('localnet')} onClick={onClick} providerName={providerName}>
            <NetworkDropdownIcon
              backgroundColor="#ebb33f"
              nonSelectBackgroundColor="#ecb23e"
              loading={networkNumber === 'loading'}
            />
            <div className="network-name">{t('localnet')}</div>
          </NetworkIndicator>
        )

      default:
        return (
          <NetworkIndicator
            disabled={disabled}
            hoverText={providerNick || providerName || providerUrl || null}
            onClick={onClick}
            providerName={providerName}
          >
            {
              networkNumber === 'loading'
                ? (
                  <span className="pointer network-loading-spinner" onClick={(event) => onClick(event)}>
                    <img title={t('attemptingConnect')} src="images/loading.svg" alt="" />
                  </span>
                )
                : (
                  <i className="fa fa-question-circle fa-lg" style={{ color: 'rgb(125, 128, 130)' }} />
                )
            }
            <div className="network-name">
              {providerNick || t('privateNetwork')}
            </div>
          </NetworkIndicator>
        )
    }
  }
}
