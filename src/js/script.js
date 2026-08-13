document.querySelector('#search').addEventListener('submit', async (event) => {
    event.preventDefault();

    const cityName = document.querySelector('#cityName').value;
    const searchBox = document.querySelector('#search');
    const searchButton = searchBox.querySelector('button');

    if(!cityName){
        document.querySelector("#weather").classList.remove('show')
        showAlert('Digite uma cidade válida');
        shakeSearch();
        return;
    }

    searchButton.classList.add('loading');
    searchButton.disabled = true;

    const apiUrl = `/api/weather?city=${encodeURIComponent(cityName)}`;

    try {
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
            shakeSearch();
        }
    } catch (error) {
        document.querySelector("#weather").classList.remove('show')
        showAlert('Erro ao buscar o clima. Tente novamente.');
        shakeSearch();
    } finally {
        searchButton.classList.remove('loading');
        searchButton.disabled = false;
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

function shakeSearch(){
    const searchBox = document.querySelector('#search');
    searchBox.classList.remove('shake'); 
    void searchBox.offsetWidth; 
    searchBox.classList.add('shake');
}