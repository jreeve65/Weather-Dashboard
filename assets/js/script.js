const API = 'bcd24eda6025291e8b312d12b4a48814';
const searchInput = document.getElementById("searchInput")
const searchButton = document.getElementById("searchButton");
const storedCities = JSON.parse(localStorage.getItem('cities')) || [];
const container = document.getElementById('container');
const forcastContainer = document.getElementById('forcast');
const btnContainer = document.getElementById('buttons');
function getData(city) {
    
    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API}`;
    console.log(apiUrl);
    fetch(apiUrl)
        .then(function (response) {
            return response.json();

        })
        .then(function (data) {
            renderCurrentWeather(city, data);
           

        })
        .catch(function (error) {
            console.error(error);
        });


}
function getInputCity(){
    let city = searchInput.value.trim();
    storeSearchHistory(city);
    createHistoryButton();
    getData(city);
}

function renderCurrentWeather(city, weather) {
    let day = new Date();
    // let dayName =['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
    container.innerHTML="";
    console.log(weather);
    
    const temp = weather.list[0].main.temp;
    const wind = weather.list[0].wind.speed;
    const humid = weather.list[0].main.humidity
    const icon = weather.list[0].weather[0].icon;
    const iconUrl = `https://openweathermap.org/img/wn/${icon}.png`;
    const currentDayh1 = document.createElement('h1');
    const tempH1 = document.createElement('h1');
    const windH1 = document.createElement('h1');
    const humidH1 = document.createElement('h1');
    const iconImg = document.createElement('img');
    currentDayh1.textContent ="Today";
    tempH1.textContent = temp;
    windH1.textContent = wind;
    iconImg.setAttribute("src", iconUrl);
    humidH1.textContent = humid;
    container.append(currentDayh1,iconImg, tempH1, windH1, humidH1);
    forcastContainer.innerHTML="";
    for (let i = 1; i < 7; i++) {
        day = Date(weather.list[i].dt);
        console.log(day);
        
        let forcastTemp = weather.list[i].main.temp;
        let forcastWind = weather.list[i].wind.speed;
        let forcastHumid = weather.list[i].main.humidity
        let forcastIcon = weather.list[i].weather[0].icon;
        let forcastIconUrl =`https://openweathermap.org/img/wn/${forcastIcon}.png`;
        let forcastDayDisplay = document.createElement('h1');
        let forcastTempDisplay = document.createElement('h1');
        let forcastWindDisplay = document.createElement('h1');
        let forcastHumidDisplay = document.createElement('h1');
        let forcastIconImg = document.createElement('img');
        forcastDayDisplay.textContent = `${i} Day out`;
        forcastTempDisplay.textContent= `Temp: ${forcastTemp}`;
        forcastWindDisplay.textContent = `Wind: ${forcastWind}`;
        forcastHumidDisplay.textContent = `Humidity: ${forcastHumid}`;
        forcastIconImg.setAttribute("src",forcastIconUrl);
        forcastContainer.append(forcastIconImg,forcastDayDisplay,forcastTempDisplay,forcastWindDisplay,forcastHumidDisplay);
        
    }
    



}
function storeSearchHistory(city) {
    storedCities.push(city);
    localStorage.setItem('cities', JSON.stringify(storedCities));

}
function createHistoryButton() {
    const thisStoredCity = JSON.parse(localStorage.getItem('cities'));
    if (thisStoredCity) {
        btnContainer.innerHTML='';
        for (let i = 0; i < thisStoredCity.length; i++) {
            const newButton = document.createElement('button');
            newButton.classList.add('historybtn')
            newButton.textContent = thisStoredCity[i];
            btnContainer.append(newButton);

        }
    }
}
function handleSearchHistory(e) {
    if (!e.target.matches('.historybtn')) {
        return;
    }
    const target = e.target;
    const cityName = target.textContent;
    getData(cityName);

}

createHistoryButton();
btnContainer.addEventListener('click', handleSearchHistory);

searchButton.addEventListener('click', getInputCity);


