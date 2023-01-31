import Connector from '@tableau/taco-toolkit'

function onInitialized() {
  const elem = document.getElementById('submitButton')
  elem.innerText = 'Get Data!'
  elem.removeAttribute('disabled')
}

const connector = new Connector(onInitialized)

function submit() {
  connector.handlerInputs = [
    {
      fetcher: 'MyFetcher',
      parser: 'MyParser',
      data: {
        url: 'https://www.pegelonline.wsv.de/webservices/rest-api/v2/stations.json',
      },
    },
  ]
  connector.submit()
}

window.addEventListener('load', function () {
  document.getElementById('submitButton').addEventListener('click', submit)
})
