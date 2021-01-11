import events from './events'
import { getState } from './state'
import infoModal from './infoModal'
import constants from './constants'
import loader from './loader'


const html = `
  <div class="farmfactory-form farmfactory-deposit">
    <div class="farmfactory-title" id="${constants.ids.depositForm.title}"></div>
    <input class="farmfactory-input" id="${constants.ids.depositForm.input}" type="number" value="" />
    <div class="farmfactory-row">
      <button class="farmfactory-button" id="${constants.ids.depositForm.cancelButton}">Cancel</button>
      <button class="farmfactory-button" id="${constants.ids.depositForm.depositButton}">Deposit</button>
    </div>
  </div>
`


let isLoading = false

const deposit = async () => {
  const { web3, contracts, account } = getState()

  if (isLoading) {
    return
  }

  if (!contracts.farm) {
    infoModal.open('Farm contract is not connected')
    return
  }

  const input = document.getElementById(constants.ids.depositForm.input) as HTMLInputElement
  const cancelButton = document.getElementById(constants.ids.depositForm.cancelButton)
  const depositButton = document.getElementById(constants.ids.depositForm.depositButton)

  const amount = Number(input.value)

  if (amount > 0) {
    try {
      isLoading = true

      cancelButton.classList.add('disabled')
      depositButton.innerHTML = `Deposit ${loader()}`

      const value = web3.utils.toWei(String(amount))
      const res = await contracts.farm.methods.stake(value).send({ from: account })

      if (res.status) {
        infoModal.open('Transaction confirmed!')
      }

      hide()
      events.dispatch('deposit success')
    }
    catch (err) {
      console.error(err)

      if (err.code == 'INVALID_ARGUMENT') {
        infoModal.open('Placeholder cannot be empty')
      }
      else {
        infoModal.open(err.message)
      }
    }
    finally {
      isLoading = false

      cancelButton.classList.remove('disabled')
      depositButton.innerHTML = 'Deposit'
    }
  }
}

const addListeners = () => {
  const cancelButton = document.getElementById(constants.ids.depositForm.cancelButton)
  const depositButton = document.getElementById(constants.ids.depositForm.depositButton)

  cancelButton.addEventListener('click', () => {
    if (!cancelButton.classList.contains('disabled')) {
      hide()
    }
  })

  depositButton.addEventListener('click', () => {
    deposit()
  })
}

const show = async () => {
  const { contracts, account } = getState()

  const root = document.getElementById(constants.ids.widget.root)
  const title = document.getElementById(constants.ids.depositForm.title)

  root.classList.add('farmfactory-deposit-visible')

  title.innerHTML = `Available to deposit: ${loader(true)}`

  const balance = await contracts.farm.methods.balanceOf(account).call()

  // title.innerHTML = `Available to deposit: <b>${String(Number(balance) / 1e18)}</b>`
}

const hide = () => {
  document.getElementById(constants.ids.widget.root).classList.remove('farmfactory-deposit-visible')
}


export default {
  html,
  addListeners,
  show,
  hide,
}
