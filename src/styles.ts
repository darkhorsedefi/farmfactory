export default `
.row {
  display: flex;
  align-items: center;
  justify-content: space-between;
}

.row.center {
  justify-content: center;
}

.widget {
  align-items: stretch;
  justify-content: center;
}

.widget * {
  box-sizing: border-box;
}

.widget .button {
  margin-left: 20px;
}

.widget .button:first-child {
  margin-left: 0;
}

/* Headline */

.headline {
  margin-bottom: 32px;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}

.headline > div {
  margin: 0 40px;
}

.headline .title {
  font-size: 16px;
  line-height: 150%;
  color: #000;
  margin-bottom: 10px;
  padding-bottom: 0;
  font-weight: 400;
}

.headline .value {
  font-size: 18px;
  line-height: 155%;
  font-weight: 600;
  color: #000;
}

/* Balance */

.balanceCard {
  padding: 30px;
  border: 2px solid #a8f0f6;
  border-radius: 10px;
  margin-right: 40px;
  background: #fff;
  min-width: 320px;
  min-height: 185px;
}

.balanceCard > .title {
  font-size: 18px;
  color: #5c5c5c;
  line-height: 160%;
  margin-bottom: 20px;
  text-align: center;
}

.balanceCard > .value {
  font-weight: 800;
  font-size: 28px;
  line-height: 160%;
  color: #000;
  text-align: center;
}

.rewardsTimeLeft > .value {
  font-size: 40px;
}

.total {
  border-top: 2px solid #a8f0f6;
  display: flex;
  padding: 10px 20px 10px 20px;
  justify-content: space-between;
  margin: 18px -30px -30px -30px;
}

.total > .title {
  font-size: 14px;
  color: #5c5c5c;
  margin-right: 10px;
}

.total > .value {
  font-weight: 700;
  font-size: 14px;
  color: #000;
}

/* Farming */

.farmingCard {
  padding: 30px;
  border: 2px solid #a8f0f6;
  border-radius: 10px;
  margin-right: 40px;
  background: #fff;
  min-width: 320px;
  min-height: 185px;
}

.farmingCard .amount {
  margin-bottom: 20px;
  font-weight: 800;
  font-size: 28px;
  line-height: 160%;
  color: #000;
  text-align: center;
}

.farmingCard .title {
  font-size: 18px;
  color: #5c5c5c;
  line-height: 160%;
  margin-bottom: 30px;
  text-align: center;
}

.farmingCard .buttonContainer {
  display: flex;
  justify-content: center;
}

/* Button */

.button {
  cursor: pointer;
  outline: none;
  border: none;
  border-radius: 4px;
  height: 36px;
  padding: 0 24px;
  font-weight: 800;
  font-size: 14px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-transform: uppercase;
  transition: .2s;
}

.button.blue {
  box-shadow: 2px 2px 5px rgba(80,224,237,.5), inset -1px -1px 2px #08ccde;
  background: #50e0ed;
  color: #fff;
}

.button.yellow {
  box-shadow: 2px 2px 5px rgba(255,245,0,.45), inset -1px -1px 2px rgba(230,220,0,.6);
  background: #fff500;
  color: #000;
}

.button.gray {
  box-shadow: 2px 2px 5px rgba(0,0,0,.05), inset -1px -1px 2px rgba(0,0,0,.1);
  background: #f7f7f7;
  color: #000;
}

/* Connect Modal */

.overlay {
  background: rgba(0,0,0, 0.6);
  position: fixed;
  right: 0;
  bottom: 0;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  z-index: 2;
}

.modal {
  padding: 50px 40px 40px;
  min-width: 360px;
  display: inline-block;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
  border-radius: 8px;
  z-index: 5;
  background: #fff;
}

.modal .closeButton {
  cursor: pointer;
  vertical-align: top;
  overflow: hidden;
  background: none;
  border: 0;
  padding: 0;
  margin: 0;
  position: absolute;
  top: 16px;
  right: 16px;
  width: 24px;
  height: 24px;
}

.modal .closeButton svg {
  width: 100%;
  height: 100%;
}

.modal .title {
  text-align: center;
  font-size: 18px;
  line-height: 155%;
  padding-bottom: 24px;
  color: #000;
}

.modal .inner {
  text-align: center;
}

.modal .inner .svgLogo {
  width: 240px;
}

.modal input {
  height: 36px;
  padding: 0 16px;
  font-size: 14px;
  line-height: 14px;
  background: #FFFFFF;
  border: 1px solid #C2C2C2;
  box-sizing: border-box;
  border-radius: 4px;
}

.modal .footer {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
}

.modal .footer .button {
  margin: 0 30px;
}

/* Deposit Modal */

.depositModal .balanceTitle {
  font-size: 14px;
  line-height: 155%;
  color: #858585;
}

.depositModal .balanceValue {
  margin-left: 10px;
  font-size: 14px;
  line-height: 155%;
  font-weight: 600;
  color: #000;
}

.depositModal input {
  margin-top: 32px;
}

/* Loader */

.loader {
  height: 16px;
  display: flex;
  align-items: stretch;
}

.loader div {
  width: 4px;
  height: 100%;
  margin-left: 4px;
  background: #000;
  animation: loader 1.2s cubic-bezier(0, 0.5, 0.5, 1) infinite;
}

.loader div:first-child {
  margin-left: 0;
}

.loader div:nth-child(1) {
  animation-delay: -0.24s;
}

.loader div:nth-child(2) {
  animation-delay: -0.12s;
}

.loader div:nth-child(3) {
  animation-delay: 0s;
}

@keyframes loader {
  0% {
    margin-top: -6px;
    height: 28px;
  }
  50%, 100% {
    margin-top: 0;
    height: 16px;
  }
}
`
