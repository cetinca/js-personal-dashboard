const randomImageUrl = "https://apis.scrimba.com/unsplash/photos/random?orientation=landscape&query=nature"
const bodyEl = document.getElementById("body")
const timeEl = document.getElementById("time")
const currencyEl = document.getElementById("currency")
const weatherEl = document.getElementById("weather")
const authorEl = document.getElementById("author")


function getTime() {
  timeEl.textContent = new Date().toLocaleTimeString(
    "tr-TR",
    {
      timeStyle: "short"
    })
}

setInterval(getTime, 1000 * 60)

// Calling Async Function	Behavior
// with await	Pauses execution until the Promise resolves, then proceeds with the result.
// without await	The function runs in the background, returns a Promise immediately, code continues execution.

async function getCurrency() {
  const host = 'api.frankfurter.app';
  try {
    const response = await fetch(`https://${host}/latest?amount=1&from=USD&to=TRY`)
    const data = await response.json()
    currencyEl.textContent = `TRY/USD: ${data.rates.TRY}`
  } catch (err) {
    console.log(err)
  }
}

function getCurrency2() {
  const host = 'api.frankfurter.app';
  fetch(`https://${host}/latest?amount=1&from=USD&to=TRY`)
    .then(resp => resp.json())
    .then(data => {
      currencyEl.textContent = `TRY/USD: ${data.rates.TRY}`
    });
}

function getWeather() {
  navigator.geolocation.getCurrentPosition(position => {
    fetch(`https://apis.scrimba.com/openweathermap/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&units=metric`)
      .then(response => {
        if (!response.ok) {
          throw Error("Weather data is not available")
        }
        return response.json()
      })
      .then(data => {
        weatherEl.textContent = `${data.name} ${data.main.temp}°C`
      }
      )
      .catch(err => {
        console.log(err)
        weatherEl.textContent = err
      })
  });
}

function initialize() {
  fetch(randomImageUrl)
    .then(response => response.json())
    .then(data => {
      const imageUrl = data.urls.regular  // alternative: `full`
      bodyEl.style.backgroundImage = `url(${imageUrl})`
      bodyEl.style.backgroundRepeat = "no-repeat"
      bodyEl.style.backgroundSize = "100% 100%"  // alternative: `cover`
      authorEl.textContent = `Background by: ${data.user.name}`
      getTime()
      getCurrency()
      getWeather()
    })
    .catch(error => {
      console.log(error)
      bodyEl.style.backgroundImage = "url(full_dark.jpg)"
      bodyEl.style.backgroundRepeat = "no-repeat"
      bodyEl.style.backgroundSize = "100% 100%"
      authorEl.textContent = `By: Dark`
      getTime()
      getCurrency()
      getWeather()
    })
}


initialize()
