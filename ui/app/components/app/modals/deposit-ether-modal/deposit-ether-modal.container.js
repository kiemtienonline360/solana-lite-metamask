import { connect } from 'react-redux'
import { requestAirdrop, hideModal, showModal, hideWarning } from '../../../../store/actions'
import DepositEtherModal from './deposit-ether-modal.component'

function mapStateToProps (state) {
  return {
    network: state.metamask.network,
    address: state.metamask.selectedAddress,
  }
}

function mapDispatchToProps (dispatch) {
  return {
    hideModal: () => {
      dispatch(hideModal())
    },
    hideWarning: () => {
      dispatch(hideWarning())
    },
    showAccountDetailModal: () => {
      dispatch(showModal({ name: 'ACCOUNT_DETAILS' }))
    },
    // DaoThang
    toFaucet: (network) => dispatch(requestAirdrop({ network })),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(DepositEtherModal)
