// main variables
const inputUsd = document.querySelector('#inputUsd')
const inputEur = document.querySelector('#inputEur')
const btnUsd = document.querySelector('#btnUsd')
const btnEur = document.querySelector('#btnEur')
const output = document.querySelector('#output')
const svgUsd = document.querySelector('#svgUsd')
const svgEur = document.querySelector('#svgEur')
const exchangeDate = document.querySelector('#exchangeDate')
const limiter = document.querySelector('#limiter')
const currencyItem = document.querySelector('#currency-item')

// change theme
let isDark = false

const theme = document.querySelector('#theme')
const title = document.querySelector('.title')
const container = document.querySelector('.container')
const currencyRate = document.querySelector('.currencyRate')
const lightBulb = document.querySelector('#lightBulb')
const bulbStroke = document.querySelector('#bulb-stroke-bottom')

theme.onclick = () => {
  isDark = !isDark
  localStorage.setItem('dark', isDark)

  container.classList.toggle('background')
  title.classList.toggle('titleText')
  svgUsd.classList.toggle('svgIcon')
  svgEur.classList.toggle('svgIcon')
  inputUsd.classList.toggle('moneyText')
  btnUsd.classList.toggle('buttonStyle')
  btnEur.classList.toggle('buttonStyle')
  output.classList.toggle('outputText')
  currencyRate.classList.toggle('currencyRateText')
  lightBulb.classList.toggle('lightOn')
  bulbStroke.classList.toggle('bulb-stroke-bottomOn')
  currencyItem.classList.toggle('currency-itemOn')
}
;(function getPreferTheme() {
  if (localStorage.getItem('dark') === 'true') {
    isDark = true

    container.classList.toggle('background')
    title.classList.toggle('titleText')
    svgUsd.classList.toggle('svgIcon')
    svgEur.classList.toggle('svgIcon')
    inputUsd.classList.toggle('moneyText')
    btnUsd.classList.toggle('buttonStyle')
    btnEur.classList.toggle('buttonStyle')
    output.classList.toggle('outputText')
    currencyRate.classList.toggle('currencyRateText')
    lightBulb.classList.toggle('lightOn')
    bulbStroke.classList.toggle('bulb-stroke-bottomOn')
    currencyItem.classList.toggle('currency-itemOn')
  }
})()

getDailyRate()

async function getCurrency() {
  try {
    const response = await fetch(
      'https://bank.gov.ua/NBUStatService/v1/statdirectory/exchangenew?json'
    )
    const getArray = await response.json()
    return getArray
  } catch (e) {
    exchangeDate.innerText = e
  }
}

// keycode heplers
inputUsd.onfocus = () => {
  inputUsd.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      svgUsd.classList.add('add-pulse-black')
      svgEur.classList.remove('add-pulse-black')

      limiter.classList.add('dispNone')
      output.classList.remove('dispNone')

      if (!inputUsd.value) return

      if (inputUsd.value.length >= 7) {
        limiter.classList.remove('dispNone')
        output.classList.add('dispNone')
        return
      }

      if (inputUsd.value.length >= 6) {
        limiter.classList.add('dispNone')
        output.classList.remove('dispNone')
      }

      getUsdRate()
    }
  })
}

inputEur.onfocus = () => {
  inputEur.addEventListener('keydown', function (event) {
    if (event.keyCode === 13) {
      svgUsd.classList.remove('add-pulse-black')
      svgEur.classList.add('add-pulse-black')

      limiter.classList.add('dispNone')
      output.classList.remove('dispNone')

      if (!inputEur.value) return

      if (inputEur.value.length >= 7) {
        limiter.classList.remove('dispNone')
        output.classList.add('dispNone')
        return
      }

      if (inputEur.value.length >= 6) {
        limiter.classList.add('dispNone')
        output.classList.remove('dispNone')
      }

      getEurRate()
    }
  })
}

btnUsd.onclick = () => {
  svgUsd.classList.add('add-pulse-black')
  svgEur.classList.remove('add-pulse-black')

  limiter.classList.add('dispNone')
  output.classList.remove('dispNone')

  if (!inputUsd.value) return

  if (inputUsd.value.length >= 7) {
    limiter.classList.remove('dispNone')
    output.classList.add('dispNone')
    return
  }

  if (inputUsd.value.length >= 6) {
    limiter.classList.add('dispNone')
    output.classList.remove('dispNone')
  }

  getUsdRate()
}

btnEur.onclick = () => {
  svgUsd.classList.remove('add-pulse-black')
  svgEur.classList.add('add-pulse-black')

  limiter.classList.add('dispNone')
  output.classList.remove('dispNone')

  if (!inputEur.value) return

  if (inputEur.value.length >= 7) {
    limiter.classList.remove('dispNone')
    output.classList.add('dispNone')
    return
  }

  if (inputEur.value.length >= 6) {
    limiter.classList.add('dispNone')
    output.classList.remove('dispNone')
  }

  getEurRate()
}

// currency helpers
function getUsdRate() {
  getCurrency().then((arr) => {
    const findUsd = arr.find((usd) => usd.r030 === 840)
    const getUsd = findUsd.rate

    return (output.innerText = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'UAH',
    }).format(inputUsd.value * getUsd))
  })
}

function getEurRate() {
  getCurrency().then((arr) => {
    const findEur = arr.find((usd) => usd.r030 === 978)
    const getEur = findEur.rate
    return (output.innerText = new Intl.NumberFormat('de-DE', {
      style: 'currency',
      currency: 'UAH',
    }).format(inputEur.value * getEur))
  })
}

function getDailyRate() {
  getCurrency().then((arr) => {
    const findExchangeDailyDate = arr.find((date) => date.exchangedate)
    const getDailyRateDate = findExchangeDailyDate.exchangedate

    return (exchangeDate.innerText = `Exchange rate at ${getDailyRateDate} by NBU`)
  })
}
