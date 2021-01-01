import { initData } from './common'
import { getState } from './state'
import constants from './constants'


const debug = (str, ...args) => console.log(`connectModal: ${str}`, ...args)

const html = `
  <div class="overlay">
    <div class="modal">
      <button class="closeButton" id="modalCloseButton">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>
        </svg>
      </button>
      <div class="inner">
        <img class="svgLogo" src="https://metamask.io/images/mm-logo.svg" alt="Metamask" />
      </div>
      <div class="footer">
        <button class="button yellow" id="modalConnectButton">Connect</button>
        <button class="button gray" id="modalCancelButton">Cancel</button>
      </div>
    </div>
  </div>
`

const connectMetamask = async () => {
  debug('connectMetamask')

  const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' })

  close()
  localStorage.setItem('ff-account-unlocked', 'true')

  await initData({ accounts })

  getState().pageContext.getData()
}

const open = () => {
  document.getElementById(constants.ids.modalsRoot).innerHTML = html

  document.getElementById('modalConnectButton').addEventListener('click', () => {
    connectMetamask()
  })

  document.getElementById('modalCancelButton').addEventListener('click', () => {
    close()
  })

  document.getElementById('modalCloseButton').addEventListener('click', () => {
    close()
  })
}

const close = () => {
  document.getElementById(constants.ids.modalsRoot).innerHTML = ''
}


export default {
  open,
  close,
}
