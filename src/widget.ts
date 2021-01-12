import events from './events'
import { getState } from './state'
import infoModal from './infoModal'
import constants from './constants'
import depositForm from './depositForm'
import withdrawForm from './withdrawForm'
import toFixed from './toFixed'
import loader from './loader'


let isLoading = false

const debug = (str, ...args) => console.log(`widget: ${str}`, ...args)

const html = `
  <div class="farmfactory-root" id="${constants.ids.widget.root}">
    ${depositForm.html}
    ${withdrawForm.html}
    <div class="farmfactory-widget">
      <div class="farmfactory-line">
        <div class="farmfactory-row">
          <div class="farmfactory-title">Earned</div>
          <div class="farmfactory-buttons">
            <button class="farmfactory-button disabled" id="${constants.ids.widget.harvestButton}">Harvest</button>
          </div>
        </div>
        <div class="farmfactory-value" id="${constants.ids.widget.earned}">&mdash;</div>
      </div>
      <div class="farmfactory-line">
        <div class="farmfactory-row">
          <div class="farmfactory-title">Staked</div>
          <div class="farmfactory-buttons" id="${constants.ids.widget.lpsButtons}"></div>
        </div>
        <div class="farmfactory-value" id="${constants.ids.widget.staked}">&mdash;</div>
      </div>
    </div>
  </div>
`

const approveButtonHtml = `
  <button class="farmfactory-button" id="${constants.ids.widget.approveButton}">Approve</button>
`

const depositAndWithdrawButtonsHtml = `
  <button class="farmfactory-button" id="${constants.ids.widget.depositButton}">Deposit</button>
  <button class="farmfactory-button" id="${constants.ids.widget.withdrawButton}">Withdraw</button>
`

const errorHtml = (error) => `
  <div class="farmfactory-root" id="${constants.ids.widget.root}">
    <div class="farmfactory-widget-error">
      <span>${error}</span>
    </div>
  </div>
`


const getData = async () => {
  debug('getData')

  const { opts, contracts, account, stakingTokenName, rewardsTokenName } = getState()

  if (!contracts) {
    return
  }

  try {
    const [
      farmingBalance,
      earnedTokens,
      allowance,
    ] = await Promise.all([
      contracts.farm.methods.balanceOf(account).call(),
      contracts.farm.methods.earned(account).call(),
      contracts.staking.methods.allowance(account, opts.farmAddress).call(),
    ])

    console.log('allowance:', allowance)

    injectStakingButtons(Number(allowance) > 0)

    const balanceNode = document.getElementById(constants.ids.widget.staked)
    const earnedTokensNode = document.getElementById(constants.ids.widget.earned)
    const harvestButton = document.getElementById(constants.ids.widget.harvestButton)
    const withdrawButton = document.getElementById(constants.ids.widget.withdrawButton)

    balanceNode.innerText = `${toFixed(farmingBalance / 1e18)} ${stakingTokenName}`
    earnedTokensNode.innerText = `${toFixed(earnedTokens / 1e18)} ${rewardsTokenName}`

    if (harvestButton) {
      if (earnedTokens > 0) {
        harvestButton.classList.remove('disabled')
      }
      else {
        harvestButton.classList.add('disabled')
      }
    }

    if (withdrawButton) {
      if (farmingBalance > 0) {
        withdrawButton.classList.remove('disabled')
      }
      else {
        withdrawButton.classList.add('disabled')
      }
    }
  }
  catch (err) {
    console.error(err)
    infoModal.open(err.message)
  }
}

const harvest = async () => {
  debug('init harvest')

  const { contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!account) {
    // Vue.prototype.$bus.$emit('open-wallet-modal')
    return
  }

  if (!contracts.farm) {
    infoModal.open('Farm contract is not connected')
    return
  }

  const harvestButton = document.getElementById(constants.ids.widget.harvestButton)

  try {
    isLoading = true
    harvestButton.innerHTML = `Harvest ${loader()}`;

    const res = await contracts.farm.methods.getReward().send({ from: account })

    if (res.status) {
      infoModal.open('Transaction confirmed!')
    }

    getData()
  }
  catch (err) {
    console.error(err)
    infoModal.open(err.message)
  }
  finally {
    isLoading = false
    harvestButton.innerHTML = 'Harvest';
  }
}

const approve = async () => {
  debug('init approve')

  const { opts, web3, contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!account) {
    // Vue.prototype.$bus.$emit('open-wallet-modal')
    return
  }

  if (!contracts.staking) {
    infoModal.open('Staking contract is not connected')
    return
  }

  try {
    isLoading = true
    document.getElementById(constants.ids.widget.approveButton).innerHTML = `Approve ${loader()}`;

    const spender = opts.farmAddress
    const value = web3.utils.toBN('0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff')

    const res = await contracts.staking.methods.approve(spender, value).send({ from: account })

    if (res.status) {
      infoModal.open('Transaction confirmed!')
    }

    getData()
  }
  catch (err) {
    console.error(err)
    infoModal.open(err.message)
  }
  finally {
    isLoading = false
    document.getElementById(constants.ids.widget.approveButton).innerHTML = 'Approve';
  }
}

const connectWithdrawButton = () => {
  const { opts } = getState()

  const withdrawButton = document.getElementById(constants.ids.widget.withdrawButton)

  if (opts.withdrawButtonTitle) {
    withdrawButton.innerText = opts.withdrawButtonTitle
  }

  withdrawButton.addEventListener('click', () => {
    if (!withdrawButton.classList.contains('disabled')) {
      withdrawForm.show()
    }
  })
}

const connectDepositButton = () => {
  const { opts } = getState()

  const depositButton = document.getElementById(constants.ids.widget.depositButton)

  if (opts.depositButtonTitle) {
    depositButton.innerText = opts.depositButtonTitle
  }

  depositButton.addEventListener('click', () => {
    depositForm.show()
  })
}

const connectApproveButton = () => {
  const approveButton = document.getElementById(constants.ids.widget.approveButton)

  approveButton.addEventListener('click', () => {
    approve()
  })
}

const injectStakingButtons = (isApproved) => {
  const node = document.getElementById(constants.ids.widget.lpsButtons)

  if (isApproved) {
    node.innerHTML = depositAndWithdrawButtonsHtml
    connectDepositButton()
    connectWithdrawButton()
  }
  else {
    node.innerHTML = approveButtonHtml
    connectApproveButton()
  }
}

const initHarvest = () => {
  const { opts } = getState()

  const harvestButton = document.getElementById(constants.ids.widget.harvestButton)

  if (opts.harvestButtonTitle) {
    harvestButton.innerText = opts.harvestButtonTitle
  }

  harvestButton.addEventListener('click', () => {
    if (!harvestButton.classList.contains('disabled')) {
      harvest()
    }
  })
}

const injectHtml = () => {
  document.getElementById(constants.ids.widgetRoot).innerHTML = html

  depositForm.addListeners()
  withdrawForm.addListeners()
  initHarvest()

  events.subscribe('setup web3', getData)
  events.subscribe('deposit success', getData)
  events.subscribe('withdraw success', getData)
}

const showError = (error) => {
  document.getElementById(constants.ids.widgetRoot).innerHTML = errorHtml(error)
}


export default {
  injectHtml,
  showError,
  getData,
}
