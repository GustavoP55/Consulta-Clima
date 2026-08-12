document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#cityName').value;

    if(!cityName){
        document.querySelector("#weather").classList.remove('show')
        showAlert('Digite uma cidade válida');
        return;
    }

    const apiUrl = `/api/weather?city=${encodeURIComponent(cityName)}`;

    const result = await fetch(apiUrl);
    const json = await result.json();

    if(json.cod === 200){
        showInfos({
            city: json.name,
            country: json.sys.country,
            temp: json.main.temp,
            tempMax: json.main.temp_max,
            tempMin: json.main.temp_min,
            description: json.weather[0].description,
            tempIcon: json.weather[0].icon,
            windSpeed: json.wind.speed,
            humidity: json.main.humidity,
        });
    }
    else{
        document.querySelector("#weather").classList.remove('show')
        showAlert(
            `Não foi possível encontrar...

            <img src='src/images/404.svg'/>
        `)
    }
})

function showInfos(json){
    showAlert('');

    document.querySelector("#weather").classList.add('show')
    document.querySelector('#titulo').innerHTML = `${json.city}, ${json.country}`;
    document.querySelector('#tempValue').innerHTML = `${json.temp.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#tempImage').setAttribute('src', `https://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)

    document.querySelector('#tempMax').innerHTML = `${json.tempMax.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#tempMin').innerHTML = `${json.tempMin.toFixed(1).toString().replace('.', ',')} <sup>C°</sup>`;
    document.querySelector('#humidity').innerHTML = `${json.humidity}%`;
    document.querySelector('#wind').innerHTML = `${json.windSpeed.toFixed(1)}km/h`;

}

function showAlert(msg){
    document.querySelector('#alert').innerHTML = msg;
}