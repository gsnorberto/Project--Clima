// Utilizado a api do Open Weather, disponível em https://openweathermap.org/ . A requisição é feita através do link fornecido por eles. Como retorno temos os dados em um JSON

document.querySelector('.busca').addEventListener('submit', async (event)=>{
    event.preventDefault();

    let input = document.querySelector('#searchInput').value;

    if(input !== ''){
        showWarning('Carregando...');

        //O encodeURI converte as palavras digitadas pelo usuário no formato correto para URL (sem espaçamentos, acentos, etc...). Ex: Usuário Digita "Rio de Janeiro", o encode converte para "Rio%20de%20Janeiro"
        let url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURI(input)}&appid=987632e3714f97c4063847aade4a61d3&units=metric&lang=pt_br`;

        //Faz a requisição para o servidor, espera a resposta, e só então continua a execução do código
        let results = await fetch(url); //espera (await) a requisição para depois ir para próxima linha de execução.
        let json = await results.json();

        //Verificar se achou a cidade digitada pelo usuário. cod 200 = encontrou ; cod 404 = não encontrou.
        if(json.cod === 200){
            showInfo({
                name: json.name,
                country: json.sys.country,
                temp: json.main.temp,
                tempIcon: json.weather[0].icon,
                windSpeed: json.wind.speed,
                windAngle: json.wind.deg,
            })
        }else{
            clearInfo();
            showWarning('Não encontramos esta Localização')
        }

    } else{
        clearInfo();
    }
});

function showInfo(json){
    showWarning('');

    document.querySelector('.resultado').style.display = 'block';

    document.querySelector('.titulo').innerHTML = `${json.name}, ${json.country}`
    document.querySelector('.tempInfo').innerHTML = `${json.temp} <sup>ºC<sup>`
    document.querySelector('.ventoInfo').innerHTML = `${json.windSpeed} <span>km/h</span>`
    document.querySelector('.temp img').setAttribute('src', `http://openweathermap.org/img/wn/${json.tempIcon}@2x.png`)
    document.querySelector('.ventoPonto').style.transform = `rotate(${json.windAngle-90}deg)`
}

function clearInfo(){
    showWarning('');
    document.querySelector('.resultado').style.display = 'none';
}

function showWarning(msg){
    document.querySelector('.aviso').innerHTML = msg;
}