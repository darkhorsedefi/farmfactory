import constants from './constants'


const html = (message) => `
  <div class="overlay">
    <div class="modal">
      <button class="closeButton" id="${constants.ids.infoModal.closeButton}">
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" fill="none" viewBox="0 0 32 32">
          <path stroke="currentColor" stroke-width="2" d="M9 9l7 6.99L23 9l-6.99 7L23 23l-7-6.99L9 23l6.99-7L9 9z" opacity=".9"/>
        </svg>
      </button>
      <div class="inner">
        <div>${message}</div>
      </div>
      <div class="footer">
        <button class="button gray" id="${constants.ids.infoModal.cancelButton}">Close</button>
      </div>
    </div>
  </div>
`

const open = (message: string) => {
  document.getElementById(constants.ids.infoModalRoot).innerHTML = html(message)

  document.getElementById(constants.ids.infoModal.closeButton).addEventListener('click', () => {
    close()
  })

  document.getElementById(constants.ids.infoModal.cancelButton).addEventListener('click', () => {
    close()
  })
}

const close = () => {
  document.getElementById(constants.ids.infoModalRoot).innerHTML = ''
}


export default {
  open,
  close,
}