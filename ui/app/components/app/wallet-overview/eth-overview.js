import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { useDispatch, useSelector } from 'react-redux'
import classnames from 'classnames'
import { useHistory } from 'react-router-dom'

import Identicon from '../../ui/identicon'
import { I18nContext } from '../../../contexts/i18n'
import { useMetricEvent, useNewMetricEvent } from '../../../hooks/useMetricEvent'
import { useSwapsEthToken } from '../../../hooks/useSwapsEthToken'
import Tooltip from '../../ui/tooltip'
import UserPreferencedCurrencyDisplay from '../user-preferenced-currency-display'
import { PRIMARY, SECONDARY } from '../../../helpers/constants/common'
import { showModal } from '../../../store/actions'
import { isBalanceCached, getSelectedAccount, getShouldShowFiat, getCurrentNetworkId, getCurrentKeyring } from '../../../selectors/selectors'
import BuyIcon from '../../ui/icon/overview-buy-icon.component'
import SendIcon from '../../ui/icon/overview-send-icon.component'
import IconButton from '../../ui/icon-button'
import { MAINNET_NETWORK_ID } from '../../../../../app/scripts/controllers/network/enums'
import WalletOverview from './wallet-overview'

const EthOverview = ({ className }) => {
  const dispatch = useDispatch()
  const t = useContext(I18nContext)
  const sendEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Send: Eth',
    },
  })
  const depositEvent = useMetricEvent({
    eventOpts: {
      category: 'Navigation',
      action: 'Home',
      name: 'Clicked Deposit',
    },
  })
  const history = useHistory()
  const keyring = useSelector(getCurrentKeyring)
  const usingHardwareWallet = keyring.type.search('Hardware') !== -1
  const balanceIsCached = useSelector(isBalanceCached)
  const showFiat = useSelector(getShouldShowFiat)
  const selectedAccount = useSelector(getSelectedAccount)
  const { balance } = selectedAccount
  const networkId = useSelector(getCurrentNetworkId)

  return (
    <WalletOverview
      balance={(
        <Tooltip position="top" title={t('balanceOutdated')} disabled={!balanceIsCached}>
          <div className="eth-overview__balance">
            <div className="eth-overview__primary-container">
              <UserPreferencedCurrencyDisplay
                className={classnames('eth-overview__primary-balance', {
                  'eth-overview__cached-balance': balanceIsCached,
                })}
                data-testid="eth-overview__primary-currency"
                value={balance}
                type={PRIMARY}
                ethNumberOfDecimals={4}
                hideTitle
              />
              {
                balanceIsCached ? <span className="eth-overview__cached-star">*</span> : null
              }
            </div>
            {
              showFiat && (
                <UserPreferencedCurrencyDisplay
                  className={classnames({
                    'eth-overview__cached-secondary-balance': balanceIsCached,
                    'eth-overview__secondary-balance': !balanceIsCached,
                  })}
                  data-testid="eth-overview__secondary-currency"
                  value={balance}
                  type={SECONDARY}
                  ethNumberOfDecimals={4}
                  hideTitle
                />
              )
            }
          </div>
        </Tooltip>
      )}
      buttons={(
        <>
          <IconButton
            className="sol-overview__button"
            Icon={SendIcon}
            label={t('send')}
            onClick={() => {
              sendEvent()
              history.push(SEND_ROUTE)
            }}
          />
          <IconButton
            className="sol-overview__button"
            Icon={BuyIcon}
            label={t('receive')}
            onClick={() => {
              depositEvent()
              dispatch(showModal({ name: 'DEPOSIT_ETHER' }))
            }}
          />
        </>
      )}
      className={className}
      icon={<Identicon diameter={32} />}
    />
  )
}

EthOverview.propTypes = {
  className: PropTypes.string,
}

EthOverview.defaultProps = {
  className: undefined,
}

export default EthOverview
