// API key : bc897462f77e8da95ca4a6bc870c9d0b

let userInput
let uvIndex
let pastCities = JSON.parse(localStorage.getItem('cities')) || []
let display = document.getElementById('cityInfo')
let fiveSelect= document.getElementById('fiveDay')
let citySelect = document.getElementById('pastCities')



//API call by city name: api.openweathermap.org/data/2.5/weather?q=<cityName>
document.addEventListener('click', ()=>{
  let target = event.target
  if(target.classList.contains('btn')){
    userInput = document.getElementById('citySearch').value
    // console.log(userInput)
    displayWeather(userInput)
    //empty out userInput
    document.getElementById('citySearch').value =''
  }
})


const renderPastCity = _ =>{
  //set to empty before every render
  citySelect.innerHTML = ''
  for(let i = 0; i<pastCities.length; i++){
    let cityNode = document.createElement('div')
    cityNode.innerHTML = `${pastCities[i]} <hr>`
    citySelect.append(cityNode)
  }
}
const toFarenheit = value =>{
  value = (value * (9 / 5) - 459.67).toFixed(2)
  return value
}
//Capitalize first letter of every word in the string
const titleCase = str => {
  let splitStr = str.toLowerCase().split(' ');
  // console.log(splitStr)
  for (let i = 0; i < splitStr.length; i++) {
    splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);
  }
  return splitStr.join(' ');
}
const displayWeather = userInput =>{
  //pushing userInput to local storage
  userInput = titleCase(userInput)
  pastCities.push(userInput)
  console.log(pastCities)
  localStorage.setItem('cities', JSON.stringify(pastCities))
  renderPastCity()
  getCityWeather(userInput)
}

const getCityWeather = userInput =>{
  display.innerHTML = ''
  fetch(`https://api.openweathermap.org/data/2.5/weather?q=${userInput}&appid=bc897462f77e8da95ca4a6bc870c9d0b`)
    .then(response => response.json())
    .then(({ main: { temp, humidity }, wind: { speed }, coord: { lon, lat } }) => {
      let info = document.createElement('div')
      temp = toFarenheit(temp)

      // console.log(temp, humidity, speed, lon, lat)
      info.innerHTML = `<h2>${userInput} ${moment().format('MM/DD/YYYY')}</h2>
    <p>Temperature: ${temp} ºF</p>
    <p>Humidity: ${humidity}</p>
    <p> Wind Speed: ${speed} mph </p>
    `
      display.append(info)
      getUvIndex(lon, lat)
      getFiveDayForecast(lon, lat)
      
    })
    .catch(error => console.error(error))
}
